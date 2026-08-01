-- Run this in your Supabase SQL editor
-- Adds new columns to students table matching the Google Form fields

alter table students
  add column if not exists linkedin        text default '',
  add column if not exists github          text default '',
  add column if not exists codechef        text default '',
  add column if not exists other_platforms text default '';
