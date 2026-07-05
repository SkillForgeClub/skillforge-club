import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function sync() {
  console.log("Starting DB sync...");
  
  // 1. Delete all users to resolve any PK/email conflicts
  await supabase.from("users").delete().neq("id", "00000000-0000-0000-0000-000000000000"); // deletes all
  
  // 2. Fetch all role tables
  const { data: admins } = await supabase.from("admins").select("*");
  const { data: mentors } = await supabase.from("mentors").select("*");
  const { data: students } = await supabase.from("students").select("*");

  const usersToInsert = [
    ...(admins || []).map(a => ({ id: a.id, name: a.name, email: a.email, password: a.password || "pw", role: "admin" })),
    ...(mentors || []).map(m => ({ id: m.id, name: m.name, email: m.email, password: m.password || "pw", role: "mentor" })),
    ...(students || []).map(s => ({ id: s.id, name: s.name, email: s.email, password: s.password || "pw", role: "student" }))
  ];

  // 3. Insert cleanly
  if (usersToInsert.length > 0) {
    const { error } = await supabase.from("users").insert(usersToInsert);
    if (error) {
       console.error("Sync failed:", error.message);
       // Attempt one by one if bulk fails
       for (const u of usersToInsert) {
           const { error: err } = await supabase.from("users").insert(u);
           if (err) console.error("Failed to insert", u.email, err.message);
       }
    } else {
       console.log(`Successfully synced ${usersToInsert.length} users into the users table.`);
    }
  } else {
    console.log("No users found to sync.");
  }
}

sync().catch(console.error);
