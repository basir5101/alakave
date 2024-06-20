"use client";
import { Button } from "@/components/ui/button";
import React, {
  FormEventHandler,
  FormHTMLAttributes,
  useEffect,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
interface CardData {
  [key: string]: string;
}
export default function PaymentCard(props: any) {
  const [card, setCard] = useState<any>();
  const [cardData, setCardData] = useState<CardData>({});
  const [token, setToken] = useState<string>();
  const [validatedCard, setValidatedCard] = useState<any>();
  const [paySuccess, setPaySuccess] = useState(false);
  const [browserName, setBrowserName] = useState<any>("");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const browserInfo = userAgent.match(
      /(Chrome|Safari|Firefox|Edge|IE|Opera)/i
    );
    if (browserInfo) {
      setBrowserName(browserInfo[0]);
    } else {
      setBrowserName("Unknown");
    }
  }, []);

  // create user, wallet and card
  const handleClick = async () => {
    toast.loading("creating user, wallet and card");
    const res = await fetch(`/api/mangopay/user`);
    const data = await res.json();
    setCard(data.card);
    toast.dismiss();
    toast.success("successfully created");
  };

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    toast.loading("Tokenizing card..");
    // Convert cardData to a query string
    const formData = new URLSearchParams();
    Object.entries(cardData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("accessKeyRef", card.AccessKey);
    formData.append("data", card.PreregistrationData);

    const res = await fetch(card.CardRegistrationURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData, // Pass formData here
    });
    toast.dismiss();
    // Check if the response is successful (status code 2xx)
    if (res.ok) {
      // Check if the response content type is JSON
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const resObj = await res.json();
        setToken(resObj);
      } else {
        // Handle non-JSON response here
        const text = await res.text();
        setToken(text);
        toast.success("Tokenized successfully");
        toast.loading("Updating Card...");
        await handleUpdate({
          Id: card.Id,
          UserId: card.UserId,
          Currency: "EUR",
          CardType: "CB_VISA_MASTERCARD",
          RegistrationData: text,
        });
      }
      toast.dismiss();
      toast.success("Card Updated Successfully");
    } else {
      console.error("Error:", res.statusText);
    }
  };

  const handleUpdate = async (cardData: {
    Id: string;
    UserId: string;
    Currency: string;
    CardType: string;
    RegistrationData: string;
  }) => {
    const res = await fetch("/api/mangopay/user", {
      method: "PUT",
      body: JSON.stringify(cardData),
    });
    const data = await res.json();
    setValidatedCard(data.data);
  };

  // handle card data
  const handleCardData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  // create direct payment
  const paymentHandler = async () => {
    toast("Creating payment...");
    const res = await fetch("/api/mangopay/user", {
      method: "POST",
      body: JSON.stringify({
        ...validatedCard,
        price: props.price,
        browserName: browserName,
      }),
    });
    toast.dismiss();
    const data = await res.json();
    if (data.success) {
      toast.success("Successfully paid!");
      setPaySuccess(true);
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-sm mx-auto mt-20 bg-white rounded-md shadow-md overflow-hidden">
        {paySuccess ? (
          <div className="text-center py-4">Successfully Paid</div>
        ) : (
          <>
            {validatedCard ? (
              <Button onClick={paymentHandler} className="w-full">
                Complete The payment
              </Button>
            ) : (
              <>
                {card ? (
                  <>
                    <div className="px-6 py-4 bg-gray-900 text-white">
                      <h1 className="text-lg font-bold">Pay With Card</h1>
                    </div>
                    <form onSubmit={handlePayment} className="px-6 py-4">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="card-number"
                        >
                          Card Number
                        </label>
                        <input
                          className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="card-number"
                          name="cardNumber"
                          type="text"
                          placeholder="**** **** **** ****"
                          onChange={handleCardData}
                          required={true}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="expiration-date"
                        >
                          Expiration Date
                        </label>
                        <input
                          className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="expiration-date"
                          name="cardExpirationDate"
                          type="text"
                          placeholder="MM/YY"
                          onChange={handleCardData}
                          required={true}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="cvv"
                        >
                          CVV
                        </label>
                        <input
                          className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="cvv"
                          name="cardCvx"
                          type="text"
                          placeholder="***"
                          onChange={handleCardData}
                          required={true}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-accent hover:bg-yellow-700"
                      >
                        Pay Now
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <Button className="w-full" onClick={handleClick}>
                      Pay Now - {props.price}€
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
