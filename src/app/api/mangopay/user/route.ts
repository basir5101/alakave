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
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { headers } from "next/headers";

const config: base.Config = {
  clientId: "dpbtest",

  baseUrl: "https://api.sandbox.mangopay.com",
  clientApiKey: "gqZAwNqtE5AHegY6ttt4xuRpoShRWEAc4HxTXOztPk3PmHC8My",
};
const api = new MangoPayApi(config);

export async function GET(request: NextRequest) {
  //   const reqBody = await request.json();

  try {
    const currentUser = await getCurrentUser();
    // Extract firstName and lastName from displayName
    const displayNameParts = currentUser?.displayName?.split(" ");
    let firstName = "";
    let lastName = "";

    if (displayNameParts?.length === 1) {
      // If only one word, consider it as the firstName
      firstName = displayNameParts[0];
    } else {
      // If more than one word, split into firstName and lastName
      firstName = displayNameParts?.[0] || "";
      lastName = displayNameParts?.slice(1).join(" ") || "";
    }
    const userRef = doc(db, "users", currentUser?.uid || "");
    const documentSnapshot: any = await getDoc(userRef);
    // const { mangoId } = documentSnapshot.data();

    // create user to mango pay
    const user = await api.Users.create({
      PersonType: "NATURAL",
      FirstName: firstName,
      LastName: lastName,
      Email: currentUser?.email || "",
    });
    // Create wallet for the user
    const wallet = await api.Wallets.create({
      Owners: [user.Id],
      Description: "User wallet",
      Currency: "EUR",
    });

    // create card for the user
    const card = await api.CardRegistrations.create({
      UserId: user.Id,
      Currency: "EUR",
      CardType: "CB_VISA_MASTERCARD",
    });

    // Update user firebase
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, currentUser?.uid);

    await setDoc(docRef, {
      mangoId: user.Id,
      walletId: wallet.Id,
      cardId: card.Id,
      cardReg: card.Id,
    });

    return NextResponse.json({ success: true, card });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");
  const cardData = await request.json();
  try {
    // const currentUser = await getCurrentUser();

    let myDirectCardPayIn = {
      PaymentType: "CARD",
      ExecutionType: "DIRECT",
      AuthorId: cardData.UserId,
      Tag: "Created with Mangopay Node.js SDK",
      DebitedFunds: {
        Currency: "EUR",
        Amount: `${cardData.price}`,
      },
      Fees: {
        Currency: "EUR",
        Amount: "10",
      },
      CreditedWalletId: "wlt_m_01HSXAHQGB8BKN2PMQVT3S462B",
      CardId: cardData.CardId,
      CardType: "CB_VISA_MASTERCARD",
      SecureMode: "DEFAULT",
      SecureModeReturnURL: "https://mangopay.com/docs/please-ignore",
      BrowserInfo: {
        AcceptHeader:
          "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
        JavaEnabled: true,
        Language: "FR-FR",
        ColorDepth: 4,
        ScreenHeight: 1800,
        ScreenWidth: 400,
        TimeZoneOffset: 60,
        UserAgent: cardData.browserName,
        JavascriptEnabled: true,
      },
      IpAddress: ip,
    };

    const createDirectCardPayIn = async (payin: any) => {
      return await api.PayIns.create(payin)
        .then((response) => {
          console.info(response);
          return response;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    };
    const newData = await createDirectCardPayIn(myDirectCardPayIn);
    // // Update user firebase
    // const collectionRef = collection(db, "users");
    // const docRef = doc(collectionRef, currentUser?.uid);

    // await updateDoc(docRef, {
    //   mangoId: user.Id,
    //   walletId: wallet.Id,
    //   cardId: card.Id,
    // });
    return NextResponse.json({ success: true, data: newData });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const reqBody = await request.json();
  const currentUser = await getCurrentUser();

  try {
    const updateCardRegistration = await api.CardRegistrations.update(reqBody);

    // Update user firebase
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, currentUser?.uid);

    await updateDoc(docRef, {
      cardId: updateCardRegistration.CardId,
    });

    return NextResponse.json({ success: true, data: updateCardRegistration });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
