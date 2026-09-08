import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Total Users
  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // 2. Total Assets (Sum of all balances)
  const { data: balanceData } = await supabase.rpc("get_total_assets");
  
  // 3. Transactions Today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count: txToday } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .gte("created_at", today.toISOString());

  // 4. Pending KYC / Deposits
  const { count: pendingDeposits } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return NextResponse.json({
    totalUsers: totalUsers || 0,
    totalAssets: balanceData || 0,
    txToday: txToday || 0,
    pendingDeposits: pendingDeposits || 0
  });
}