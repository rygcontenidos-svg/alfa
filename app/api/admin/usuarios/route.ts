import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";

export async function GET() {
  try {
    const client = supabaseService();

    // Fetch all users from auth
    const { data: authUsers, error: authError } = await client.auth.admin.listUsers();
    if (authError) throw authError;

    // Fetch all progress
    const { data: progress, error: progError } = await client
      .from("progress")
      .select("*");

    if (progError) throw progError;

    // Map progress by username
    const progressByUser: Record<string, any[]> = {};
    (progress ?? []).forEach((p: any) => {
      if (!progressByUser[p.username]) progressByUser[p.username] = [];
      progressByUser[p.username].push(p);
    });

    const usuarios = authUsers.users
      .filter((u: any) => u.email)
      .map((u: any) => ({
        email: u.email,
        username: u.user_metadata?.username ?? u.email?.split("@")[0] ?? u.id,
        lastSignIn: u.last_sign_in_at,
        progress: progressByUser[u.email?.split("@")[0] ?? ""] ?? [],
      }));

    return NextResponse.json({ usuarios });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
