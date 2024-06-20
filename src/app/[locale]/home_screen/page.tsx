import Categories from "@/components/home/Categories";
import { Product } from "@/types/product";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import SliderComponent from "@/components/ui/animations/Slider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase-config";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import ByVintage from "./ByVintage";
import ByRegion from "./ByRegion";
import Users from "./Users";
import { fetchProductWithRatings } from "@/lib/data-fetching/fetchProductsWithRatings";
import ProductCard from "@/components/common/ProductCard";
import { useTranslations } from "next-intl";

export default async function Home() {
  const currentUser = await getCurrentUser();

  // Resolve all promises from map
  const productsWithRatings = await fetchProductWithRatings();
  const favoritesQuery = query(
    collection(db, `users/${currentUser?.uid}/favorites`)
  );
  const favoritesSnapshot = await getDocs(favoritesQuery);
  const favoriteProducts =
    favoritesSnapshot?.docs?.map((doc) => doc.data()) || [];

  return (
    <HomeContent
      productsWithRatings={productsWithRatings}
      currentUser={currentUser}
    />
  );
}

function HomeContent({
  productsWithRatings,
  currentUser,
}: {
  productsWithRatings: Product[];
  currentUser: any;
}) {
  const t = useTranslations("Home");
  return (
    <div className="mb-10">
      <Navbar />
      <SliderComponent />
      <div className="xl:container xl:mx-20">
        <Categories />
      </div>
      <section className="xl:px-16 xl:mx-20 mx-5">
        <h1 className="my-5 xl:text-2xl text-lg font-bold text-accent">
          {t("headerTitle")}
        </h1>

        {productsWithRatings?.length ? (
          <div className="grid text-sm mg:grid-cols-3 grid-cols-2 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 gap-4 lg:gap-5">
            {productsWithRatings.map((product) => (
              <ProductCard
                userId={currentUser?.uid || ""}
                product={product}
                key={product.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center"> {t("noProductFound")} </div>
        )}
      </section>
      <div id="byVintage">
        <ByVintage userId={currentUser?.uid || ""} />
      </div>
      <div id="byRegion">
        <ByRegion userId={currentUser?.uid || ""} />
      </div>
      <div id="users">
        <Users />
      </div>
      <Footer />
    </div>
  );
}
