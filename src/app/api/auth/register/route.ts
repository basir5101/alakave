import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import MangoPayApi, { base } from "mangopay2-nodejs-sdk";

const config: base.Config = {
  clientId: "dpbtest",

  baseUrl: "https://api.sandbox.mangopay.com",
  clientApiKey: "gqZAwNqtE5AHegY6ttt4xuRpoShRWEAc4HxTXOztPk3PmHC8My",
};
const api = new MangoPayApi(config);

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  try {
    // create user to mango pay
    const user = await api.Users.create({
      PersonType: "NATURAL",
      FirstName: reqBody.firstName,
      LastName: reqBody.lastName,
      Email: reqBody.email || "",
    });
    // Create wallet for the user
    const wallet = await api.Wallets.create({
      Owners: [user.Id],
      Description: "User wallet",
      Currency: "EUR",
    });

    // create card for the user
    const cardReg = await api.CardRegistrations.create({
      UserId: user.Id,
      Currency: "EUR",
      CardType: "CB_VISA_MASTERCARD",
    });
    // Add a new document with a generated id.
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, reqBody.id);

    await setDoc(docRef, {
      ...reqBody,
      mangoId: user.Id,
      walletId: wallet.Id,
      cardReg: cardReg.Id,
    });
    return NextResponse.json({ success: true, userId: user.Id });
  } catch (error) {
    console.log("error creating user", error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
