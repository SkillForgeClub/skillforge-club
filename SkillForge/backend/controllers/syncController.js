import https from "https";
import http from "http";
import bcrypt from "bcryptjs";
import { supabase } from "../config/db.js";

const SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL;
const SYNC_SECRET   = process.env.SYNC_SECRET;

// Column indices matching the form sheet (0-based)
// Timestamp | Name | Email id | Branch | Mobile number | LinkedIn (url) |
// GitHub (url) | Code chef (url) | Any other coding platforms(url) |
// Password(To Access) | Interested Domain | Interested | Email Status
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

const fetchCSV = (url) =>
  new Promise((resolve, reject) => {
    const get = url.startsWith("https") ? https.get : http.get;
    get(url, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchCSV(res.headers.location).then(resolve).catch(reject);
      }
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => resolve(raw));
    }).on("error", reject);
  });

const parseCSV = (raw) => {
  const lines = raw.trim().split("\n");
  return lines.map((line) => {
    const cols = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === "," && !inQuote) { cols.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    cols.push(cur.trim());
    return cols;
  });
};

export const syncFromSheet = async (req, res, next) => {
  try {
    // Auth: JWT admin user OR shared secret for webhook
    if (!req.user) {
      const secret = req.headers["x-sync-secret"] || req.body?.secret;
      if (!SYNC_SECRET || secret !== SYNC_SECRET)
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Allow sheetUrl override from request body so admin can paste it directly
    const sheetUrl = req.body?.sheetUrl || SHEET_CSV_URL;
    if (!sheetUrl)
      return res.status(400).json({
        error: "No sheet URL. Set GOOGLE_SHEET_CSV_URL env var on Render, or pass { sheetUrl } in the request body.",
      });

    const raw  = await fetchCSV(sheetUrl);
    const rows = parseCSV(raw);

    // Skip header row, skip blank rows
    const dataRows = rows.slice(1).filter((r) => r[COL.email]?.includes("@"));

    let created = 0, updated = 0, skipped = 0;

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

      const { data: existing } = await supabase
        .from("students")
        .select("id, password")
        .eq("email", email)
        .single();

      const studentData = { name, email, branch, phone, linkedin, github, codechef, other_platforms, domain_interest, onboarded: true };

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
          .from("students")
          .insert({ ...studentData, password: hashed })
          .select("id, name, email")
          .single();

        if (insertErr) { console.error("Insert error:", insertErr.message, "for", email); skipped++; continue; }

        await supabase.from("users").upsert(
          { id: inserted.id, name, email, password: hashed, role: "student" },
          { onConflict: "id" }
        );
        created++;
      }
    }

    res.json({ message: "Sync complete", total: dataRows.length, created, updated, skipped });
  } catch (err) { next(err); }
};
