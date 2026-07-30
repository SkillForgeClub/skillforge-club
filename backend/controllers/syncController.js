import https from "https";
import bcrypt from "bcryptjs";
import { supabase } from "../config/db.js";

// Google Sheet published as CSV:
// File → Share → Publish to web → Sheet: Form_Responses → CSV
// URL format: https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<GID>
const SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL;
const SYNC_SECRET   = process.env.SYNC_SECRET; // shared secret for webhook

// ── Column indices (0-based) matching the form sheet ─────────────────────────
// Timestamp | Name | Email id | Branch | Mobile number | LinkedIn (url) |
// GitHub (url) | Code chef (url) | Any other coding platforms (url) |
// Password (To Access) | Interested Domain | Interested | Email Status
const COL = {
  timestamp:       0,
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
  email_status:    12,
};

const fetchCSV = () =>
  new Promise((resolve, reject) => {
    https.get(SHEET_CSV_URL, (res) => {
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => resolve(raw));
    }).on("error", reject);
  });

// Minimal CSV parser — handles quoted fields with commas inside
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
    // Webhook auth via shared secret
    if (!req.user) {
      const secret = req.headers["x-sync-secret"] || req.body?.secret;
      if (!SYNC_SECRET || secret !== SYNC_SECRET)
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!SHEET_CSV_URL)
      return res.status(500).json({ error: "GOOGLE_SHEET_CSV_URL not configured." });

    const raw  = await fetchCSV();
    const rows = parseCSV(raw);

    // Skip header row
    const dataRows = rows.slice(1).filter((r) => r[COL.email]?.includes("@"));

    let created = 0, updated = 0, skipped = 0;

    for (const row of dataRows) {
      const email          = row[COL.email]?.toLowerCase().trim();
      const name           = row[COL.name]?.trim()           || "";
      const branch         = row[COL.branch]?.trim()         || "";
      const phone          = row[COL.phone]?.trim()          || "";
      const linkedin       = row[COL.linkedin]?.trim()       || "";
      const github         = row[COL.github]?.trim()         || "";
      const codechef       = row[COL.codechef]?.trim()       || "";
      const other_platforms= row[COL.other_platforms]?.trim()|| "";
      const plainPassword  = row[COL.password]?.trim()       || "";
      const domain_interest= row[COL.domain_interest]?.trim()|| "";
      const interested     = row[COL.interested]?.trim()     || "";

      if (!email || !name) { skipped++; continue; }

      // Check if student already exists
      const { data: existing } = await supabase
        .from("students")
        .select("id, password")
        .eq("email", email)
        .single();

      const studentData = {
        name,
        email,
        branch,
        phone,
        linkedin,
        github,
        codechef,
        other_platforms,
        domain_interest: domain_interest || interested,
        onboarded: true,
      };

      if (existing) {
        // Always update password from sheet so login credentials stay in sync
        const hashed = plainPassword
          ? await bcrypt.hash(plainPassword, 10)
          : existing.password;

        await supabase.from("students")
          .update({ ...studentData, password: hashed })
          .eq("id", existing.id);

        await supabase.from("users")
          .update({ name, branch, password: hashed })
          .eq("id", existing.id);
        updated++;
      } else {
        // Hash the plain-text password from the sheet
        const hashed = plainPassword
          ? await bcrypt.hash(plainPassword, 10)
          : await bcrypt.hash(Math.random().toString(36).slice(-8), 10);

        const { data: inserted, error: insertErr } = await supabase
          .from("students")
          .insert({ ...studentData, password: hashed })
          .select("id, name, email")
          .single();

        if (insertErr) { skipped++; continue; }

        // Mirror into users table for FK constraints
        await supabase.from("users").upsert(
          { id: inserted.id, name, email, password: hashed, role: "student" },
          { onConflict: "email" }
        );
        created++;
      }
    }

    res.json({
      message: "Sync complete",
      total: dataRows.length,
      created,
      updated,
      skipped,
    });
  } catch (err) { next(err); }
};
