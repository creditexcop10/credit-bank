import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if they already have a pending request or an active card
  const { data: existingCard } = await supabase.from("cards").select("id").eq("user_id", user.id).maybeSingle();
  if (existingCard) {
    return NextResponse.json({ error: "You already have an active card." }, { status: 400 });
  }

  const { data: existingReq } = await supabase.from("card_requests").select("id").eq("user_id", user.id).eq("status", "pending").maybeSingle();
  if (existingReq) {
    return NextResponse.json({ error: "You already have a pending request." }, { status: 400 });
  }

  // Insert the request
  const { error } = await supabase.from("card_requests").insert({ user_id: user.id });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}