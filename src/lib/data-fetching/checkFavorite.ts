import { doc, DocumentReference, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

async function checkFavorite(
  userId: string,
  productId: string
): Promise<boolean> {
  if (!userId || !productId) {
    return false;
  }

  const favRef: DocumentReference = doc(
    db,
    `users/${userId}/favorites`,
    productId
  );
  const docSnap = await getDoc(favRef);

  return docSnap.exists();
}

export default checkFavorite;
