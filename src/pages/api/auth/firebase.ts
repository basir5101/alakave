// // pages/api/auth/firebase.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { getAuth } from 'firebase-admin/auth';
// import admin from '../../../lib/firebaseAdmin';
// import { getSession, signIn } from 'next-auth/react';

// type ResponseData = {
//   message: string;
//   user?: Record<string, any>;
//   error?: string;
// };

// export default async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
//   const token = req.body.token; // Firebase ID token from the client
//   if (!token) {
//     return res.status(400).json({
//         error: 'Token not provided',
//         message: ''
//     });
//   }

//   try {
//     const decodedToken = await getAuth().verifyIdToken(token);
//     const session = await getSession({ req });
//     if (!session) {
//       // NextAuth signIn logic here
//       // Note: 'credentials' provider might need customization in [...nextauth].ts to handle Firebase tokens
//       await signIn('credentials', { idToken: token, callbackUrl: '/' });
//       return res.status(200).json({ message: 'Authentication successful, session established', user: decodedToken });
//     } else {
//       // User is already in a NextAuth session
//       return res.status(200).json({ message: 'User already authenticated', user: decodedToken });
//     }
//   } catch (error) {
//     return res.status(500).json({
//         error: error instanceof Error ? error.message : 'An unexpected error occurred',
//         message: ''
//     });
//   }
// };
