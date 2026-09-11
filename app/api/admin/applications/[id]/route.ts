import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json(); // 'approved' or 'rejected'

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Get the application details
  const { data: app, error: appError } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (appError || !app) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  // 2. Update the application status
  const { error: updateError } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // 3. If approved, credit the user's account and send notification
  if (status === "approved") {
    // Increment Balance
    const { error: rpcError } = await supabase.rpc("increment_balance", {
      user_uuid: app.user_id,
      amount_to_add: app.amount,
    });

    if (rpcError) return NextResponse.json({ error: rpcError.message }, { status: 500 });

    // Create Transaction Record
    await supabase.from("transactions").insert({
      user_id: app.user_id,
      type: "credit",
      amount: app.amount,
      description: `${app.type} Approved`,
      status: "completed",
    });

    // Send In-App Notification
    await supabase.from("notifications").insert({
      user_id: app.user_id,
      title: "Application Approved",
      description: `Your ${app.type} for $${app.amount} has been approved and credited to your account.`,
    });
  } else if (status === "rejected") {
    // Send Rejection Notification
    await supabase.from("notifications").insert({
      user_id: app.user_id,
      title: "Application Rejected",
      description: `Your ${app.type} application for $${app.amount} has been rejected. Please contact support for more details.`,
    });
  }

  return NextResponse.json({ success: true });
}