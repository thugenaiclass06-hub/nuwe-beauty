import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const insertNewsletterSchema = z.object({
  email: z.string().email(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const parsed = insertNewsletterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: '請輸入有效的 Email' });
    }

    const sql = neon(process.env.DATABASE_URL!);
    
    const existing = await sql`
      SELECT * FROM newsletter_subscriptions WHERE email = ${parsed.data.email}
    `;
    
    if (existing.length > 0) {
      return res.status(400).json({ message: '此 Email 已經訂閱過了' });
    }

    const result = await sql`
      INSERT INTO newsletter_subscriptions (id, email, created_at)
      VALUES (gen_random_uuid(), ${parsed.data.email}, NOW())
      RETURNING *
    `;

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ message: '訂閱失敗，請稍後再試' });
  }
}
