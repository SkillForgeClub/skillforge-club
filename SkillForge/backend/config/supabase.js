import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("\n❌ Error: Supabase credentials are missing!");
  console.error("Please create a `.env` file in the `backend/` directory (or copy from `.env.example`) and configure:");
  console.error("  SUPABASE_URL=your_supabase_project_url");
  console.error("  SUPABASE_KEY=your_supabase_anon_or_service_key\n");
  process.exit(1);
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