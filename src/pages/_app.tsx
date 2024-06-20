// pages/_app.tsx
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css"; // Assuming you'll keep this for some global CSS
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Adjust the import path as necessary
import { ThemeProvider } from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return () => unsubscribe();
  }, []);

  return <Component {...pageProps} firebaseUser={firebaseUser} />;
}

export default MyApp;
