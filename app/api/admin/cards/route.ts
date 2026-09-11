import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch pending card requests
  const { data: requests, error: reqError } = await supabase
    .from("card_requests")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (reqError) return NextResponse.json({ error: reqError.message }, { status: 500 });
  if (!requests || requests.length === 0) return NextResponse.json([]);

  const userIds = [...new Set(requests.map(r => r.user_id))];
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, email")
    .in("id", userIds);

  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

  const combined = requests.map(req => {
    const profile = profiles?.find(p => p.id === req.user_id);
    return { ...req, profile };
  });

  return NextResponse.json(combined);
}