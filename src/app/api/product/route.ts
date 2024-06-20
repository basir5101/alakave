import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-config";
import { addDoc, collection } from "firebase/firestore";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  try {
    // Add a new document with a generated id.
    const collectionRef = await collection(db, "products");
    const querySnapshot = await addDoc(collectionRef, reqBody);
    const productId = querySnapshot.id;

    return NextResponse.json({ success: true, productId: productId });
  } catch (error) {
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
