import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, budget, message } = body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Professional HTML template
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // always your email account
      to: process.env.EMAIL_USER, // your inbox, not the customer's
      replyTo: email, // customer's email (this makes reply go to them)
      subject: `📩 New Contact Form Submission - ${name} (${email})`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8f9fc; padding: 20px; color: #333;">
          <table style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <tr>
              <td style="background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 20px; text-align: center; color: #fff;">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 16px;">Hello 👋, you have received a new message from your website contact form.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><b>Name:</b></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><b>Email:</b></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><b>Phone:</b></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><b>Company:</b></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><b>Service:</b></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${service || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><b>Budget:</b></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${budget || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; vertical-align: top;"><b>Message:</b></td>
                    <td style="padding: 10px; white-space: pre-line;">${message}</td>
                  </tr>
                </table>
                
                <p style="margin-top: 30px; font-size: 14px; color: #666;">This email was automatically generated from your website’s contact form.</p>
              </td>
            </tr>
            <tr>
              <td style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 13px; color: #555;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("Contact form submission:", body);

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json({ message: "Error processing request." }, { status: 500 });
  }
}
