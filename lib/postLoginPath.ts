import { supabase } from "@/lib/supabaseClient";

export async function resolvePostLoginPath(
  fallbackRedirect?: string | null
): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return fallbackRedirect || "/";
  }

  const { data } = await supabase
    .from("UserRole")
    .select("role")
    .eq("email", user.email)
    .single();

  const role = data?.role;

  if (role === "supervisor" || role === "admin" || role === "staff") {
    return "/admin";
  }

  return fallbackRedirect || "/";
}
