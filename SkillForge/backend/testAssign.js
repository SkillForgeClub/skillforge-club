import dotenv from "dotenv";
dotenv.config();
import { supabase } from "./config/supabase.js";

async function test() {
  const { data: students } = await supabase.from("students").select("id, name, email").limit(1);
  const { data: mentors } = await supabase.from("mentors").select("id, name, email, password").limit(1);
  
  if (!students.length || !mentors.length) return console.log("No students or mentors");
  
  const student = students[0];
  const mentor = mentors[0];
  
  console.log("Assigning", student.email, "to", mentor.email);
  
  const res1 = await supabase.from("users").upsert(
      { id: student.id, name: student.name, email: student.email, password: "", role: "student" },
      { onConflict: "id" }
  );
  console.log("Upsert student:", res1.error ? res1.error.message : "Success");

  const res2 = await supabase.from("users").upsert(
      { id: mentor.id, name: mentor.name, email: mentor.email, password: mentor.password || "", role: "mentor" },
      { onConflict: "id" }
  );
  console.log("Upsert mentor:", res2.error ? res2.error.message : "Success");
  
  const res3 = await supabase.from("mentor_assignments").delete().eq("student_id", student.id);
  console.log("Delete old assignment:", res3.error ? res3.error.message : "Success");
  
  const res4 = await supabase.from("mentor_assignments").insert({ student_id: student.id, mentor_id: mentor.id }).select("id, assigned_at").single();
  console.log("Insert new assignment:", res4.error ? res4.error.message : "Success");
}
test();
