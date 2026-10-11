import { isSupabaseConfigured, supabase } from "../config/supabase.js";

export async function isCurrentUserAdmin(userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return false;
  const { data, error } = await supabase.from("admin_users").select("user_id").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
