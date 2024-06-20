import "./../globals.css";
import "../../styles/fonts.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
export const metadata = {
  title: "Alakave | Vente de Vins exceptionnels et Rares",
  description:
    "Découvrez chez Alakave une sélection exclusive de vins rares, provenant des meilleures vignobles du monde. Achetez en ligne des vins uniques pour collectionneurs et amateurs de vins.",
};
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
