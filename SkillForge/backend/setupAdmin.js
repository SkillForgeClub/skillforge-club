import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const setup = async () => {
  const ADMIN_EMAIL = "pamidichaitanya11@gmail.com";
  const ADMIN_PASSWORD = "Admin@123";
  const ADMIN_NAME = "Chaitanya Pamidi";

  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

  // 1. Check if admin already exists
  const { data: existing } = await supabase
    .from("admins")
    .select("id, email")
    .eq("email", ADMIN_EMAIL)
    .single();

  if (existing) {
    // Update password
    const { error } = await supabase
      .from("admins")
      .update({ password: hashed, name: ADMIN_NAME })
      .eq("email", ADMIN_EMAIL);
    if (error) console.error("❌ Failed to update admin:", error.message);
    else console.log(`✅ Admin password reset for ${ADMIN_EMAIL}`);
  } else {
    // Insert new admin
    const { error } = await supabase
      .from("admins")
      .insert({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: hashed });
    if (error) console.error("❌ Failed to insert admin:", error.message);
    else console.log(`✅ Admin created: ${ADMIN_EMAIL}`);
  }

  // 2. Mirror into users table (for FK consistency)
  const { error: usersErr } = await supabase
    .from("users")
    .upsert(
      { name: ADMIN_NAME, email: ADMIN_EMAIL, password: hashed, role: "admin" },
      { onConflict: "email" }
    );
  if (usersErr) console.error("❌ Users table sync failed:", usersErr.message);
  else console.log("✅ Users table synced.");

  // 3. Print summary
  const { data: allAdmins } = await supabase.from("admins").select("id, name, email");
  console.log("\n📋 Current admins in DB:");
  (allAdmins || []).forEach(a => console.log(`   - ${a.email} (${a.name})`));

  console.log(`\n🔑 Login with:\n   Email: ${ADMIN_EMAIL}\n   Password: ${ADMIN_PASSWORD}\n`);
};

setup().catch(console.error);
