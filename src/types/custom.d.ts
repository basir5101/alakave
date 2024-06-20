// types/custom.d.ts
import { NextApiRequest } from 'next';

declare module 'next' {
 export interface NextApiRequest {
    session?: {
      user?: {
        id: string;
      };
    };
 }
}