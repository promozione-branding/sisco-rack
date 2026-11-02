
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Ruler,
  Layers3,
  Footprints,
  ClipboardCheck,
  ArrowDownUp,
  Building2,
} from "lucide-react";

const checks = [
  {
    number: "01",
    title: "Clear Height",
    description:
      "Measure from floor to the lowest beam, duct or light. You need standing headroom both under and over the deck.",
    note: "Minimum clear height to be confirmed by SISCO.",
    icon: Ruler,
  },
  {
    number: "02",
    title: "Floor Condition",
    description:
      "Columns sit on base plates bolted to your floor. A sound concrete floor usually needs no new foundation; a cracked or weak floor may need footings.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Column and Stair Positions",
    description:
      "Columns must clear doors, racks and forklift paths, and the staircase needs its own footprint.",
    icon: Footprints,
  },
  {
    number: "04",
    title: "Building Approval",
    description:
      "Check with your building owner or architect whether your premises need permission for a mezzanine. We share the layout drawing and load rating for that discussion.",
    icon: ClipboardCheck,
  },
];

function CheckCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
      }}
      className="group relative flex gap-4 overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white p-5 shadow-[0_8px_25px_rgba(25,42,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(25,42,80,0.12)] sm:p-6"
    >
      {/* NUMBER */}
      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5B817] text-lg font-black text-[#203070]">
        {item.number}
      </div>

      {/* ICON */}
      <div className="mt-12 flex w-[90px] shrink-0 items-center justify-center border-r border-[#DCE2EB] pr-4 text-[#203070] sm:w-[110px]">
        <Icon
          size={48}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="min-w-0 flex-1 pt-1">
        <h3 className="text-lg font-extrabold leading-tight text-[#203070] sm:text-xl">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#4B5870]">
          {item.description}
        </p>

        {item.note && (
          <div className="mt-3 rounded-lg bg-[#FFF3C9] px-3 py-2">
            <p className="text-xs font-bold leading-5 text-[#203070]">
              {item.note}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MezzanineSiteChecks() {
  return (
    <section className="relative overflow-hidden bg-[#F3F5F9] py-6 sm:py-12">

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#F5B817]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#203070]/20 bg-white px-5 py-2">
            <ClipboardCheck size={18} className="text-[#203070]" />
            <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
              Site Readiness Guide
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight text-[#203070] sm:text-4xl lg:text-5xl">
            Before You Order:{" "}
            <span className="text-[#D99C00]">
              Four Site Checks
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#526078] sm:text-base">
            These four checks decide whether a mezzanine fits and what it
            will cost. We do all of them on the free site visit.
          </p>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[0.95fr_1.55fr]">

          {/* LEFT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[400px] overflow-hidden rounded-[24px] bg-[#203070] sm:min-h-[520px] lg:min-h-full"
          >
            <Image
              src="/mezzanine_diff.webp"
              alt="Industrial steel mezzanine floor installation"
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081B2E]/80 via-transparent to-[#081B2E]/10" />

            {/* HEIGHT MEASUREMENTS */}
            <div className="absolute left-[52%] top-[10%] flex h-[34%] -translate-x-1/2 flex-col items-center justify-center">

              <div className="h-1 w-12 bg-white" />

              <div className="my-1 flex flex-1 items-center">
                <ArrowDownUp
                  size={30}
                  className="text-white drop-shadow-lg"
                  strokeWidth={2.5}
                />
              </div>

              <div className="h-1 w-12 bg-white" />

              <div className="absolute left-10 top-1/2 w-32 -translate-y-1/2 rounded-lg border border-[#F5B817] bg-white px-3 py-2 shadow-lg">
                <p className="text-center text-xs font-extrabold text-[#203070]">
                  Clear Height
                </p>
                <p className="text-center text-[11px] font-semibold text-[#526078]">
                  Above Deck
                </p>
              </div>
            </div>

            <div className="absolute bottom-[14%] left-[55%] flex h-[30%] -translate-x-1/2 flex-col items-center justify-center">

              <div className="h-1 w-12 bg-white" />

              <div className="my-1 flex flex-1 items-center">
                <ArrowDownUp
                  size={30}
                  className="text-white drop-shadow-lg"
                  strokeWidth={2.5}
                />
              </div>

              <div className="h-1 w-12 bg-white" />

              <div className="absolute left-10 top-1/2 w-32 -translate-y-1/2 rounded-lg border border-[#F5B817] bg-white px-3 py-2 shadow-lg">
                <p className="text-center text-xs font-extrabold text-[#203070]">
                  Clear Height
                </p>
                <p className="text-center text-[11px] font-semibold text-[#526078]">
                  Under Deck
                </p>
              </div>
            </div>

            {/* BOTTOM IMAGE CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F5B817] px-4 py-2 text-xs font-extrabold text-[#203070]">
                <Building2 size={16} />
                Industrial Mezzanine Planning
              </div>

              <h3 className="mt-4 max-w-sm text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Plan Your Space.
                <br />
                Build With Confidence.
              </h3>
            </div>
          </motion.div>

          {/* RIGHT CHECK CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {checks.map((item, index) => (
              <CheckCard
                key={item.number}
                item={item}
                index={index}
              />
            ))}
          </div>

        </div>

        {/* BOTTOM NOTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#203070]/10 bg-white p-5 sm:flex-row sm:px-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF3C9] text-[#203070]">
              <ClipboardCheck size={23} />
            </div>

            <div>
              <h3 className="font-extrabold text-[#203070]">
                Get Your Free Site Assessment
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#697386] sm:text-sm">
                Let our team evaluate your warehouse before installation.
              </p>
            </div>
          </div>

          <a
            href="/contact-us"
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#203070] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#F5B817] hover:text-[#203070] sm:w-auto"
          >
            Contact Us
          </a>
        </motion.div>

      </div>
    </section>
  );
}
