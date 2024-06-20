import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { Product } from "@/types/product";
import { Transaction } from "@/types/transaction";

interface ProductWithRating extends Product {
  averageRating?: string | number; // Assuming average rating is a string; adjust as necessary
}

export const fetchProductWithRatings = async () => {
  const collectionRef = collection(db, "products");
  const limitedQuery = query(collectionRef, limit(10));
  const querySnapshot = await getDocs(limitedQuery);
  const productsWithPendingRatings = querySnapshot.docs.map(async (doc) => {
    const productData = { id: doc.id, ...doc.data() } as ProductWithRating;

    // Fetch transactions and calculate average rating
    const transactionsRef = collection(db, "Transactions");
    const q = query(transactionsRef, where("productId", "==", productData.id));
    const transactionsSnapshot = await getDocs(q);
    const transactions = transactionsSnapshot.docs
      .map((doc) => doc.data() as Transaction)
      .filter(
        (transaction) =>
          transaction.rating !== undefined && transaction.rating !== null
      );
    if (transactions.length > 0) {
      const totalRating = transactions.reduce((acc, curr) => {
        // Use 0 if curr.rating is undefined, otherwise convert curr.rating to a number
        const rating = Number(curr.rating) || 0;
        return acc + rating;
      }, 0);
      productData.averageRating = (totalRating / transactions.length).toFixed(
        1
      );
    }

    return productData;
  });

  // Resolve all promises from map
  const productsWithRatings = await Promise.all(productsWithPendingRatings);
  return productsWithRatings;
};
