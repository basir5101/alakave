import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  try {
    // Add a new document with a generated id.
    const q = query(collection(db, "addresses"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const addresses: any = [];
    querySnapshot.forEach((doc) => {
      addresses.push(doc.data());
    });
    return NextResponse.json({ success: true, addresses: addresses });
  } catch (error) {
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  try {
    // Add a new document with a generated id.
    const collectionRef = await collection(db, "addresses");
    const querySnapshot = await addDoc(collectionRef, reqBody);
    const addressId = querySnapshot.id;

    return NextResponse.json({ success: true, addressId: addressId });
  } catch (error) {
    console.error("err", error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
