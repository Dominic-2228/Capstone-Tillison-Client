
import { Resend } from 'resend';
import TillisonReceiptEmail from '@/emails/bookingEmail.jsx';
import { render } from '@react-email/components';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  console.log("POST route called!");
  try {
    const body = await req.json();
    const { booking } = body;

    const html = await render(<TillisonReceiptEmail booking={booking} />);

    // If render succeeds, send using html (avoid react prop while debugging)
    console.log("Resend API Key:", process.env.RESEND_API_KEY ? "SET" : "NOT SET");
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["22tilldj@gmail.com"],
      subject: `Tillison Photography Booking Confirmed!`,
      html: html, // send the already-rendered HTML
    });

    return new Response(JSON.stringify({ success: true, response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}