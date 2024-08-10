import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code, discount, seller_id } = req.body;

    const { data, error } = await supabase.from('vouchers').insert([
      { code, discount, seller_id },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
