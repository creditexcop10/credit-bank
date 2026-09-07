import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// In Next.js 15+, params is a Promise!
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Await the params to get the actual id
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  // 2. Use the Service Role key to bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 3. Fetch Profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 4. Fetch Transactions for this user
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ profile, transactions: transactions || [] });
}