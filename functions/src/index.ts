// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

if (admin.apps.length === 0) {
  admin.initializeApp();
}

// Assuming you have a type or interface for the session object
interface Session {
  user: {
    id: string; // Add this line to include the id property
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
  // Other properties of the session object
}

interface ExtendedSession extends Session {
  user: {
    id: string; // Include the id property
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export const createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;

  try {
    await admin.firestore().collection('users').doc(uid).set({
      email,
      name: displayName,
      photoURL,
      // Add any other fields you want to store in the user document
    });

    console.log(`User document created for user ${uid}`);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
});

export const createProduct = async (productAndUser: { productDetails: any; userId: any; }) => {
  const { productDetails, userId } = productAndUser;

  try {
    const productRef = await admin.firestore().collection('products').add({
      title: productDetails.title,
      description: productDetails.description,
      price: productDetails.price,
      quantity: productDetails.quantity,
      category: productDetails.category,
      region: productDetails.region,
      vintage: productDetails.vintage,
      storage: productDetails.storage,
      crdCapsule: productDetails.crdCapsule,
      image: productDetails.image,
      images: productDetails.images,
      userId: userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const product = await productRef.get();

    return {
      success: true,
      product: {
        id: productRef.id,
        ...product.data(),
      },
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw new functions.https.HttpsError('internal', 'Error creating product');
  }
};

export const createProductHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, description, price, quantity, category, region, vintage, storage, crdCapsule, image, images } = req.body;

    const session = (await getSession({ req })) as unknown as ExtendedSession;

    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;

    try {
      const productRef = await admin.firestore().collection('products').add({
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
        userId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      const product = await productRef.get();

      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'An error occurred while creating the product' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export const getProduct = async (id: string) => {
  const productDoc = await admin.firestore().collection('products').doc(id).get();

  if (!productDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Product not found');
  }

  const productData = productDoc.data();

  return {
    success: true,
    product: {
      id: productDoc.id,
      ...productData,
    },
  };
};

export const createUserWithPhoto = async (uid: string, email: string, displayName: string, photoURL: string) => {
  try {
    const userRef = admin.firestore().collection('users').doc(uid);

    const userData = {
      email,
      name: displayName,
      photoURL,
    };

    await userRef.set(userData);

    console.log(`User document created for user ${uid}`);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};