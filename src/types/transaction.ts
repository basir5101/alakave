export type Transaction = {
  id?: string | null;
  buyerId?: string | null;
  sellerId?: string | null;
  productId?: Date | null;
  timestamp?: Date | string | null;
  created_at?: Date | string | null;
  rating?: number | string | null;
};
