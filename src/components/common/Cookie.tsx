"use client";
import React, { useEffect, useState } from "react";
import useCookieConsent from "@/hooks/useCookieConsent";
import { CookieIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

function Cookie() {
  const { consentGranted } = useCookieConsent();
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (consentGranted) {
      console.log(
        "Cookie-related features or scripts can be initialized here."
      );
    }
  }, [consentGranted]);

  const accept = () => {
    document.cookie =
      "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    closeConsent();
    console.log("Consent given");
    // Additional logic for when consent is accepted
  };

  const decline = () => {
    closeConsent();
    // Additional logic for when consent is declined
  };

  const closeConsent = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
  };

  useEffect(() => {
    if (document.cookie.includes("cookieConsent=true")) {
      closeConsent();
    } else {
      setIsOpen(true);
    }
  }, []);

  if (hide) return null;

  return (
    <div
      className={cn(
        "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md transition-transform duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden"
      )}
    >
      <div className="bg-white rounded-md m-2">
        <div className="grid gap-2">
          <div className="border-b border-border h-14 flex items-center justify-between p-4">
            <h1 className="text-lg font-medium">We use cookies</h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-sm font-normal">
              Nous utilisons des cookies ou des technologies similaires pour des
              finalités techniques et, avec votre consentement, pour les
              finalités{" "}
              <strong>
                « fonctionnalité », « expérience », « mesure » et « marketing »
                (publicités personnalisées)
              </strong>{" "}
              comme décrit dans la politique relative aux cookies. Ces
              informations sont importantes pour mieux comprendre vos attentes.
              <br />
              <br />
              Vous pouvez librement donner, refuser ou retirer votre
              consentement à tout moment en accédant au panneau de préférences.
              Un refus de consentement peut entraîner l’indisponibilité des
              fonctionnalités connexes. Cliquez sur le bouton « Accepter » pour
              consentir. Cliquez sur le bouton « Refuser » pour continuer sans
              accepter.
              <br />
              <br />
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border bg-background/20">
            <Button
              onClick={accept}
              className="w-full bg-accent hover:bg-yellow-600"
            >
              ACCEPTER
            </Button>
            <Button onClick={decline} variant={"secondary"} className="w-full">
              REFUSER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cookie;
