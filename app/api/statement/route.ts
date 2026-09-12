import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import PDFDocument from "pdfkit";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Fetch Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // 2. Fetch Transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  // 3. Create PDF Document
  const doc = new PDFDocument({ margin: 50 });

  // Convert Node.js stream to Web API ReadableStream to satisfy TypeScript
  const stream = new ReadableStream({
    start(controller) {
      doc.on("data", (chunk: Buffer) => {
        controller.enqueue(new Uint8Array(chunk));
      });
      doc.on("end", () => {
        controller.close();
      });
      doc.on("error", (err) => {
        controller.error(err);
      });
    }
  });

  // --- PDF Layout ---

  // Header
  doc.fontSize(20).fillColor("#111a4a").text("CreditExpo Bank", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).fillColor("#333").text("Official Account Statement", { align: "center" });
  doc.moveDown(2);

  // User Info
  doc.fontSize(12).fillColor("#000");
  doc.text(`Account Holder: ${profile?.first_name || ""} ${profile?.last_name || ""}`);
  doc.text(`Account Number: ${profile?.account_number || "N/A"}`);
  doc.text(`Current Balance: $${profile?.balance?.toFixed(2) || "0.00"}`);
  doc.text(`Generated On: ${new Date().toLocaleDateString()}`);
  doc.moveDown(2);

  // Transactions Table Header
  doc.fontSize(10).fillColor("#555");
  doc.text("Date", 50, doc.y, { width: 100 });
  doc.text("Description", 150, doc.y - 12, { width: 200 });
  doc.text("Type", 350, doc.y - 12, { width: 50 });
  doc.text("Amount", 400, doc.y - 12, { width: 100 });
  doc.moveDown(0.5);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  // Transactions Data
  doc.fontSize(10).fillColor("#000");
  if (transactions && transactions.length > 0) {
    transactions.forEach((tx) => {
      const date = new Date(tx.created_at).toLocaleDateString();
      const desc = tx.description || "N/A";
      const type = tx.type;
      const amount = `$${tx.amount?.toFixed(2)}`;

      doc.text(date, 50, doc.y, { width: 100 });
      doc.text(desc, 150, doc.y - 12, { width: 200 });
      doc.text(type, 350, doc.y - 12, { width: 50 });
      doc.text(amount, 400, doc.y - 12, { width: 100 });
      doc.moveDown(0.5);
    });
  } else {
    doc.text("No transactions found.", 50, doc.y);
  }

  // Footer
  doc.moveDown(4);
  doc.fontSize(8).fillColor("#999").text("This is a computer-generated statement and does not require a signature.", { align: "center" });

  // End the document
  doc.end();

  // 4. Return the Web API ReadableStream
  return new Response(stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="CreditExpo_Statement.pdf"',
    },
  });
}