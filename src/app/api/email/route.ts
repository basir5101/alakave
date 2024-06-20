// Import SendGrid's mail service
import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

// Set the API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { messageBody, subject, to = "contact@djionidev.com" } = reqBody;

  try {
    // Add a new document with a generated id.
    const msg = {
      to, // Recipient
      from: "contact@djionidev.com", // Change to your verified sender
      subject: subject,
      html: messageBody,
    };
    const res = await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("err", error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
