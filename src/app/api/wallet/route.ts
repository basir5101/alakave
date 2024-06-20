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
  const walletId = request.nextUrl.searchParams.get("walletId") || "";
  const cardId = request.nextUrl.searchParams.get("cardId") || "";
  let cardData = {};
  try {
    const walletData = await api.Wallets.get(walletId);
    try {
      cardData = await api.Cards.get(cardId);
    } catch (error) {
      cardData = await api.CardRegistrations.get(cardId);
    }

    return NextResponse.json({ success: true, data: { walletData, cardData } });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}

// export async function POST(request: NextRequest) {
//   const headersList = headers();
//   const ip = headersList.get("x-forwarded-for");
//   const cardData = await request.json();
//   try {
//     console.log("req body: ", JSON.stringify(cardData));
//     // const currentUser = await getCurrentUser();

//     let myDirectCardPayIn = {
//       PaymentType: "CARD",
//       ExecutionType: "DIRECT",
//       AuthorId: cardData.UserId,
//       Tag: "Created with Mangopay Node.js SDK",
//       DebitedFunds: {
//         Currency: "EUR",
//         Amount: `${cardData.price}`,
//       },
//       Fees: {
//         Currency: "EUR",
//         Amount: "10",
//       },
//       CreditedWalletId: "wlt_m_01HSXAHQGB8BKN2PMQVT3S462B",
//       CardId: cardData.CardId,
//       CardType: "CB_VISA_MASTERCARD",
//       SecureMode: "DEFAULT",
//       SecureModeReturnURL: "https://mangopay.com/docs/please-ignore",
//       BrowserInfo: {
//         AcceptHeader:
//           "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
//         JavaEnabled: true,
//         Language: "FR-FR",
//         ColorDepth: 4,
//         ScreenHeight: 1800,
//         ScreenWidth: 400,
//         TimeZoneOffset: 60,
//         UserAgent: cardData.browserName,
//         JavascriptEnabled: true,
//       },
//       IpAddress: ip,
//     };

//     const createDirectCardPayIn = async (payin: any) => {
//       return await api.PayIns.create(payin)
//         .then((response) => {
//           console.info(response);
//           return response;
//         })
//         .catch((err) => {
//           console.log(err);
//           return false;
//         });
//     };
//     const newData = await createDirectCardPayIn(myDirectCardPayIn);
//     // // Update user firebase
//     // const collectionRef = collection(db, "users");
//     // const docRef = doc(collectionRef, currentUser?.uid);

//     // await updateDoc(docRef, {
//     //   mangoId: user.Id,
//     //   walletId: wallet.Id,
//     //   cardId: card.Id,
//     // });
//     console.log("payment data", newData);
//     return NextResponse.json({ success: true, data: newData });
//   } catch (error) {
//     console.log("error", error);
//     return NextResponse.json({ success: false, data: error }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest) {
//   const reqBody = await request.json();

//   try {
//     console.log("req body: ", JSON.stringify(reqBody));

//     const updateCardRegistration = await api.CardRegistrations.update(reqBody);

//     console.log("mongo update card", updateCardRegistration);

//     return NextResponse.json({ success: true, data: updateCardRegistration });
//   } catch (error) {
//     console.log("error", error);
//     return NextResponse.json({ success: false, data: error }, { status: 500 });
//   }
// }
