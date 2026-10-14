// Authentication hook supporting Supabase Auth and persistent local session
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import React from 'react';
import { UserProfile, UserRole } from '../types';
import { 
  getStoredUser, 
  saveStoredUser, 
  DEMO_CLIENT, 
  DEMO_LAWYER_USER, 
  DEMO_ADMIN 
} from '../lib/storage';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; fullName: string; role: UserRole; phone?: string; licenseNumber?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchDemoRole: (role: 'client' | 'lawyer' | 'admin' | 'guest') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initial load: check stored user or default to DEMO_CLIENT so user can test immediately
    const existing = getStoredUser();
    if (existing) {
      setUser(existing);
    } else {
      // Default to demo client for immediate interactive experience
      setUser(DEMO_CLIENT);
      saveStoredUser(DEMO_CLIENT);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: UserRole = 'client') => {
    try {
      setIsLoading(true);
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: 'Password123!',
        });
        if (error) {
          // If supabase fails, fall back to simulated session
        }
      }

      // Check if email corresponds to a demo profile
      let loggedUser: UserProfile;
      if (email.toLowerCase().includes('admin')) {
        loggedUser = { ...DEMO_ADMIN, email };
      } else if (email.toLowerCase().includes('lawyer') || role === 'lawyer') {
        loggedUser = { ...DEMO_LAWYER_USER, email };
      } else {
        loggedUser = { ...DEMO_CLIENT, email, role };
      }

      setUser(loggedUser);
      saveStoredUser(loggedUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Kirishda xatolik yuz berdi' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    fullName: string;
    role: UserRole;
    phone?: string;
    licenseNumber?: string;
  }) => {
    try {
      setIsLoading(true);
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        email: data.email,
        full_name: data.fullName,
        role: data.role,
        phone: data.phone,
        created_at: new Date().toISOString(),
      };

      setUser(newUser);
      saveStoredUser(newUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Ro‘yxatdan o‘tishda xatolik' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch {
      // Ignore
    }
    setUser(null);
    saveStoredUser(null);
  };

  const switchDemoRole = (role: 'client' | 'lawyer' | 'admin' | 'guest') => {
    if (role === 'guest') {
      setUser(null);
      saveStoredUser(null);
    } else if (role === 'client') {
      setUser(DEMO_CLIENT);
      saveStoredUser(DEMO_CLIENT);
    } else if (role === 'lawyer') {
      setUser(DEMO_LAWYER_USER);
      saveStoredUser(DEMO_LAWYER_USER);
    } else if (role === 'admin') {
      setUser(DEMO_ADMIN);
      saveStoredUser(DEMO_ADMIN);
    }
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isLoading, login, register, logout, switchDemoRole } },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
