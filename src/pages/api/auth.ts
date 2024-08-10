import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      const { data: session, error } = await supabase.auth.signInWithPassword({ email, password });
  
      if (error) {
        return res.status(401).json({ error: error.message });
      }
  
      return res.status(200).json({ user: session?.user, token: session?.session?.access_token });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }