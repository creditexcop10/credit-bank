import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Get the transaction details
  const { data: tx, error: txError } = await supabase
    .from("transactions")
    .select("user_id, amount")
    .eq("id", id)
    .single();

  if (txError || !tx) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  // 2. Update transaction status to 'completed'
  const { error: updateError } = await supabase
    .from("transactions")
    .update({ status: "completed" })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // 3. Increment the user's balance
  const { error: rpcError } = await supabase.rpc("increment_balance", {
    user_uuid: tx.user_id,
    amount_to_add: tx.amount,
  });

  if (rpcError) {
    return NextResponse.json({ error: rpcError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}