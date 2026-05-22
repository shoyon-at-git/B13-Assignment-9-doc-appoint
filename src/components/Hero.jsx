"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const slides = [
    {
      id: 1,
      title: "Find Trusted Doctors Instantly",
      description:
        "Book appointments with experienced specialists from top hospitals without long waiting times.",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1400&auto=format&fit=crop",
    },

    {
      id: 2,
      title: "Smart Healthcare Starts Here",
      description:
        "Connect with verified doctors and manage your appointments smoothly from anywhere.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1400&auto=format&fit=crop",
    },

    {
      id: 3,
      title: "Your Health, Our Priority",
      description:
        "Get quality medical consultation and hassle-free booking in just a few clicks.",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative mx-auto mt-4 w-[95%] overflow-hidden rounded-[24px] shadow-xl sm:mt-6 sm:w-11/12 sm:rounded-[40px]">

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-[400px] sm:h-[480px] lg:h-[520px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>

            <div className="relative h-[400px] w-full sm:h-[480px] lg:h-[520px]">

              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">

                <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">

                  <div className="max-w-xl text-white">

                    {/* Badge */}
                    <p className="mb-3 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[10px] font-medium backdrop-blur sm:mb-4 sm:px-4 sm:py-2 sm:text-sm">
                      Trusted Healthcare Platform
                    </p>

                    {/* Heading */}
                    <h1 className="mb-3 text-2xl font-bold leading-tight sm:mb-5 sm:text-4xl lg:text-5xl">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="mb-6 max-w-md text-xs leading-relaxed text-slate-200 sm:mb-8 sm:max-w-xl sm:text-base lg:text-lg">
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">

                      <Link
                        href="/appointments"
                        className="rounded-full bg-sky-500 px-5 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-sky-600 sm:px-7 sm:py-3 sm:text-base"
                      >
                        Book Appointment
                      </Link>

                      <Link
                        href="/doctors"
                        className="rounded-full border border-white/40 px-5 py-2.5 text-center text-xs font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:px-7 sm:py-3 sm:text-base"
                      >
                        Explore Doctors
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}