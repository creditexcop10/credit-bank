import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { email, code, newPassword } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const normalizedEmail = email.toLowerCase();

    // 1. Verify the code
    const { data, error } = await supabase
      .from("otp_codes")
      .select("code, expires_at")
      .eq("email", normalizedEmail)
      .single();

    if (error || !data) return NextResponse.json({ error: "Invalid code." }, { status: 400 });
    if (data.code !== code) return NextResponse.json({ error: "Invalid code." }, { status: 400 });
    if (new Date(data.expires_at) < new Date()) return NextResponse.json({ error: "Code expired." }, { status: 400 });

    // 2. Get the user ID
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users.users.find(u => u.email === normalizedEmail);

    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

    // 3. Update the password
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword
    });

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    // 4. Delete the OTP code
    await supabase.from("otp_codes").delete().eq("email", normalizedEmail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}