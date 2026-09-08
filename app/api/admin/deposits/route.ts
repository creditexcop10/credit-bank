import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Fetch pending transactions
  const { data: transactions, error: txError } = await supabase
    .from("transactions")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (txError) {
    return NextResponse.json({ error: txError.message }, { status: 500 });
  }

  if (!transactions || transactions.length === 0) {
    return NextResponse.json([]);
  }

  // 2. Get unique user IDs from those transactions
  const userIds = [...new Set(transactions.map(t => t.user_id))];

  // 3. Fetch profiles for those user IDs
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, email")
    .in("id", userIds);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  // 4. Combine transactions with their matching profile
  const combined = transactions.map(tx => {
    const profile = profiles?.find(p => p.id === tx.user_id);
    return {
      ...tx,
      profile: profile // Attach the profile object
    };
  });

  return NextResponse.json(combined);
}