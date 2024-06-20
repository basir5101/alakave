// pages/api/shipCost.ts

import type { NextApiRequest, NextApiResponse } from "next";
import * as soap from "soap";

// Define your WSDL URL and any required namespaces or additional settings
const WSDL_URL =
  "https://ws.chronopost.fr/quickcost-cxf/QuickcostServiceWS?wsdl";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure we're only processing POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // Extract data from the POST request
  const { uid, arrCode, productCode } = req.body;
  console.log("req", req.body);

  // Example: Default data, replace with your actual data retrieval logic
  const args = {
    accountNumber: "19869502",
    password: "255562",
    depCode: "75007",
    arrCode: arrCode || "75001",
    weight: "1.3",
    productCode: productCode || "01",
    type: "M",
  };

  // This would typically be replaced with real database queries
  if (uid) {
    args.depCode = "Your fetched shipper zip code"; // Example replacement
    args.arrCode = "Your fetched recipient zip code"; // Example replacement
  }

  // Create SOAP client and handle errors
  soap.createClient(WSDL_URL, (err, client) => {
    if (err) {
      console.error("Error creating SOAP client:", err);
      res
        .status(500)
        .json({ status: "error", message: "Failed to create SOAP client" });
      return;
    }

    // Invoke the SOAP method and handle errors
    client.quickCost(args, (err: any, result: any) => {
      console.log("args", args);
      if (err) {
        console.error("Error in SOAP request:", err);
        res
          .status(500)
          .json({ status: "error", message: "SOAP request failed" });
        return;
      }

      // Log the result and return a success response
      console.log("SOAP request successful:", result);
      res.status(200).json({ status: "success", data: result });
    });
  });
}
