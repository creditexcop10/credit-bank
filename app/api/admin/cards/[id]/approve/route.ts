import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // id is the card_request id
  const { action } = await req.json(); // 'approve' or 'reject'

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Get the request to find the user_id
  const { data: request, error: reqError } = await supabase
    .from("card_requests")
    .select("user_id")
    .eq("id", id)
    .single();

  if (reqError || !request) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  // 2. Update request status
  const { error: updateError } = await supabase
    .from("card_requests")
    .update({ status: action })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // 3. If approved, generate the actual card
  if (action === "approved") {
    // Generate card details using pure JavaScript Math functions
    const randomNum = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
    const randomMonth = Math.floor(1 + Math.random() * 12).toString().padStart(2, '0');
    const randomYear = (new Date().getFullYear() + 4).toString();
    const randomCvv = Math.floor(100 + Math.random() * 900).toString();
    
    const { error: cardInsertError } = await supabase.from("cards").insert({
      user_id: request.user_id,
      card_type: "CreditExpo Virtual Debit",
      card_number: randomNum,
      expiry_month: randomMonth,
      expiry_year: randomYear,
      cvv: randomCvv,
      status: "active"
    });

    if (cardInsertError) {
      return NextResponse.json({ error: cardInsertError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}