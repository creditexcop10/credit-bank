import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { amount, description } = await req.json();

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Insert the transaction record
  const { error: txError } = await supabase.from("transactions").insert({
    user_id: id,
    type: "credit",
    amount: amount,
    description: description || "Admin Deposit",
  });

  if (txError) {
    return NextResponse.json({ error: txError.message }, { status: 500 });
  }

  // 2. Increment the user's balance securely
  const { error: rpcError } = await supabase.rpc("increment_balance", {
    user_uuid: id,
    amount_to_add: amount,
  });

  if (rpcError) {
    return NextResponse.json({ error: rpcError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}