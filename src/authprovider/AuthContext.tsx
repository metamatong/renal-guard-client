import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supa/supabaseClient.ts";
import type { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (inputs: AuthCredentials) => Promise<void>;
  signIn: (inputs: AuthCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthCredentials {
  email: string;
  password: string;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load session on first render
  useEffect(() => {
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Register
  const signUp = async (inputs: AuthCredentials) => {
    const { email, password, username } = inputs;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // this will be stored in `auth.users.raw_user_meta_data`
        },
      },
    });
    // const { error } = await supabase.auth.signUp(inputs);
    if (error) throw error;
  };

  // Login
  const signIn = async (inputs: AuthCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(inputs);
    if (error) throw error;
  };

  // Logout
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
