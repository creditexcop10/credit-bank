import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Check if user exists
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(email);
    
    // Supabase doesn't have a direct getUserByEmail in admin, so we use sign in with OTP or list users.
    // Actually, let's just generate the code and send it. If the email doesn't exist, the code just expires.
    // But to be safe, let's check if they exist in auth.users
    const { data: users } = await supabase.auth.admin.listUsers();
    const userExists = users.users.find(u => u.email === email);

    if (!userExists) {
      // For security, we don't tell them the email doesn't exist. We just pretend it was sent.
      return NextResponse.json({ success: true });
    }

    // 2. Generate a 6-digit code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // 3. Save to database
    await supabase.from("otp_codes").upsert({ 
      email: email.toLowerCase(), 
      code: otpCode, 
      expires_at: expiresAt.toISOString() 
    });

    // 4. Send email via Brevo
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { 
          email: process.env.BREVO_SENDER_EMAIL || "noreply@credexcop.com", 
          name: "CreditExpo" 
        },
        to: [{ email }],
        subject: "Password Reset Code",
        htmlContent: `
          <div style="font-family: sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #111a4a;">Password Reset</h2>
            <p>Use the following code to reset your password:</p>
            <h1 style="font-size: 40px; letter-spacing: 5px; color: #111a4a;">${otpCode}</h1>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}