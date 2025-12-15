import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const insertReviewSchema = z.object({
  name: z.string().min(1, '請輸入姓名'),
  email: z.string().email('請輸入有效的 Email'),
  rating: z.number().min(1).max(5),
  content: z.string().min(1, '請輸入評價內容'),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = neon(process.env.DATABASE_URL!);

  if (req.method === 'GET') {
    try {
      const reviews = await sql`
        SELECT * FROM customer_reviews WHERE is_approved = true ORDER BY created_at DESC
      `;
      return res.status(200).json(reviews);
    } catch (error) {
      console.error('Get reviews error:', error);
      return res.status(200).json([]);
    }
  }

  if (req.method === 'POST') {
    try {
      const parsed = insertReviewSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: parsed.error.errors[0]?.message || '請填寫所有必填欄位' });
      }

      await sql`
        INSERT INTO customer_reviews (id, name, email, rating, content, is_approved, created_at)
        VALUES (gen_random_uuid(), ${parsed.data.name}, ${parsed.data.email}, ${parsed.data.rating}, ${parsed.data.content}, false, NOW())
      `;

      return res.status(201).json({ success: true, message: '感謝您的評價！審核通過後將會顯示在網站上。' });
    } catch (error) {
      console.error('Create review error:', error);
      return res.status(500).json({ success: false, message: '系統錯誤，請稍後再試。' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
