import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Missing email or code" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const normalizedEmail = email.toLowerCase();

    // 1. Fetch the code from the database
    const { data, error } = await supabase
      .from("otp_codes")
      .select("code, expires_at")
      .eq("email", normalizedEmail)
      .single();

    if (error || !data) {
      console.error("DB Fetch Error:", error);
      return NextResponse.json({ error: "No code found. Please register again." }, { status: 400 });
    }

    // 2. Check if code matches
    if (data.code !== code) {
      return NextResponse.json({ error: "Invalid code. Please check and try again." }, { status: 400 });
    }

    // 3. Check if code is expired
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: "Code has expired. Please request a new one." }, { status: 400 });
    }

    // 4. Success! Delete the code so it can't be reused
    await supabase.from("otp_codes").delete().eq("email", normalizedEmail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}