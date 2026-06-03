import { supabase } from "../supabaseClient";

export default async function getLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.log("fetch error:", error);
  }

  return data;
}
