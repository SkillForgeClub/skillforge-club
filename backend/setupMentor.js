import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import { supabase } from "./config/supabase.js";

const setupMentor = async () => {
  const MENTOR_EMAIL = "test@mentor.com";
  const MENTOR_PASSWORD = "Mentor@123";
  const MENTOR_NAME = "Test Mentor";

  const hashed = await bcrypt.hash(MENTOR_PASSWORD, 10);

  // 1. Check if mentor already exists
  const { data: existing } = await supabase
    .from("mentors")
    .select("id, email")
    .eq("email", MENTOR_EMAIL)
    .single();

  if (existing) {
    // Update password
    const { error } = await supabase
      .from("mentors")
      .update({ password: hashed, name: MENTOR_NAME })
      .eq("email", MENTOR_EMAIL);
    if (error) console.error("❌ Failed to update mentor:", error.message);
    else console.log(`✅ Mentor password reset for ${MENTOR_EMAIL}`);
  } else {
    // Insert new mentor
    const { error } = await supabase
      .from("mentors")
      .insert({ name: MENTOR_NAME, email: MENTOR_EMAIL, password: hashed });
    if (error) console.error("❌ Failed to insert mentor:", error.message);
    else console.log(`✅ Mentor created: ${MENTOR_EMAIL}`);
  }

  // 2. Mirror into users table (for FK consistency)
  const { error: usersErr } = await supabase
    .from("users")
    .upsert(
      { name: MENTOR_NAME, email: MENTOR_EMAIL, password: hashed, role: "mentor" },
      { onConflict: "email" }
    );
  if (usersErr) console.error("❌ Users table sync failed:", usersErr.message);
  else console.log("✅ Users table synced.");

  // 3. Print summary
  const { data: allMentors } = await supabase.from("mentors").select("id, name, email");
  console.log("\n📋 Current mentors in DB:");
  (allMentors || []).forEach(m => console.log(`   - ${m.email} (${m.name})`));

  console.log(`\n🔑 Login with:\n   Email: ${MENTOR_EMAIL}\n   Password: ${MENTOR_PASSWORD}\n`);
};

setupMentor().catch(console.error);
