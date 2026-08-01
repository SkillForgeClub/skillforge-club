import { supabase } from "./config/supabase.js";
import bcrypt from "bcryptjs";

const reset = async () => {
  const adminPass = await bcrypt.hash("Admin@123", 10);
  const mentorPass = await bcrypt.hash("Mentor@123", 10);
  const studentPass = await bcrypt.hash("Student@123", 10);

  // 1. Reset admins
  const { error: err1 } = await supabase.from("admins")
    .update({ password: adminPass })
    .in("email", ["pamidichaitanya11@gmail.com", "testadmin@gmail.com"]);
  if (err1) console.error("Error resetting admins:", err1.message);
  else console.log("Admins passwords reset successfully.");

  // 2. Reset mentors
  const { error: err2 } = await supabase.from("mentors")
    .update({ password: mentorPass })
    .eq("email", "test@mentor.com");
  if (err2) console.error("Error resetting mentors:", err2.message);
  else console.log("Mentors passwords reset successfully.");

  // 3. Reset students
  const { error: err3 } = await supabase.from("students")
    .update({ password: studentPass })
    .eq("email", "test@student.com");
  if (err3) console.error("Error resetting students:", err3.message);
  else console.log("Students passwords reset successfully.");

  // 4. Update the matching emails in the users table
  const { error: err4 } = await supabase.from("users")
    .update({ password: adminPass })
    .in("email", ["pamidichaitanya11@gmail.com", "testadmin@gmail.com"]);
  if (err4) console.error("Error resetting users admin:", err4.message);

  const { error: err5 } = await supabase.from("users")
    .update({ password: studentPass })
    .eq("email", "test@student.com");
  if (err5) console.error("Error resetting users student:", err5.message);

  console.log("Password reset completed.");
};

reset();
