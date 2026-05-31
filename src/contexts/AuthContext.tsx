"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { AuthError, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { fetchProfile, createProfile, updateProfile, Profile } from "@/lib/profile";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  profileLoading: boolean;
  balance: number;
  profile: Profile | null;
  quizCompleted: boolean;
  membershipSelected: boolean;
  paymentCompleted: boolean;
  login: () => void;
  signup: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setQuizCompleted: () => Promise<void>;
  setMembershipSelected: () => Promise<void>;
  setPaymentCompleted: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isAuthenticated: false,
  isLoading: true,
  profileLoading: true,
  balance: 2500,
  profile: null,
  quizCompleted: false,
  membershipSelected: false,
  paymentCompleted: false,
  login: () => {},
  signup: async () => ({ error: null }),
  logout: async () => {},
  refreshProfile: async () => {},
  setQuizCompleted: async () => {},
  setMembershipSelected: async () => {},
  setPaymentCompleted: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const balance = 2500;

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    setProfileLoading(true);
    let data = await fetchProfile(user.id);
    if (!data) {
      data = await createProfile(user.id, user.user_metadata as Record<string, boolean>);
    }
    setProfile(data);
    setProfileLoading(false);
  }, [user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [user, refreshProfile]);

  const login = () => {};

  const signup = async (email: string, password: string, metadata?: Record<string, unknown>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) return { error };

    if (!data?.session && data?.user) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) return { error: signInError };
    }

    if (data?.user) {
      await createProfile(data.user.id, metadata);
    }

    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const setQuizCompleted = async () => {
    if (!user) return;
    const updated = await updateProfile(user.id, { quiz_completed: true });
    if (updated) setProfile(updated);
  };

  const setMembershipSelected = async () => {
    const id = user?.id || (await supabase.auth.getSession()).data?.session?.user?.id;
    if (!id) return;
    const updated = await updateProfile(id, { membership_selected: true });
    if (updated) setProfile(updated);
  };

  const setPaymentCompleted = async () => {
    if (!user) return;
    const updated = await updateProfile(user.id, { payment_completed: true });
    if (updated) setProfile(updated);
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isAuthenticated: !!user,
    isLoading,
    profileLoading,
    balance,
    profile,
    quizCompleted: profile?.quiz_completed ?? false,
    membershipSelected: profile?.membership_selected ?? false,
    paymentCompleted: profile?.payment_completed ?? false,
    login,
    signup,
    logout,
    refreshProfile,
    setQuizCompleted,
    setMembershipSelected,
    setPaymentCompleted,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
