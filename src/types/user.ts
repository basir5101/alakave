// Removed import { Role } from "@prisma/client"; due to lint error

export type User = {
  cardReg?: string;
  dateOfBirth?: Date | null | undefined;
  email?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
  mangoId?: string;
  phoneNumber?: string;
  photoURL?: string;
  role?: string;
  walletId?: string;
  cardId?: string;
  details?: string;
  rating?: string;
  professional?: boolean;
  company_name?: string;
  siret_number?: string;
  proof?: string;
  direct_delivery?: string;
  emailVerified?: boolean;
  verified?: boolean;
  createdAt: string;
};
