
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MessageCircle,
  Phone,
  Factory,
  BadgeCheck,
  Users,
  ArrowUpRight,
  Layers3,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import QuoteModal from "../QuoteModal";
import { useState } from "react";



const features = [
  {
    icon: Layers3,
    title: "300–800 kg/m²",
    description: "Steel mezzanine load capacity",
  },
  {
    icon: Ruler,
    title: "Up to 4.5 m",
    description: "Platform height",
  },
  {
    icon: ShieldCheck,
    title: "Staircase & Handrail",
    description: "Safe access included",
  },
];

export default function MezzanineHero({city}) {
    const [productquote, setProductquote] = useState(false);
    const trustItems = [
  { icon: CalendarDays, text: "Since 2015" },
  { icon: Factory, text: `Factory & Showroom in ${city}` },
  { icon: BadgeCheck, text: "GST Registered Since 2017" },
  { icon: Users, text: "Own Installation Crews" },
];
  return (
    <section className="relative isolate min-h-[750px] overflow-hidden bg-[#F4F6F9]">

      {/* FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/mezzanine_floor_storage_.webp"
          alt="Industrial steel mezzanine floor with staircase and safety handrails"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* WHITE OVERLAY - LEFT TO RIGHT */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/75 via-45% to-white/10 lg:via-white/80 lg:to-transparent" />

      {/* EXTRA SOFT WHITE BLEND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/20 via-transparent to-white/20" />

      <div className="relative mx-auto flex min-h-[750px] max-w-[1600px] items-center px-5 py-16 sm:px-8 md:px-12 lg:px-16">

        {/* CONTENT */}
        <div className="w-full max-w-[850px]">

          {/* BRAND LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-1 w-12 rounded-full " />
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#203070]">
             
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-[800px] text-[38px] font-extrabold leading-[1.12] tracking-tight text-[#203070] sm:text-5xl xl:text-[62px]"
          >
            Mezzanine Floors in {city}
           <span className="mt-2 block text-safety">
              Made in Our Karawal Nagar Factory
            </span>
           
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-[690px] text-base leading-5 text-[#4B5565] sm:text-lg sm:leading-8"
          >
            Add a second storage or work level inside your warehouse, factory
            or shop. Steel mezzanines rated 300 to 800 kg/m², platform heights
            up to 4.5 m, with staircase and handrail. Measured, built and
            installed across {city} by our own crew.
          </motion.p>

          {/* FEATURES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 grid max-w-[680px] grid-cols-3 divide-x divide-[#D1D7E2]"
          >
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-start px-3 first:pl-0 sm:px-5"
                >
                  <Icon className="mb-3 h-7 w-7 text-[#203070] sm:h-8 sm:w-8" />

                  <h3 className="text-sm font-extrabold leading-5 text-[#203070] sm:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[11px] leading-4 text-[#697386] sm:text-xs">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* TRUST STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 grid max-w-[850px] grid-cols-2 gap-x-4 gap-y-4 rounded-xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur-md sm:grid-cols-4 sm:p-5"
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
            <button
              onClick={() => setProductquote(true)}
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#F5B817] px-6 py-3 text-sm font-extrabold text-[#172653] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5A900] hover:shadow-lg"
            >
              <CalendarDays size={19} />
              Get a Free Quote
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            <Link
              href="https://wa.me/917629827285?text=Hello%2C%20I%20am%20interested%20in%20Mezzanine%20Floors."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#16A34A] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#12823C]"
            >
              <MessageCircle size={20} />
              WhatsApp +91 76298 27285
            </Link>

            <a
              href="tel:+917629827285"
              className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border-2 border-[#203070] bg-white/90 px-6 py-3 text-sm font-extrabold text-[#203070] transition-all duration-300 hover:-translate-y-1 hover:bg-[#203070] hover:text-white"
            >
              <Phone size={18} />
              Call Now
            </a>
          </motion.div>

<QuoteModal open={productquote} onClose={() => setProductquote(false)} />

        </div>
      </div>
    </section>
  );
}
