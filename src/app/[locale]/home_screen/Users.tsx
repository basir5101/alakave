"use client";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { User } from "@/types/user";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import Loader2 from "@/components/common/Loader2";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Users() {
  const locale = useLocale();
  const t = useTranslations("Home");
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
    <div className="xl:px-16 xl:mx-20 mx-5 mt-10">
      <div className="flex items-center justify-between">
        <h2 className="w-full my-5 text-2xl font-bold text-accent">
          {t("userTitle")}
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
              slidesPerView: 5,
            },
            1700: {
              slidesPerView: 6,
            },
          }}
        >
          {users.length > 0 &&
            users.map((user) => (
              <SwiperSlide key={user.id}>
                <div className="shadow p-5 h-60 border text-center flex items-center justify-center flex-col">
                  <Image
                    className="rounded-full"
                    src={
                      user.photoURL ||
                      "https://firebasestorage.googleapis.com/v0/b/alakave-ef7b3.appspot.com/o/alakave%2Foll1uWXhlWRQHj5zkI6zrHirZC73%2Flogo-seb.png?alt=media&token=3b29b66a-5c55-4ef1-a48a-d7eb5989546d%22"
                    }
                    height={120}
                    width={120}
                    alt="user"
                    style={{ height: "120px" }}
                  />
                  <Link
                    href={`/${locale}/seller/${user.id}`}
                    className="mt-3 font-semibold hover:text-accent"
                  >
                    {user.firstName} {user.lastName}{" "}
                  </Link>
                  {user?.verified && (
                    <div className="flex items-center text-sm">
                      <span> Utilisateur vérifié</span>{" "}
                      <BadgeCheck className="ml-3 text-green-700" />
                    </div>
                  )}
                  {user?.professional && (
                    <div className="text-sm"> Vendeur professionnel </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}
