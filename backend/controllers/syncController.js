import bcrypt from "bcryptjs";
import { supabase } from "../config/db.js";

const SYNC_SECRET = process.env.SYNC_SECRET;

const COL = {
  name:            1,
  email:           2,
  branch:          3,
  phone:           4,
  linkedin:        5,
  github:          6,
  codechef:        7,
  other_platforms: 8,
  password:        9,
  domain_interest: 10,
  interested:      11,
};

const parseCSV = (raw) => {
  const rows = [];
  let cols = [], cur = "", inQuote = false;
  // Normalize line endings
  const text = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') { inQuote = !inQuote; continue; }
    if (ch === "," && !inQuote) { cols.push(cur.trim()); cur = ""; continue; }
    if (ch === "\n" && !inQuote) { cols.push(cur.trim()); rows.push(cols); cols = []; cur = ""; continue; }
    cur += ch;
  }
  if (cur || cols.length) { cols.push(cur.trim()); rows.push(cols); }
  return rows;
};

export const syncFromSheet = async (req, res, next) => {
  try {
    if (!req.user) {
      const secret = req.headers["x-sync-secret"] || req.body?.secret;
      if (!SYNC_SECRET || secret !== SYNC_SECRET)
        return res.status(401).json({ error: "Unauthorized" });
    }

    const csvText = req.body?.csvText;
    if (!csvText) return res.status(400).json({ error: "No csvText provided." });

    const rows = parseCSV(csvText);
    // Skip header rows (some column names have embedded newlines, so header may span multiple rows)
    // Find first row where col[2] looks like an email to determine data start
    const dataRows = rows.filter((r) => r[COL.email]?.includes("@"));

    let created = 0, updated = 0, skipped = 0;
    const errors = [];

    for (const row of dataRows) {
      const email           = row[COL.email]?.toLowerCase().trim();
      const name            = row[COL.name]?.trim()            || "";
      const branch          = row[COL.branch]?.trim()          || "";
      const phone           = row[COL.phone]?.trim()           || "";
      const linkedin        = row[COL.linkedin]?.trim()        || "";
      const github          = row[COL.github]?.trim()          || "";
      const codechef        = row[COL.codechef]?.trim()        || "";
      const other_platforms = row[COL.other_platforms]?.trim() || "";
      const plainPassword   = row[COL.password]?.trim()        || "";
      const domain_interest = (row[COL.domain_interest] || row[COL.interested] || "").trim();

      if (!email || !name) { skipped++; continue; }

      const { data: existing } = await supabase.from("students").select("id, password").eq("email", email).single();
      // Only include columns that exist in the students table
      const studentData = { name, email, branch, phone, domain_interest, onboarded: true };
      // Add optional columns only if they have values (avoids errors if columns don't exist)
      if (linkedin)        studentData.linkedin        = linkedin;
      if (github)          studentData.github          = github;
      if (codechef)        studentData.codechef        = codechef;
      if (other_platforms) studentData.other_platforms = other_platforms;

      if (existing) {
        const hashed = plainPassword ? await bcrypt.hash(plainPassword, 10) : existing.password;
        await supabase.from("students").update({ ...studentData, password: hashed }).eq("id", existing.id);
        await supabase.from("users").update({ name, password: hashed }).eq("id", existing.id);
        updated++;
      } else {
        const hashed = plainPassword
          ? await bcrypt.hash(plainPassword, 10)
          : await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
        const { data: inserted, error: insertErr } = await supabase
          .from("students").insert({ ...studentData, password: hashed }).select("id, name, email").single();
        if (insertErr) { errors.push(`${email}: ${insertErr.message}`); skipped++; continue; }
        await supabase.from("users").upsert(
          { id: inserted.id, name, email, password: hashed, role: "student" }, { onConflict: "id" }
        );
        created++;
      }
    }

    res.json({ message: "Sync complete", total: dataRows.length, created, updated, skipped, errors });
  } catch (err) { next(err); }
};
