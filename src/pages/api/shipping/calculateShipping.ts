// pages/api/calculateShipping.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateShippingCost } from './chronopostService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const shippingCost = await calculateShippingCost(req.body);
      res.status(200).json(shippingCost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate shipping cost' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
