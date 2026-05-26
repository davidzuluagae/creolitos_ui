'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
}

interface ContactFormResult {
  success: boolean;
  error?: string;
  requestId?: string;
}

const CONTACT_TO_EMAIL = 'info@creolitos.com';
const WEBSITE_CONTACT_SUBJECT = '[Creolitos Website] New contact form submission';

const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(320),
  message: z.string().trim().min(10, 'Please include a short message.').max(5000),
  company: z.string().optional(),
});

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResult> {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Please check the form and try again.',
    };
  }

  const { name, email, message, company } = parsed.data;
  const requestId = createRequestId();

  // Hidden honeypot field. Real users leave this blank; bots often fill it.
  if (company) {
    return { success: true, requestId };
  }

  const smtpUser = process.env.GOOGLE_SMTP_USER;
  const appPassword = process.env.GOOGLE_SMTP_APP_PASSWORD;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;
  const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_TO_EMAIL;

  try {
    if (!smtpUser || !fromEmail || !appPassword) {
      console.error('Missing GOOGLE_SMTP_USER, GOOGLE_SMTP_APP_PASSWORD, or CONTACT_FROM_EMAIL');
      return { success: false, error: 'Contact service is not configured.' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: appPassword,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `${WEBSITE_CONTACT_SUBJECT} [${requestId}] - ${name}`,
      text: `New website contact form submission\n\nRequest ID: ${requestId}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>New website contact form submission</strong></p>
        <p><strong>Request ID:</strong> ${requestId}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    return { success: true, requestId };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error: 'Failed to send message. Please try again.' };
  }
}

function createRequestId() {
  return `CR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
