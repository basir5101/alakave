import Navbar from "@/components/common/Navbar";
import "./globals.css";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";

import "../styles/fonts.css";

import theme from "../utils/theme";
import Cookie from "@/components/common/Cookie";

export const metadata = {
  title: "Alakave | Vente de Vins exceptionnels et Rares",
  description:
    "Découvrez chez Alakave une sélection exclusive de vins rares, provenant des meilleures vignobles du monde. Achetez en ligne des vins uniques pour collectionneurs et amateurs de vins.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return children;
  //   (
  //   <html lang={locale}>
  //     <body className="">
  //       {/* <Navbar currentUser={currentUser?.toJSON() as typeof currentUser} /> */}
  //       <Cookie />
  //       <main>{children}</main>
  //     </body>
  //   </html>
  // );
}
