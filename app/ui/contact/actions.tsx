'use server';

export { submitContactForm as submitContactFormSupabase } from '@/app/lib/services/contact/supabase-contact';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormResult {
  success: boolean;
  error?: string;
}

const CONTACT_TO_EMAIL = 'info@creolitos.com';
const RESEND_API_URL = 'https://api.resend.com/emails';

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResult> {
  const name = formData.name?.trim();
  const email = formData.email?.trim();
  const message = formData.message?.trim();

  if (!name || !email || !message) {
    return { success: false, error: 'Name, email, and message are required.' };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey) {
    console.error('Missing RESEND_API_KEY');
    return { success: false, error: 'Contact service is not configured.' };
  }

  if (!fromEmail) {
    console.error('Missing CONTACT_FROM_EMAIL');
    return { success: false, error: 'Contact service is not configured.' };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Contact Me Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Resend API error:', response.status, errorBody);
      return { success: false, error: 'Failed to send message. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in submitContactForm server action:', error);
    return { success: false, error: 'Failed to send message. Please try again.' };
  }
}
