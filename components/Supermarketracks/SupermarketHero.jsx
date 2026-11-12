
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Store,
  MessageCircle,
  Phone,
  CalendarDays,
  Factory,
  BadgeCheck,
  Users,
  ArrowUpRight,
  Check,
} from "lucide-react";
import QuoteModal from "../QuoteModal";
import { useState } from "react";

const rackTypes = [
  { name: "Wall Racks", icon: "wall" },
  { name: "Centre Racks", icon: "centre" },
  { name: "Corner Racks", icon: "corner" },
  { name: "End Racks", icon: "end" },
];



function RackIcon({ type }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9" {...common}>
      {type === "wall" && (
        <>
          <path d="M12 9v47M17 17h35M17 32h35M17 47h35" />
          <path d="M17 17v35M52 17v35" />
          <path d="M18 17h34M18 32h34M18 47h34" stroke="#F5B817" strokeWidth="4" />
        </>
      )}

      {type === "centre" && (
        <>
          <path d="M10 13h44M10 29h44M10 45h44" />
          <path d="M16 8v43M48 8v43" />
          <path d="M10 13h44M10 29h44M10 45h44" stroke="#F5B817" strokeWidth="4" />
        </>
      )}

      {type === "corner" && (
        <>
          <path d="M12 17l21-10 20 10-20 11z" />
          <path d="M12 17v29l21 11V28M53 17v29L33 57" />
          <path d="M12 32l21 11 20-11" stroke="#F5B817" strokeWidth="4" />
        </>
      )}

      {type === "end" && (
        <>
          <path d="M19 9v46M45 9v46" />
          <path d="M19 17h26M19 32h26M19 47h26" />
          <path d="M19 17h26M19 32h26M19 47h26" stroke="#F5B817" strokeWidth="4" />
        </>
      )}
    </svg>
  );
}

export default function SupermarketHero({ city }) {
      const [productquote, setProductquote] = useState(false)  
    
    const trustItems = [
  { icon: CalendarDays, text: "Since 2015" },
  { icon: Factory, text: `Factory & Showroom in ${city}` },
  { icon: BadgeCheck, text: "GST Registered Since 2017" },
  { icon: Users, text: "Own Installation Crews" },
];
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#F4F6F9]">

      {/* FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/store_display_racks_black_.webp"
          alt="Supermarket display racks with stocked shelves"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] sm:object-center"
        />
      </div>

      {/* LEFT TO RIGHT WHITE OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 via-[38%] to-white/10 lg:via-white/95 lg:to-transparent" />

      {/* SOFT OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/10 via-transparent to-white/20" />

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-[760px] max-w-[1600px] items-center px-5 py-16 sm:px-8 md:px-12 lg:px-16">

        <div className="w-full max-w-[850px]">

          {/* BRAND LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-1 w-12 rounded-full" />

            <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
              
            </span>
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-[800px] text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#172653] sm:text-5xl xl:text-[62px]"
          >
            Supermarket Display Racks in {city}
            
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-[690px] text-base leading-5 text-[#4B5565] sm:text-lg sm:leading-6"
          >
            Wall, centre, corner and end racks for supermarkets, kirana stores,
            pharmacies and departmental stores. 5 to 8 ft heights, up to 250 kg
            per shelf, planned to your floor area and fitted by our own crew.
          </motion.p>

          {/* RACK TYPES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 grid max-w-[700px] grid-cols-4 divide-x divide-[#D5DAE3]"
          >
            {rackTypes.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center px-2 text-center first:pl-0 last:pr-0"
              >
                <div className="text-[#203070]">
                  <RackIcon type={item.icon} />
                </div>

                <span className="mt-2 text-[11px] font-extrabold text-[#172653] sm:text-sm">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>

          {/* TRUST STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 grid max-w-[850px] grid-cols-2 gap-x-4 gap-y-4 rounded-xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur-md sm:grid-cols-4 sm:p-5"
          >
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 shrink-0 text-[#203070]" />

                  <span className="text-[11px] font-bold leading-4 text-[#26334D] sm:text-xs">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            {/* PLAN STORE */}
            <button
              onClick={() => setProductquote(true)}
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#F5B817] px-6 py-3 text-sm font-extrabold text-[#172653] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5A900] hover:shadow-lg"
            >
              <Store size={19} />
             Get a Quote

              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            {/* WHATSAPP */}
            <Link
              href={`https://wa.me/917629827285?text=${encodeURIComponent(
                `hello i want to enquire about Supermarket Racks in ${city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#16A34A] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#12823C]"
            >
              <MessageCircle size={20} />
              WhatsApp +91 76298 27285
            </Link>

            {/* CALL */}
            <a
              href="tel:+917629827285"
              className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border-2 border-[#203070] bg-white/90 px-6 py-3 text-sm font-extrabold text-[#203070] transition-all duration-300 hover:-translate-y-1 hover:bg-[#203070] hover:text-white"
            >
              <Phone size={18} />
              Call Now
            </a>
          </motion.div>

        </div>
        <QuoteModal open={productquote} onClose={() => setProductquote(false)} />
        
      </div>
    </section>
  );
}
