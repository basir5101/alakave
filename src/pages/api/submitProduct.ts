// pages/api/submitProduct.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createProduct } from '../../../functions/src'; // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Assuming createProduct expects a specific object shape; adjust as necessary
    const productDetails = req.body;
    const userId = productDetails?.userId; // Example, ensure you have session handling implemented

    // Directly calling the imported createProduct function
    const result = await createProduct({ productDetails, userId });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in submitProduct API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
