import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache'; // ✅ Correct import

// --- 🧩 Simple in-memory rate limiter ---
const limiter = new LRUCache<string, number>({
  max: 500, // track up to 500 IPs
  ttl: 60 * 1000, // 1 minute
});

const MAX_REQUESTS = 3;

export async function POST(request: Request) {
  
  try {
    // --- 🛑 RATE LIMIT CHECK ---
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      'unknown';

    const count = (limiter.get(ip) || 0) + 1;
    limiter.set(ip, count);

    if (count > MAX_REQUESTS) {
      console.warn(`🚫 Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, error: 'Trop de requêtes. Réessayez plus tard.' },
        { status: 429 }
      );
    }
    
    const formData = await request.formData();

    const prenom = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;
    const services = formData.get('services') as string;

    // Parse multiple recipients from env (comma-separated)
    const recipients = process.env.CONTACT_EMAILS
      ? process.env.CONTACT_EMAILS.split(',').map(e => e.trim())
      : [];

    if (recipients.length === 0) {
      throw new Error('No CONTACT_EMAILS defined in environment');
    }

    let attachment;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachment = {
        filename: file.name,
        content: buffer,
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email to all recipients
    await transporter.sendMail({
      from: `"Formulaire Particulier" <${process.env.SMTP_USER}>`,
      to: recipients, // array or comma-separated string both work
      subject: `Demande de devis - ${prenom}`,
      text: `
      Nouveau demande de devis particulier !
      
      Prenom: ${prenom}
      Email: ${email}
      Téléphone: ${phone}
      Services: ${services}

      Message:
      ${message}
                `,
      attachments: attachment ? [attachment] : [],
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
