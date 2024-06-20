// src/hooks/useCookieConsent.ts (or just /hooks/useCookieConsent.ts if no src directory)
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useCookieConsent = () => {
  useEffect(() => {
    const consent = Cookies.get('mySiteCookieConsent');
    if (consent === "true") {
      // Initialize scripts that require consent
      console.log('Initializing cookies based scripts');
    }
  }, []);

  return {
    // You can also return consent state if needed elsewhere in your app
    consentGranted: Cookies.get('mySiteCookieConsent') === "true"
  };
}

export default useCookieConsent;
