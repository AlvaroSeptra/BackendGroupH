import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.method === 'POST') {
    const { product_id, quantity } = req.body;

    const { data, error } = await supabase.from('cart').insert([
      { product_id, quantity, customer_id: user.id },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } else if (req.method === 'GET') {
    const { data, error } = await supabase.from('cart').select('*, products(*)').eq('customer_id', user.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}