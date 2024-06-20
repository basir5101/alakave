export interface Product {
  dimensions?: any;
  weight?: any;
  id?: string;
  title: string;
  description: string;
  image?: string | null;
  images: string[] | [];
  vintage?: string | null;
  region?: string | null;
  price?: number | null;
  quantity?: number | null;
  category?: string | null;
  storage?: string | null;
  crdCapsule?: string | null;
  createdBy?: string;
  userId?: string | null;
  userName?: string | null;
  createdAt?: any | null;
  averageRating?: any;
}
