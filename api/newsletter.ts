import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const insertNewsletterSchema = z.object({
  email: z.string().email('請輸入有效的 Email'),
});

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
    const parsed = insertNewsletterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: '請輸入有效的 Email' });
    }

    const sql = neon(getCleanDatabaseUrl());
    
    const existing = await sql`
      SELECT * FROM newsletter_subscriptions WHERE email = ${parsed.data.email}
    `;
    
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: '此 Email 已經訂閱過囉！' });
    }

    await sql`
      INSERT INTO newsletter_subscriptions (id, email, created_at)
      VALUES (gen_random_uuid(), ${parsed.data.email}, NOW())
    `;

    return res.status(201).json({ success: true, message: '訂閱成功！感謝您加入 NUWE 家族。' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ success: false, message: '系統錯誤，請稍後再試。' });
  }
}
