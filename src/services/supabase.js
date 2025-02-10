import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yaapancmzktoqetuptze.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYXBhbmNtemt0b3FldHVwdHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMDEyNTMsImV4cCI6MjA1NDc3NzI1M30.xlHCjCCPn2pVcYZFC7cqRZF4wOCM90aGZG6UznQUzvY"; //* don't need to hide this key, only allows read access (defined in the Supabase dashboard)
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
