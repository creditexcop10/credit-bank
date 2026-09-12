import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Use Service Role key to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Generate a 6-digit code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 mins

    // 2. Save the code to the database
    const { error: dbError } = await supabase
      .from("otp_codes")
      .upsert({ email, code: otpCode, expires_at: expiresAt.toISOString() });

    if (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json({ error: "Failed to save OTP" }, { status: 500 });
    }

    // 3. Send the email using Brevo's REST API via fetch
    console.log("Attempting to send Brevo email to:", email);

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
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
        subject: "Your CreditExpo Verification Code",
        htmlContent: `
          <div style="font-family: sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #111a4a;">CreditExpo Verification</h2>
            <p>Please use the following code to complete your registration:</p>
            <h1 style="font-size: 40px; letter-spacing: 5px; color: #111a4a;">${otpCode}</h1>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error("Brevo API Error:", errorData);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    console.log("Brevo email sent successfully!");
    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Failed to generate OTP" }, { status: 500 });
  }
}