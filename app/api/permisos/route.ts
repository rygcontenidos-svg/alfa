import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";

const FALLBACK = { admins: ["rygcontenidos"], sinRespuestas: [] as string[] };

async function fromSupabase(): Promise<{ admins: string[]; sinRespuestas: string[] }> {
  try {
    const client = supabaseService();
    const { data, error } = await client.from("permisos").select("key, value").eq("key", "config").single();
    if (error || !data) return FALLBACK;
    return JSON.parse(data.value);
  } catch {
    return FALLBACK;
  }
}

export async function GET() {
  const data = await fromSupabase();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const actual = await fromSupabase();

  if (body.toggle) {
    const idx = actual.sinRespuestas.indexOf(body.toggle);
    if (idx >= 0) actual.sinRespuestas.splice(idx, 1);
    else actual.sinRespuestas.push(body.toggle);
  }
  if (body.admins) actual.admins = body.admins;

  try {
    const client = supabaseService();
    await client.from("permisos").upsert({ key: "config", value: JSON.stringify(actual) }, { onConflict: "key" });
  } catch {}

  return NextResponse.json(actual);
}
