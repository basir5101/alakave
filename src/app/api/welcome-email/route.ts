import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

// Set the API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { displayName = "", email = "contact@djionidev.com" } = reqBody;

  try {
    // Add a new document with a generated id.
    const msg = {
      to: email, // Recipient
      from: "contact@djionidev.com", // Change to your verified sender
      templateId: "d-10591575acee4d63a2f55844a42b312b",
      // "https://mc.sendgrid.com/design-library/your-designs/fa3d288a-e50d-4635-888c-53acf075c5fc", // d-10591575acee4d63a2f55844a42b312b
      // "https://mc.sendgrid.com/design-library/your-designs/d-10591575acee4d63a2f55844a42b312b", // d-10591575acee4d63a2f55844a42b312b
      dynamicTemplateData: {
        displayName,
        ctaLink: `${process.env.API_URL}/my-account?email=true`,
      },
    };
    const res = await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("err", error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
