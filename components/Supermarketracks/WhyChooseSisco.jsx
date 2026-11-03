
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Factory,
  CalendarDays,
  LayoutGrid,
  ShoppingCart,
  HardHat,
  FileCheck,
  ArrowUpRight,
} from "lucide-react";



export default function WhyChooseSisco({city}) {
    const benefits = [
  {
    icon: Factory,
    title: `Factory and Showroom in ${city}`,
    description:
      "See finishes and shelf strength in Karawal Nagar before you order.",
  },
  {
    icon: CalendarDays,
    title: "Since 2015",
    description:
      "Making racks for shops, supermarkets and warehouses.",
  },
  {
    icon: LayoutGrid,
    title: "Store Planning Included",
    description:
      "Every quote comes with a rack plan for your floor area.",
  },
  {
    icon: ShoppingCart,
    title: "Small Orders Welcome",
    description:
      "From a single kirana wall to a full supermarket.",
  },
  {
    icon: HardHat,
    title: "Own Installation Crews",
    description:
      "For fitting, refreshes and shop shifting.",
  },
  {
    icon: FileCheck,
    title: "Fixed Quotes & GST Invoice",
    description:
      "Fixed quotes agreed before production. GST registered since 2017, so eligible business buyers can claim input tax credit.",
  },
];
  return (
    <section className="overflow-hidden bg-white py-6 sm:py-12">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-1 w-10 rounded-full bg-[#F5B817]" />
            <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
              Sisco Steel Products
            </span>
            <span className="h-1 w-10 rounded-full bg-[#F5B817]" />
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#172653] sm:text-4xl lg:text-[48px]">
            Why {city} Retailers{" "}
            <span className="text-[#D99C00]">Choose Sisco</span>
          </h2>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-10">

          {/* LEFT SHOWROOM IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[380px] overflow-hidden rounded-2xl sm:min-h-[480px] lg:min-h-[620px]"
          >
            <Image
              src="/supermarket_rack_.webp"
              alt={`Sisco Steel Products supermarket rack showroom in ${city}`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#172653]/90 via-[#172653]/10 to-transparent" />

            {/* IMAGE CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

              <span className="inline-flex items-center gap-2 rounded-full bg-[#F5B817] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#172653]">
                <Factory size={15} />
                {city} Manufacturing
              </span>

              <h3 className="mt-5 max-w-sm text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Built for Retail.
                <br />
                Made to Last.
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                Visit our Karawal Nagar factory and showroom to
                explore rack finishes and check shelf strength.
              </p>

              
            </div>
          </motion.div>

          {/* RIGHT BENEFIT CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 2) * 0.1,
                  }}
                  className="group flex items-start gap-4 rounded-2xl border border-[#E9EDF3] bg-white p-5 shadow-[0_5px_20px_rgba(23,38,83,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B817] hover:shadow-[0_12px_30px_rgba(23,38,83,0.10)] sm:p-6"
                >
                  {/* ICON */}
                  <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-xl bg-[#FFF5D9] text-[#203070] transition-all duration-300 group-hover:bg-[#F5B817]">
                    <Icon
                      size={30}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="text-base font-extrabold leading-6 text-[#172653] sm:text-lg">
                      {item.title}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#697386]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM HIGHLIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-[#172653] p-6 sm:flex-row sm:px-9 sm:py-7"
        >
          <div>
            <h3 className="text-xl font-extrabold text-white sm:text-2xl">
              Planning your next store setup?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/70">
              Talk to our team about your rack requirements and store layout.
            </p>
          </div>

          <a
            href="https://wa.me/917629827285?text=Hello%2C%20I%20want%20to%20discuss%20my%20store%20rack%20requirements."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[50px] shrink-0 items-center gap-3 rounded-full bg-[#F5B817] px-6 py-3 text-sm font-extrabold text-[#172653] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Discuss Your Requirements
            <ArrowUpRight size={18} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
