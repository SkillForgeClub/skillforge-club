import { supabase } from "./config/supabase.js";

const seed = async () => {
  console.log("Seeding team members...");
  const { error: errTeam } = await supabase.from("team_members").insert([
    {
      name: "P. Chaitanya",
      role: "President",
      department: "President",
      bio: "Computer Science undergraduate with a strong interest in software development, artificial intelligence, and problem-solving. My goal is to continuously grow as a developer and build reliable, user-friendly applications while expanding my knowledge of modern technologies.",
      linkedin: "https://www.linkedin.com/in/pamidi-chaitanya-379093350/",
      github: "https://github.com/chaitanya11-dot"
    }
  ]);
  if (errTeam) console.error("Error team:", errTeam.message);
  else console.log("Team members seeded successfully.");
};

seed();
