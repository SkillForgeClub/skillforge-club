import { supabase } from "./config/supabase.js";

const test = async () => {
  const check = async (table) => {
    const { data, error } = await supabase.from(table).select("*");
    console.log(`Table: ${table}`);
    console.log(`Count: ${data ? data.length : 'N/A'}`);
    if (error) {
      console.log(`Error:`, error.message);
    } else if (data && data.length > 0) {
      console.log(`Sample:`, JSON.stringify(data[0]));
    }
  };

  await check("users");
  await check("students");
  await check("mentors");
  await check("admins");
  await check("events");
  await check("projects");
  await check("team_members");
  await check("announcements");
  await check("mentor_assignments");
  await check("tasks");
  await check("registrations");
  await check("contact_messages");
};

test();