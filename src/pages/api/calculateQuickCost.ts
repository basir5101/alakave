// pages/api/calculateQuickCost.ts
"use server";
import type { NextApiRequest, NextApiResponse } from "next";
// import { soap } from "strong-soap";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let soap;
    try {
      soap = (await import("strong-soap")).soap;
    } catch (error) {
      console.error("Failed to load strong-soap", error);
      return res.status(500).json({ message: "Error loading SOAP client" });
    }
    const url =
      "https://ws.chronopost.fr/quickcost-cxf/QuickcostServiceWS?wsdl";

    try {
      const client: any = await new Promise((resolve, reject) => {
        soap.createClient(url, (err: any, client: any) => {
          if (err) reject(err);
          else resolve(client);
        });
      });

      const result: any = await new Promise((resolve, reject) => {
        const body = JSON.parse(req.body);
        client.quickCost(
          {
            accountNumber: "19869502",
            password: "255562",
            depCode: "75007",
            arrCode: body.arrCode || "75001",
            weight: "1.3",
            productCode: body.productCode,
            type: "M",
          },
          (err: any, result: any) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to get quick cost", error: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
