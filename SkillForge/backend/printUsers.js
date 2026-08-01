import { supabase } from "./config/supabase.js";

const printUsers = async () => {
  const { data: admins } = await supabase.from("admins").select("id, name, email");
  console.log("Admins:", admins);

  const { data: mentors } = await supabase.from("mentors").select("id, name, email");
  console.log("Mentors:", mentors);

  const { data: students } = await supabase.from("students").select("id, name, email");
  console.log("Students:", students);
  
  const { data: users } = await supabase.from("users").select("id, name, email, role");
  console.log("Users:", users);
};

printUsers();
