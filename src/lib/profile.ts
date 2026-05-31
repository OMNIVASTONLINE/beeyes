import { supabase } from "./supabase";

export interface Profile {
  id: string;
  display_name: string | null;
  quiz_completed: boolean;
  membership_selected: boolean;
  payment_completed: boolean;
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("id, display_name, quiz_completed, membership_selected, payment_completed")
    .eq("id", userId)
    .single();
  return data;
}

export async function createProfile(
  userId: string,
  metadata?: Record<string, unknown>
): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      display_name: (metadata?.display_name as string) ?? null,
      quiz_completed: (metadata?.quiz_completed as boolean) ?? false,
      membership_selected: false,
      payment_completed: false,
    })
    .select("id, display_name, quiz_completed, membership_selected, payment_completed")
    .single();
  return data;
}

export async function updateProfile(
  userId: string,
  updates: Partial<Profile>
): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select("id, display_name, quiz_completed, membership_selected, payment_completed")
    .single();
  return data;
}
