"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type UserRole = "supervisor" | "admin" | "staff" | "user" | null;

export function useUserRole() {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  async function loadUserRole() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setEmail(null);
      setRole(null);
      setLoading(false);
      return;
    }

    setEmail(user.email);

    const { data } = await supabase
      .from("UserRole")
      .select("role")
      .eq("email", user.email)
      .single();

    setRole((data?.role as UserRole) || "user");
    setLoading(false);
  }

  useEffect(() => {
    loadUserRole();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUserRole();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const canAccessAdmin = role === "supervisor" || role === "admin";
  const canManageUsers = role === "supervisor";

  return {
    email,
    role,
    loading,
    canAccessAdmin,
    canManageUsers,
    refreshRole: loadUserRole,
  };
}