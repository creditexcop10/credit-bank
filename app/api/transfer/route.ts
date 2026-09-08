import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { receiverAccount, amount, description, pin } = await req.json();
    
    const supabase = await createSupabaseServerClient();

    // 1. Get the currently logged-in user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify PIN (Security Check)
    // Note: For a production app, PINs should be hashed in the database. 
    // For this build, we check it against the raw_user_meta_data we saved during registration.
    const userPin = user.user_metadata?.pin;
    if (!userPin || pin !== userPin) {
      return NextResponse.json({ error: "Invalid Transaction PIN" }, { status: 403 });
    }

    // 3. Call the secure database function
    const { error } = await supabase.rpc('transfer_funds', {
      sender_uuid: user.id,
      receiver_account_num: receiverAccount,
      amount_to_transfer: parseFloat(amount),
      transfer_desc: description || "Instant Transfer"
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Transfer successful!" });
  } catch (error) {
    console.error("Transfer API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}