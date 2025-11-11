import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project dashboard → Settings → API
const supabaseUrl = "https://hzroflihoqngdecqwhdn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6cm9mbGlob3FuZ2RlY3F3aGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTQzMzksImV4cCI6MjA3ODAzMDMzOX0.7jL_ZJ4DrUnBs7KTCWmyb9SqJmYixhREmVFBEO2eVK4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
