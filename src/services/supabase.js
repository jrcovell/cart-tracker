import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ycqgtoxxpgnnmdvckjjw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcWd0b3h4cGdubm1kdmNramp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2MDkwMDEsImV4cCI6MjAyODE4NTAwMX0.vUrriiIJmIDw8BOVPnGil2vK8JZgj83HfE5kgT5dl9A"; //* don't need to hide this key, only allows read access (defined in the Supabase dashboard)
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
