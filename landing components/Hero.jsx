"use client"

import { useState } from "react"
import QuoteModal from "./QuoteModal"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"

const slides = [
  {
    // NOTE: desktop image must be the version with the text removed
    desktop: "/sisco_bann.webp",
    mobile: "/sloted angle.webp",
    alt: "Slotted Angle Rack - Industrial Storage Solutions",
  },
]

export default function Hero() {
  const [quote, setQuote] = useState(false)

  return (
    <section className="relative h-[85svh] min-h-[500px] max-h-[900px] w-full overflow-hidden bg-black max-[720px]:h-auto max-[720px]:min-h-0 max-[720px]:aspect-square">

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={slides.length > 1}
        speed={900}
        autoplay={false}
        className="hero-swiper absolute inset-0 h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.desktop}>
            <div className="h-full w-full">

              {/* Desktop Banner */}
              <img
                src={slide.desktop}
                alt={slide.alt}
                fetchPriority="high"
                className="hidden h-full w-full object-cover object-center min-[721px]:block"
              />

              {/* Mobile Square Banner */}
              <img
                src={slide.mobile}
                alt={slide.alt}
                fetchPriority="high"
                className="block h-full w-full object-cover object-center min-[721px]:hidden"
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Left Gradient Overlay (desktop only, keeps text readable) */}
      <div className="pointer-events-none absolute inset-0 z-[2] hidden bg-gradient-to-r from-black/60 via-black/10 to-transparent min-[721px]:block" />

      {/* Desktop Text Overlay (replaces the text removed from the image) */}
      <div className="pointer-events-none absolute left-[3.5%] top-1/2 z-[5] hidden -translate-y-1/2 min-[721px]:block">
        <h2 className="font-bold leading-[1.05] tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
          <span className="block text-5xl text-white lg:text-6xl xl:text-7xl">
            Slotted Angle
          </span>
          <span className="block text-5xl text-[#F47B20] lg:text-6xl xl:text-7xl">
            Racks
          </span>
        </h2>

        {/* Orange divider */}
        <div className="my-5 h-[4px] w-24 rounded-full bg-[#F47B20] lg:w-28" />

        <p className="max-w-[22rem] text-base font-medium leading-snug text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] lg:text-lg xl:max-w-md xl:text-xl">
          Durable &amp; Versatile Storage for Warehouses, Factories and Industrial Spaces.
        </p>
      </div>

      {/* Content: mobile heading + Get a Quote button */}
      <div className="absolute bottom-10 left-5 z-[5] flex max-w-xl flex-col items-start gap-3 px-2 max-[720px]:bottom-auto max-[720px]:top-[22%] min-[721px]:left-[3.5%] min-[721px]:px-0 md:bottom-16 md:gap-4">

        {/* Mobile heading only */}
        <h1 className="block text-3xl font-bold tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)] min-[721px]:sr-only">
          Slotted Angle Rack
        </h1>

        {/* Get a Quote - All Devices */}
        <button
          type="button"
          onClick={() => setQuote(true)}
          className="group flex items-center gap-2 rounded-full border border-white/50 bg-white px-4 py-2.5 text-xs font-semibold text-black shadow-xl transition-all duration-300 hover:bg-black hover:text-white md:gap-3 md:px-5 md:py-3.5 md:text-sm"
        >
          Get a Quote

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black md:h-8 md:w-8">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>

      </div>

      <QuoteModal
        open={quote}
        onClose={() => setQuote(false)}
      />

      <style jsx global>{`
        .hero-swiper,
        .hero-swiper .swiper-wrapper,
        .hero-swiper .swiper-slide {
          width: 100%;
          height: 100%;
        }

        .hero-swiper .swiper-slide {
          overflow: hidden;
        }
      `}</style>

    </section>
  )
}