import supabase from "./supabase";

export async function getGolfers() {
  const { data, error } = await supabase.from("golfers").select("*");

  if (error) {
    console.error(error);
    throw new Error("Golfers could not be retrieved");
  }

  return data;
}
