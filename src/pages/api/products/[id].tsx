// pages/product/[id].tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { createProduct, getProduct } from '../../../../functions/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
      const result = await getProduct(id);
      return res.status(200).json({ data: result });
    } catch (error) {
      console.error('Error getting product:', error);
      return res.status(500).json({ error: 'An error occurred while getting the product' });
    }
  } else if (req.method === 'POST') {
    const { title, description, price, quantity, category, region, vintage, storage, crdCapsule, image, images } = req.body;
    const userId = req.body.userId;

    try {
      const result = await createProduct({
        productDetails: {
          title,
          description,
          price,
          quantity,
          category,
          region,
          vintage,
          storage,
          crdCapsule,
          image,
          images,
        },
        userId,
      });

      return res.status(200).json({ data: result });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ error: 'An error occurred while creating the product' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
