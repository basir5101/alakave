// lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';
import { z } from 'zod';

const firebaseAdminConfigSchema = z.object({
  projectId: z.string(),
  privateKey: z.string().transform((key) => key.replace(/\\n/g, '\n')), // Handle escaped newlines properly
  clientEmail: z.string(),
  // Include other fields if needed
});

// Assume your .env.local contains the keys exactly as the service account JSON
const firebaseAdminConfig = firebaseAdminConfigSchema.parse({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  // Map other fields as necessary
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    // If your Firebase Admin SDK needs a databaseURL, add it here
  });
}

export default admin;
