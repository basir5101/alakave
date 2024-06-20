import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const HowToSell: React.FC = () => {
  const t = useTranslations("howToSell");
  const local = useLocale();
  // Define a type for the paragraph data
  type ParagraphData = {
    id: number;
    text: string;
  };

  // An array of objects containing the paragraph data
  const paragraphs: { [key: string]: ParagraphData } = {
    "1": {
      id: 1,
      text: "Dans votre compte, vous disposez d’une cave avec un K! Vous y trouverez toutes vos annonces en un clin d’œil. Cette Kave vous permet de proposer des ventes groupées soit plusieurs bouteilles. Cela permet à l’acheteur d’économiser un peur sur les prix de livraison. Sur chaque petite annonce, soyez le plus précis possible en indiquant clairement le nom, l’appellation le millésime et l’histoire de chacune des bouteilles que vous aurez choisie de mettre à la vente. Vous pourrez aussi répondre à tous vos messages en répondant pour chaque vin en vente en direct depuis votre compte",
    },
    "2": {
      id: 2,
      text: "Trouver le bon prix n’est pas une affaire si compliquée. Idealwine et Wine-searcher sont les sites référents en matière d’enchères que nous vous recommandons pour évaluer le prix de votre bouteille. Ils facturent en moyenne 25.2% TTC (21% HT) sur vos vins mis aux enchères de vin et expertisent eux-mêmes vos bouteilles avant de les passer en vente aux enchères. Pour vendre vos vins ALAKAVE, parcourez deux ou trois sites de vente au détail, vérifiez la cohérence des informations et obtenez une moyenne. Défalquez 4 à 6 Euros qui correspondent au transport et aux frais de services de votre plateforme. Votre bouteille se vendre très vite",
    },
    "3": {
      id: 3,
      text: "On est encore loin d’un full service de livraison mais grâce aux plateformes comme Vinted, les transporteurs proposent désormais des solutions très efficaces. Nous avons choisi de faire équipe avec le Groupe La Poste, DPD. Chronopost Viti permet expédier votre vin en express en France et à l’international, entre particuliers. Sur notre territoire, les colis sont livrés selon les délais d’acheminement choisis, le lendemain avant 13h ou avant 10h. Chronopost a développé une gamme d’emballages simples et rapides à monter, sécurisés, maniables et adaptés aux bouteilles de 75 cl et 150 cl et disponibles pour 1, 2, 3, 6 bouteilles et magnum",
    },
    "4": {
      id: 4,
      text: "Georges Dos Santos, maître caviste Lyonnais chez Antic Wine depuis 2001, estime qu’un vin est vieux à partir de 30 à 40 ans. En réalité, un vin ne vieillit pas, il se transforme. Et s’il risque la moindre usure alors ce sera à cause du bouchon ? C’est pour cela qu’on les remplace d’ailleurs sur certains grands crus, environ tous les 10 ans.",
    },
    "5": {
      id: 5,
      text: "Regardez bien le goulot de votre bouteille à contrejour et vérifiez l’état du col.",
    },
    "6": {
      id: 6,
      text: "Dans le goulot (parfait): niveau normal pour les vins de moins de 15 ans et, exceptionnel pour ceux vieux de 20 ans.",
    },
    "7": {
      id: 7,
      text: "Niveau Bas goulot: il est parfait pour les tous les vins de plus de 20 ans, acceptable pour ceux.",
    },
    "8": {
      id: 8,
      text: "Niveau Très légèrement bas : il est parfait pour les vins vieux de 40 ans, normal pour les vins de 30 ans",
    },
    "9": {
      id: 9,
      text: "Niveau Haut épaule : niveau normal pour les vins vieux de 40 ans, exceptionnel pour ceux d’avant 1960",
    },
    "10": {
      id: 9,
      text: "Bas de l’épaule : il représente des risques. Il peut être acceptable pour des vins d'avant 1950",
    },
    "11": {
      id: 10,
      text: "Niveau Mi-épaule : ce niveau trahit une faiblesse du bouchon et engendre quelques risques. Il est tout de même plus qu'acceptable pour les vins d'avant 1960",
    },
    "12": {
      id: 11,
      text: "Avant de réserver un vin en cave, assurez-vous que les conditions de stockage sont optimales. Les vins doivent être conservés à une température stable entre 10 et 15 degrés Celsius, dans un endroit sombre et sans vibrations. L'humidité relative doit également être maintenue entre 60 et 80%.",
    },
    "13": {
      id: 12,
      text: "Les bouteilles doivent être stockées horizontalement afin de maintenir le liège humide et de permettre une bonne conservation du vin. Il est également important de ne pas remuer les bouteilles de vin, car cela peut perturber le dépôt naturel qui se forme dans les bouteilles de vin qui ont vieilli.",
    },
    "14": {
      id: 13,
      text: "Pour faciliter l'identification et le suivi de vos vins en cave, il est recommandé d'étiqueter les bouteilles avec des informations telles que le millésime, le producteur, le cépage et la date d'achat.",
    },
  };

  return (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat py-28"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/how-to-sell.jpg')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
              <h1 className="mb-8 text-4xl font-semibold text-accent">
                {t("title")}
              </h1>
              <h3 className="mb-8 text-xl font-semibold text-white">
                {t("subtitle")}
              </h3>
            </div>
            {/* The second column will be empty to ensure the text stays on the left */}
            <div></div>
          </div>
        </div>
      </section>
      <section className="my-16 lg:my-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mb-5">
            {/* Column 1 */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="bg-gray-100 p-8 mb-6 shadow-sm rounded">
                <h4 className="font-bold">{t("sections.section1.title")}</h4>
                <p className="text-sm mt-2">{t("sections.section1.content")}</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="bg-gray-100 p-8 mb-6 shadow-sm rounded">
                <h4 className="font-bold">{t("sections.section2.title")}</h4>
                <p className="text-sm mt-2">{t("sections.section2.content")}</p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="bg-gray-100 p-8 mb-6 shadow-sm rounded">
                <h4 className="font-bold">{t("sections.section3.title")}</h4>
                <p className="text-sm mt-2">{t("sections.section3.content")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 mb-10">
            <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
              <img className="mt-5 w-full" src="/jpeg/bottle.jpeg" alt="" />
            </div>
            <div className="w-full md:w-2/3 px-4">
              {/* ... */}
              <div className="mt-5">
                <h4 className="font-semibold mb-4">
                  <h4 className="font-bold">{t("sections.section4.title")}</h4>
                </h4>
                <p className="text-gray-700">
                  {t("sections.section4.content.title")}
                </p>
                <p className="text-gray-700">
                  {t("sections.section4.content.1")}
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>{t("sections.section4.content.2")}</li>
                  <li>{t("sections.section4.content.3")}</li>
                  <li>{t("sections.section4.content.4")}</li>
                  <li>{t("sections.section4.content.5")}</li>
                  <li>{t("sections.section4.content.6")}</li>
                  <li>{t("sections.section4.content.7")}</li>
                </ol>

                <div className="w-full">
                  <Link href={`/${local}/register`}>
                    <img
                      className="mt-5 mb-0 w-full"
                      src="/jpeg/vendez.jpeg"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-10">
              <h2 className="w-full mb-6 font-semibold text-3xl px-4">
                {t("subTitle2")}
              </h2>

              <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
                <div className="bg-gray-100 p-8">
                  <h4 className="text-accent">
                    {t("sections.section5.title")}
                  </h4>
                  <p className="text-gray-700">
                    {t("sections.section5.content")}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
                <div className="bg-gray-100 p-8">
                  <h4 className="text-accent">
                    {t("sections.section6.title")}
                  </h4>
                  <p className="text-gray-700">
                    {t("sections.section6.content")}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
                <div className="bg-gray-100 p-8">
                  <h4 className="text-accent">
                    {t("sections.section7.title")}
                  </h4>
                  <p className="text-gray-700">
                    {t("sections.section7.content")}
                  </p>
                </div>
              </div>
              {/* Repeat for other columns */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowToSell;
