"use client";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { User } from "@/types/user";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import Loader2 from "@/components/common/Loader2";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductCard from "@/components/common/ProductCard";
import { useTranslations } from "next-intl";

export default function SimilarProducts({
  products,
  userId,
}: {
  products: Product[];
  userId: string;
}) {
  const t = useTranslations("product");
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  const getUsers = async () => {
    setLoading(true);
    const usersRef = collection(db, "users");
    let userQuery = query(usersRef, limit(20));
    const querySnapshot = await getDocs(userQuery);
    const usersDocs = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as User;
    });
    setUsers(usersDocs);
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="lg:px-16 lg:mx-20 mx-5 mt-10">
      <div className="flex items-center justify-between">
        <h2 className="w-full my-5 text-2xl flex font-bold ">
          <Star className="text-accent mr-3" /> {t("similar")}
        </h2>
        <div className="flex">
          <button
            className="bg-secondary p-2 rounded-full mr-2 group hover:bg-accent  transition-all"
            onClick={prevHandler}
          >
            <ChevronLeft className="group-hover:text-white" />
          </button>
          <button
            className="bg-secondary p-2 rounded-full mr-2 group hover:bg-accent  transition-all"
            onClick={nextHandler}
          >
            <ChevronRight className="group-hover:text-white" />
          </button>
        </div>
      </div>
      {loading ? (
        <Loader2 />
      ) : (
        <Swiper
          modules={[Autoplay]}
          autoplay={true}
          slidesPerView={5}
          spaceBetween={20}
          onSwiper={(swiper) => setSwiperRef(swiper)}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            400: {
              slidesPerView: 2,
            },
            639: {
              slidesPerView: 2,
            },
            865: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4,
            },
            1500: {
              slidesPerView: 4,
            },
            1700: {
              slidesPerView: 5,
            },
          }}
        >
          {products.length > 0 &&
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} userId={userId} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}
