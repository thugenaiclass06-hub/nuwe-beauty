import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { Resend } from 'resend';

const insertContactMessageSchema = z.object({
  name: z.string().min(1, '請輸入姓名'),
  email: z.string().email('請輸入有效的 Email'),
  subject: z.string().min(1, '請輸入主旨'),
  message: z.string().min(1, '請輸入訊息內容'),
});

async function sendEmail(data: { name: string; email: string; subject: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('RESEND_API_KEY not set, skipping email');
    return false;
  }
  
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'NUWE <onboarding@resend.dev>',
      to: 'nuweyun@gmail.com',
      subject: `[NUWE 網站] 新訊息：${data.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A90A4;">NUWE 網站收到新訊息</h2>
          <hr style="border: 1px solid #eee;" />
          <p><strong>姓名：</strong>${data.name}</p>
          <p><strong>Email：</strong>${data.email}</p>
          <p><strong>主旨：</strong>${data.subject}</p>
          <p><strong>訊息內容：</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #eee; margin-top: 20px;" />
          <p style="color: #666; font-size: 12px;">此郵件由 NUWE 網站自動發送</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

function getCleanDatabaseUrl() {
  let url = process.env.DATABASE_URL?.trim() || '';
  if (url.includes('channel_binding=')) {
    url = url.replace(/[&?]channel_binding=[^&]*/g, '');
    url = url.replace(/\?$/, '').replace(/&&/g, '&').replace(/\?&/g, '?');
  }
  return url;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const parsed = insertContactMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.errors[0]?.message || '驗證錯誤' });
    }

    const sql = neon(getCleanDatabaseUrl());
    
    await sql`
      INSERT INTO contact_messages (id, name, email, subject, message, created_at)
      VALUES (gen_random_uuid(), ${parsed.data.name}, ${parsed.data.email}, ${parsed.data.subject}, ${parsed.data.message}, NOW())
    `;
    
    await sendEmail(parsed.data);
    
    return res.status(201).json({ success: true, message: '訊息已成功送出！我們會盡快與您聯繫。' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ success: false, message: '系統錯誤，請稍後再試。' });
  }
}
