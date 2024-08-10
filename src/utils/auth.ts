import { supabase } from './supabaseClient';
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return { user: data.user, session: data.session };
};
export const signUpWithEmail = async (email: string, password: string, username: string, location: string, role: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username, location, role } } });
  if (error) throw error;
  return { user: data.user, session: data.session };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};