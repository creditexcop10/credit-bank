import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { title, message, userIds, sendEmail } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Determine target users
    let targetUsers = userIds;
    if (!targetUsers || targetUsers.length === 0) {
      const { data: allUsers, error: fetchError } = await supabase
        .from("profiles")
        .select("id");
        
      if (fetchError) return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
      targetUsers = allUsers.map((u: any) => u.id);
    }

    if (targetUsers.length === 0) {
      return NextResponse.json({ error: "No users to send to." }, { status: 400 });
    }

    // 2. Insert In-App Notifications
    const notificationsToInsert = targetUsers.map((id: string) => ({
      user_id: id,
      title: title,
      description: message,
    }));

    const { error: notifError } = await supabase.from("notifications").insert(notificationsToInsert);
    if (notifError) return NextResponse.json({ error: notifError.message }, { status: 500 });

    // 3. Send Emails via Brevo (if requested)
    if (sendEmail) {
      const { data: users } = await supabase
        .from("profiles")
        .select("email")
        .in("id", targetUsers);

      if (!users || users.length === 0) {
        return NextResponse.json({ error: "In-app notification sent, but no users found with emails." }, { status: 400 });
      }

      const emailRecipients = users.filter((u: any) => u.email).map((u: any) => u.email);

      if (emailRecipients.length === 0) {
        return NextResponse.json({ error: "In-app notification sent, but selected users have no email addresses." }, { status: 400 });
      }

      const brevoApiKey = process.env.BREVO_API_KEY;
      const brevoSender = process.env.BREVO_SENDER_EMAIL || "noreply@credexcop.com";

      if (!brevoApiKey) {
        return NextResponse.json({ error: "Missing BREVO_API_KEY in .env.local" }, { status: 500 });
      }

      // Loop through and send emails one by one
      for (const email of emailRecipients) {
        const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            sender: { email: brevoSender, name: "CreditExpo Bank" },
            to: [{ email }],
            subject: title,
            // 1. Add a plain text version (Helps bypass spam filters)
            textContent: `${title}\n\n${message}\n\n© ${new Date().getFullYear()} CreditExpo Bank. All rights reserved.`,
            // 2. Premium HTML Template
            htmlContent: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>${title}</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #f8f9fc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 40px 0;">
                  <tr>
                    <td align="center">
                      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                        
                        <!-- Header -->
                        <tr>
                          <td style="background-color: #111a4a; padding: 30px 40px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">CreditExpo Bank</h1>
                          </td>
                        </tr>
                        
                        <!-- Body -->
                        <tr>
                          <td style="padding: 40px;">
                            <h2 style="color: #111a4a; margin-top: 0; margin-bottom: 20px; font-size: 20px;">${title}</h2>
                            <p style="color: #506690; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                              ${message}
                            </p>
                            <div style="text-align: center; margin-top: 40px;">
                              <a href="https://your-app-domain.com/login" style="background-color: #2f55d4; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; display: inline-block;">
                                Log In to Dashboard
                              </a>
                            </div>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #f8f9fc; padding: 30px 40px; border-top: 1px solid #e9ecef;">
                            <p style="color: #8492a6; font-size: 12px; text-align: center; margin: 0;">
                              © ${new Date().getFullYear()} CreditExpo Bank. All rights reserved.<br>
                              If you did not request this email, please ignore it.
                            </p>
                          </td>
                        </tr>
                        
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>
            `,
          }),
        });

        if (!brevoResponse.ok) {
          const errorData = await brevoResponse.json();
          console.error(`Brevo Error for ${email}:`, errorData);
          return NextResponse.json({ 
            error: `Email failed for ${email}: ${errorData.message || 'Unknown Brevo Error'}` 
          }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ success: true, message: `Broadcast sent to ${targetUsers.length} users.` });
  } catch (error: any) {
    console.error("Broadcast Server Error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}