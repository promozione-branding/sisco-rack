"use client";

import {
  CalendarDays,
  Layers3,
  ShieldCheck,
  Factory,
  FileText,
  Phone,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import QuoteModal from "../QuoteModal";
import { useState } from "react";



export default function HeroSlotted({city}) {

    const [productquote, setProductquote] = useState(false)  

  const trustItems = [
  { icon: CalendarDays, title: "Since 2015" },
  { icon: Layers3, title: "5,000+", subtitle: "racks supplied" },
  { icon: ShieldCheck, title: "GST registered", subtitle: "since 2017" },
  { icon: Factory, title: "Factory & showroom", subtitle: `in ${city}` },
];
  return (
    <section className="relative mt-15 isolate min-h-[680px] overflow-hidden bg-[#172653] text-white">

      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/blog_hero.webp')",
        }}
      />

      {/* Strong navy gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/95 via-[55%] to-ink/55" />

      {/* Additional image darkening */}
      <div className="absolute inset-0 z-[1] bg-ink/15" />

      {/* Main content */}
      <div className="relative z-10 mx-auto  flex min-h-[680px] max-w-[1440px] items-center px-5 py-16 sm:px-8 sm:pt-30 lg:px-14">

        <div className="w-full max-w-[920px]">

          {/* Brand */}
          <div
            className="mb-7 inline-flex items-center gap-3"
          >
            <span className="h-1 w-10 rounded-full " />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
              
            </span>
          </div>

          {/* Heading */}
          <h1
            className="max-w-[900px] text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-7xl "
          >
            Slotted Angle Racks in {city}
            
          </h1>

          {/* Description */}
          <div
            className="mt-7 max-w-[780px] space-y-1 text-base font-medium leading-5  text-white sm:text-lg"
          >
            <p>
              Bolt-together steel racks for offices, shops,
              godowns and warehouses.
            </p>

            <p>
              14 and 12 gauge angles, 6 to 14 ft heights,
              up to 250 kg per shelf.
            </p>

            <p>
              Delivered and installed across {city} by
              our own crew.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="mt-9 flex flex-wrap gap-3"
          >
            <button
              onClick={() => setProductquote(true)}
              className="group inline-flex items-center gap-3 rounded-lg bg-[#F5B817] px-6 py-4 font-bold text-[#172653] shadow-lg shadow-black/20 hover:bg-[#FFD04A]"
              href="#contact"
            >
              <FileText size={19} />
              Get a Fixed Quote
              <ArrowUpRight size={18} />
            </button>

            <a
              href="https://wa.me/917629827285"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border-2 border-white bg-[#172653]/80 px-5 py-4 font-bold text-white hover:bg-white hover:text-[#203070]"
            >
              <MessageCircle size={20} />
              WhatsApp +91 76298 27285
            </a>

            <a
              href="tel:+917629827285"
              className="inline-flex items-center gap-3 rounded-lg border-2 border-white bg-[#172653]/80 px-6 py-4 font-bold text-white hover:bg-white hover:text-[#203070]"
            >
              <Phone size={19} />
              Call Now
            </a>
          </div>

          {/* Trust strip */}
          <div
            className="mt-12 grid grid-cols-2 gap-5 rounded-xl border border-white/30 bg-[#172653]/95 p-5 shadow-xl md:grid-cols-4 md:gap-0"
          >
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 md:px-2 ${
                    index !== 0
                      ? "md:border-l md:border-white/30"
                      : ""
                  }`}
                >
                  <Icon
                    size={29}
                    strokeWidth={2}
                    className="shrink-0 text-[#FFC629]"
                  />

                  <div>
                    <p className="text-sm font-bold text-white sm:text-base">
                      {item.title}
                    </p>

                    {item.subtitle && (
                      <p className="mt-1 text-xs font-medium text-white sm:text-sm">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <QuoteModal open={productquote} onClose={() => setProductquote(false)} />


      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-gradient-to-r from-[#F5B817] via-[#FFD04A] to-transparent" />

    </section>
  );
}