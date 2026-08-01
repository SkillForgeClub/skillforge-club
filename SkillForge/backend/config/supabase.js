import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://dummy-supabase-url.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "dummy-anon-key-for-local-dev";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY || process.env.SUPABASE_URL.includes("dummy")) {
  console.warn("⚠️ [Backend Warning] Supabase credentials missing or using dummy local defaults.");
  console.warn("   To connect to a live database, add your real SUPABASE_URL and SUPABASE_KEY to backend/.env\n");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    global: {
      fetch: async (url, options) => {
        try {
          return await fetch(url, options);
        } catch (err) {
          console.error("\n🌐 [Supabase Network Error] Fetch failed for URL:", url);
          console.error("🌐 [Supabase Network Error] Error Message:", err.message);
          if (err.cause) {
            console.error("🌐 [Supabase Network Error] Cause:", err.cause);
          } else {
            console.error("🌐 [Supabase Network Error] Error Stack:", err.stack);
          }
          console.error(""); // blank line
          throw err;
        }
      }
    }
  }
);