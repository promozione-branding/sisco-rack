
"use client";

import { motion } from "framer-motion";
import {
  Weight,
  Package,
  Boxes,
  Warehouse,
  Layers3,
  Truck,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const loadRatings = [
  {
    range: "300–500",
    unit: "kg/m²",
    title: "Light Storage",
    items: "Light cartons, files, records",
    build: "Structural or modular mezzanine, metal deck",
    icon: Package,
  },
  {
    range: "500",
    unit: "kg/m²",
    title: "Medium Storage",
    items: "Carton stock, e-commerce picking",
    build: "Rack-supported or double-decker mezzanine",
    icon: Boxes,
  },
  {
    range: "750",
    unit: "kg/m²",
    title: "Heavy Storage",
    items: "Spares, components, packed goods in bulk",
    build: "Modular or factory mezzanine, 2 levels",
    icon: Warehouse,
  },
  {
    range: "800",
    unit: "kg/m²",
    title: "Industrial Storage",
    items: "Heavy stock, cold store goods",
    build: "Warehouse or cold storage mezzanine",
    icon: Layers3,
  },
  {
    range: "300–500",
    unit: "kg per level",
    title: "Multi-Level Storage",
    items: "Small parts across many levels",
    build: "Storage system with grating deck, or catwalk",
    icon: Boxes,
  },
  {
    range: "Above 800",
    unit: "kg/m²",
    title: "Special Heavy Loads",
    items: "Pallets moved by trucks, machines",
    build: "Designed to order after a site survey",
    icon: Truck,
  },
];

export default function MezzanineLoadRating() {
  return (
    <section className="relative overflow-hidden bg-[#F1F3F7] py-6 sm:py-12 ">

      {/* BACKGROUND DECORATION */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#203070]/5 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#F5B817]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#203070]/10 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
            <Weight size={15} />
            Load Capacity Guide
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#203070] sm:text-4xl lg:text-5xl">
            Which Load Rating{" "}
            <span className="text-[#D99C00]">
              Do You Need?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#697386] sm:text-base">
            Rate the deck for the heaviest thing that will sit on it, not
            the average. Use this as a starting point; our engineer confirms
            the rating from your load list.
          </p>
        </motion.div>

        {/* LOAD RATING TABLE - DESKTOP */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden overflow-hidden rounded-2xl border border-[#E4E8F0] bg-white shadow-[0_15px_50px_rgba(25,42,80,0.07)] md:block"
        >
          {/* TABLE HEADER */}
          <div className="grid grid-cols-[1.15fr_1.1fr_1.4fr_1.6fr] gap-5 bg-[#203070] px-7 py-5 text-sm font-bold text-white">

            <div>Load Rating</div>
            <div>Storage Type</div>
            <div>What Goes on the Deck</div>
            <div>Suggested Build</div>

          </div>

          {/* TABLE ROWS */}
          {loadRatings.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`grid grid-cols-[1.15fr_1.1fr_1.4fr_1.6fr] items-center gap-5 px-7 py-6 transition-colors hover:bg-[#F8F9FC] ${
                  index !== loadRatings.length - 1
                    ? "border-b border-[#E9EDF3]"
                    : ""
                }`}
              >

                {/* LOAD */}
                <div>
                  <div className=" flex rounded-xl bg-[#F5B817]/15 px-4 py-2">
                    <span className="text-2xl font-extrabold leading-tight text-[#203070]">
                      {item.range}
                    </span>{" "}
                    <span className="mt-1 text-[13px] font-bold text-[#9A7000]">
                      {" "}&nbsp;{item.unit}
                    </span>
                  </div>
                </div>

                {/* STORAGE TYPE */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#203070]/5 text-[#203070]">
                    <Icon size={20} />
                  </div>
                  <span className="text-base font-bold text-[#203070]">
                    {item.title}
                  </span>
                </div>

                {/* DECK USAGE */}
                <p className="text-base leading-6 text-[#697386]">
                  {item.items}
                </p>

                {/* BUILD */}
                <p className="text-base font-semibold leading-6 text-[#203070]">
                  {item.build}
                </p>

              </div>
            );
          })}
        </motion.div>

        {/* MOBILE CARDS */}
        <div className="grid grid-cols-1 gap-4 md:hidden">

          {loadRatings.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-[#E4E8F0] bg-white p-5 shadow-sm"
              >

                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#203070]/5 text-[#203070]">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-[#203070]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#697386]">
                        Load capacity
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-xl bg-[#F5B817]/15 px-3 py-2 text-center">
                    <p className="text-lg font-extrabold text-[#203070]">
                      {item.range}
                    </p>
                    <p className="text-[10px] font-bold text-[#9A7000]">
                      {item.unit}
                    </p>
                  </div>

                </div>

                <div className="mt-5 border-t border-[#E9EDF3] pt-4">

                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#9AA3B2]">
                    What Goes on the Deck
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#697386]">
                    {item.items}
                  </p>

                  <p className="mt-4 text-[11px] font-extrabold uppercase tracking-wider text-[#9AA3B2]">
                    Suggested Build
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-6 text-[#203070]">
                    {item.build}
                  </p>

                </div>

              </motion.div>
            );
          })}

        </div>

        {/* ENGINEERING NOTE */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#203070]/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5B817]/20 text-[#203070]">
            <ClipboardCheck size={25} />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-extrabold text-[#203070]">
              Not Sure Which Load Rating Is Right?
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#697386]">
              Share your inventory details, maximum load and storage
              requirements. Our engineering team will help determine
              the appropriate mezzanine floor specification.
            </p>
          </div>

          <Link
            href="/contact-us"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#203070] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#F5B817] hover:text-[#203070]"
          >
            Consult Our Experts
            <ArrowRight size={17} />
          </Link>

        </div>

        <p className="mt-5 text-center text-xs leading-6 text-[#8992A3]">
          * Load ratings shown are indicative starting points. Final
          specifications depend on site conditions, load distribution,
          structural design and engineering assessment.
        </p>

      </div>
    </section>
  );
}
