
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Store,
  Ruler,
  Layers3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const storePlans = [
  {
    size: "Up to 300 sq ft",
    type: "Kirana Store",
    layout:
      "Wall racks on three sides, billing counter at the front.",
    racks:
      "Wall racks plus three to five aisles, heavy goods at the back.",
  },
  {
    size: "300–800 sq ft",
    type: "Mini Mart",
    layout:
      "Wall racks plus one or two centre rows.",
    racks:
      "Zones for grocery, personal care, toys and offers.",
  },
  {
    size: "800–2,000 sq ft",
    type: "Supermarket",
    layout:
      "Wall bays along all free walls, corner racks, one end rack near the counter.",
    racks:
      "Departmental racks for heavy packs, double-sided rows, corner and end racks.",
  },
  {
    size: "Above 2,000 sq ft",
    type: "Hypermarket",
    layout:
      "Wall bays, 2–6 double-sided bays, an end rack on each row.",
    racks:
      "Hypermarket racks in the centre, a personal care wall, toy racks and back-store storage.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export default function StorePlanningSection() {
  return (
    <section className="overflow-hidden bg-[#F4F6F9] py-6 sm:py-12">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-7 lg:px-10">

        {/* TOP SECTION */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">

          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-1 w-11 rounded-full bg-[#F5B817]" />
              <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
                Smart Store Planning
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-extrabold leading-[1.15] tracking-tight text-[#203070] sm:text-4xl xl:text-[48px]"
            >
              Plan Your Store:
              <span className="mt-1 block">
                How Many Racks{" "}
                <span className="text-[#D99C00]">Do You Need?</span>
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[620px] text-[15px] leading-7 text-[#5F6B7D] sm:text-base sm:leading-8"
            >
              Start with your free wall length: divide it by 3 for
              900 mm bays or by 4 for 1,200 mm bays. Then add
              centre rows if the floor allows aisles. We confirm
              the plan after measuring your shop.
            </motion.p>

            {/* BAY CALCULATIONS */}
            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <div className="flex items-center gap-4 rounded-xl border border-[#F4E3B3] bg-[#FFF6DE] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-[#203070]">
                  <Ruler size={27} />
                </div>

                <div>
                  <p className="text-base font-extrabold text-[#203070]">
                    900 mm Bays
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#697386]">
                    Wall length ÷ 3
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-[#F4E3B3] bg-[#FFF6DE] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-[#203070]">
                  <Layers3 size={27} />
                </div>

                <div>
                  <p className="text-base font-extrabold text-[#203070]">
                    1,200 mm Bays
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#697386]">
                    Wall length ÷ 4
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -bottom-3 -right-3 h-24 w-24 rounded-br-[30px] bg-[#F5B817] sm:-bottom-4 sm:-right-4" />

            <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px] lg:h-[430px]">
              <Image
                src="/supermarket_storage_.webp"
                alt="Supermarket aisle layout with display racks and billing counter"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#172653]/45 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-[#172653]/90 px-5 py-4 text-white shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#F5B817]">
                  Designed Around Your Space
                </p>
                <h3 className="mt-1 text-lg font-extrabold sm:text-xl">
                  Every Aisle Has a Purpose
                </h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TABLE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="mt-14 overflow-hidden rounded-2xl border border-[#E0E5ED] bg-white shadow-[0_10px_35px_rgba(23,38,83,0.07)] lg:mt-20"
        >
          {/* DESKTOP TABLE */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[0.85fr_1.35fr_1.35fr] bg-[#172653] text-white">
              <div className="flex items-center gap-3 border-r border-white/20 px-5 py-5 lg:px-7">
                <Store className="text-[#F5B817]" size={25} />
                <span className="text-sm font-extrabold lg:text-base">
                  Store Size
                </span>
              </div>

              <div className="flex items-center gap-3 border-r border-white/20 px-5 py-5 lg:px-7">
                <Layers3 className="text-[#F5B817]" size={25} />
                <span className="text-sm font-extrabold lg:text-base">
                  Layout We Usually Suggest
                </span>
              </div>

              <div className="flex items-center gap-3 px-5 py-5 lg:px-7">
                <Ruler className="text-[#F5B817]" size={25} />
                <span className="text-sm font-extrabold lg:text-base">
                  Racks to Start With
                </span>
              </div>
            </div>

            {storePlans.map((plan, index) => (
              <div
                key={plan.size}
                className={`grid grid-cols-[0.85fr_1.35fr_1.35fr] ${
                  index !== storePlans.length - 1
                    ? "border-b border-[#E4E8EF]"
                    : ""
                }`}
              >
                {/* STORE SIZE */}
                <div className="flex items-center gap-3 bg-[#FFF7E3] px-5 py-6 lg:px-7">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#203070]">
                    <Store size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold leading-5 text-[#172653] lg:text-base">
                      {plan.size}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#A77A12]">
                      {plan.type}
                    </p>
                  </div>
                </div>

                {/* LAYOUT */}
                <div className="flex items-center border-l border-[#E4E8EF] px-5 py-6 lg:px-7">
                  <p className="text-sm font-medium leading-6 text-[#35415A] lg:text-[15px]">
                    {plan.layout}
                  </p>
                </div>

                {/* RACKS */}
                <div className="flex items-center gap-3 border-l border-[#E4E8EF] px-5 py-6 lg:px-7">
                  <CheckCircle2
                    size={21}
                    className="shrink-0 text-[#D99C00]"
                  />
                  <p className="text-sm font-medium leading-6 text-[#35415A] lg:text-[15px]">
                    {plan.racks}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE CARDS */}
          <div className="space-y-4 p-4 md:hidden">
            {storePlans.map((plan, index) => (
              <motion.div
                key={plan.size}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="overflow-hidden rounded-xl border border-[#E4E8EF]"
              >
                <div className="flex items-center gap-3 bg-[#172653] p-4 text-white">
                  <Store size={25} className="text-[#F5B817]" />
                  <div>
                    <h3 className="text-base font-extrabold">
                      {plan.size}
                    </h3>
                    <p className="text-xs font-medium text-[#F5B817]">
                      {plan.type}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-[#203070]">
                      <Layers3 size={16} />
                      Layout We Usually Suggest
                    </p>
                    <p className="text-sm leading-6 text-[#5F6B7D]">
                      {plan.layout}
                    </p>
                  </div>

                  <div className="border-t border-[#E8EBF1] pt-4">
                    <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-[#203070]">
                      <CheckCircle2 size={16} className="text-[#D99C00]" />
                      Racks to Start With
                    </p>
                    <p className="text-sm leading-6 text-[#5F6B7D]">
                      {plan.racks}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

       

      </div>
    </section>
  );
}
