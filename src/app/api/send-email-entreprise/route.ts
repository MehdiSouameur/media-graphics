import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';

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
      request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    const count = (limiter.get(ip) || 0) + 1;
    limiter.set(ip, count);

    if (count > MAX_REQUESTS) {
      console.warn(`🚫 Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, error: 'Trop de requêtes. Réessayez plus tard.' },
        { status: 429 }
      );
    }

    // --- 💌 PROCESS FORM DATA ---
    const formData = await request.formData();

    const company = formData.get('company') as string;
    const addressLine1 = formData.get('addressLine1') as string;
    const postalCode = formData.get('postalCode') as string;
    const city = formData.get('city') as string;
    const email = formData.get('email') as string;
    const tva = formData.get('tva') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;
    const services = formData.get('services') as string;

    // --- 🧾 Validate required fields ---
    if (!company || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Champs manquants dans le formulaire.' },
        { status: 400 }
      );
    }

    // --- 📬 Recipients ---
    const recipients = process.env.CONTACT_EMAILS
      ? process.env.CONTACT_EMAILS.split(',').map(e => e.trim())
      : [];
    if (recipients.length === 0) {
      throw new Error('No CONTACT_EMAILS defined in environment');
    }

    // --- 📎 Optional attachment ---
    let attachment;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachment = {
        filename: file.name,
        content: buffer,
      };
    }

    // --- ✉️ Setup transporter ---
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // --- 📤 Send email ---
    await transporter.sendMail({
      from: `"Formulaire Entreprise" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: `Demande de devis - ${company}`,
      // ✅ Plain-text fallback (optional but good practice)
      text: `
    Nouvelle demande de devis entreprise !

    Entreprise: ${company}
    Adresse:
    ${addressLine1}
    ${postalCode} ${city}

    Email: ${email}
    Téléphone: ${phone}
    TVA: ${tva || 'Non renseignée'}
    Services: ${services || 'Non spécifiés'}

    Message:
    ${message}
      `,
      // ✅ HTML version (formatted + bold labels)
      html: `
        <h2>Nouvelle demande de devis entreprise&nbsp;!</h2>

        <p><strong>Entreprise&nbsp;:</strong> ${company}</p>

        <p>
          <strong>Adresse&nbsp;:</strong><br>
          ${addressLine1 ? `${addressLine1}<br>` : ''}
          ${postalCode || ''} ${city || ''}
        </p>

        <p><strong>Email&nbsp;:</strong> ${email}</p>
        <p><strong>Téléphone&nbsp;:</strong> ${phone}</p>
        <p><strong>TVA&nbsp;:</strong> ${tva || 'Non renseignée'}</p>
        <p><strong>Services&nbsp;:</strong> ${services || 'Non spécifiés'}</p>

        <hr>

        <p><strong>Message&nbsp;:</strong></p>
        <p>${(message || '').replace(/\n/g, '<br>')}</p>
      `,
      attachments: attachment ? [attachment] : [],
    });


    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    return NextResponse.json(
      { success: false, error: 'Échec de l’envoi de l’email.' },
      { status: 500 }
    );
  }
}
