import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category"); // 'loan', 'grant', or null for all

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let query = supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data: applications, error: appError } = await query;

  if (appError) return NextResponse.json({ error: appError.message }, { status: 500 });
  if (!applications || applications.length === 0) return NextResponse.json([]);

  const userIds = [...new Set(applications.map(a => a.user_id))];
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, email")
    .in("id", userIds);

  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

  const combined = applications.map(app => {
    const profile = profiles?.find(p => p.id === app.user_id);
    return { ...app, profile };
  });

  return NextResponse.json(combined);
}