"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@heroui/react";
import Link from "next/link";

const Sliders = () => {
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await fetch(`${serverUrl}/api/idea`);
        const data = await res.json();
        setSlidesData(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, [serverUrl]);

  if (loading) {
    return (
      <div className="w-full h-[600px] bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (slidesData.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-900 flex items-center justify-center text-white">
        No slides available.
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative bg-gray-900 group custom-swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={"fade"}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slidesData.map((slide) => (
          <SwiperSlide
            key={slide._id || slide.id}
            className="relative w-full h-full"
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] scale-105"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center items-start text-white">
              <span className="text-blue-400 font-semibold tracking-wider uppercase mb-3">
                {slide.tags || "Launch Your Idea"}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl leading-tight mb-4">
                {slide.ideaTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 font-light">
                {slide.description}
              </p>

              {/* CTA Button */}
              <Link href={`/ideas`}>
                <Button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                  Explore Ideas
                </Button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sliders;
