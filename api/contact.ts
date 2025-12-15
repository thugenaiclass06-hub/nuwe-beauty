import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { z } from 'zod';

const insertContactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const parsed = insertContactMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: '請填寫所有必填欄位' });
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO contact_messages (id, name, email, subject, message, created_at)
      VALUES (gen_random_uuid(), ${parsed.data.name}, ${parsed.data.email}, ${parsed.data.subject}, ${parsed.data.message}, NOW())
      RETURNING *
    `;

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'NUWE <onboarding@resend.dev>',
          to: 'nuweyun@gmail.com',
          subject: `[NUWE 網站] 新訊息：${parsed.data.subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4A90A4;">NUWE 網站收到新訊息</h2>
              <hr style="border: 1px solid #eee;" />
              <p><strong>姓名：</strong>${parsed.data.name}</p>
              <p><strong>Email：</strong>${parsed.data.email}</p>
              <p><strong>主旨：</strong>${parsed.data.subject}</p>
              <p><strong>訊息內容：</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
                ${parsed.data.message.replace(/\n/g, '<br>')}
              </div>
              <hr style="border: 1px solid #eee; margin-top: 20px;" />
              <p style="color: #666; font-size: 12px;">此郵件由 NUWE 網站自動發送</p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

    res.status(201).json({ success: true, message: '訊息已成功送出！我們會盡快與您聯繫。' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: '發送失敗，請稍後再試' });
  }
}
