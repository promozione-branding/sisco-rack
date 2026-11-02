
"use client";

import { motion } from "framer-motion";
import {
  Warehouse,
  Store,
  CarFront,
  Zap,
  Factory,
  HeartPulse,
  Building2,
  Snowflake,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import QuoteModal from "../QuoteModal";
import { useState } from "react";

const industries = [
  {
    icon: Warehouse,
    title: "Warehouses & E-commerce Fulfilment",
    description:
      "For carton storage, order picking and organised pick-face storage.",
    number: "01",
  },
  {
    icon: Store,
    title: "Wholesale Traders",
    description:
      "For godown inventory, packaged products and everyday shop stock.",
    number: "02",
  },
  {
    icon: CarFront,
    title: "Auto Parts & Hardware Traders",
    description:
      "For organised storage of auto parts, hardware and industrial items.",
    number: "03",
  },
  {
    icon: Zap,
    title: "Electrical & Medicine Distributors",
    description:
      "For electrical goods, medicine cartons and distribution inventory.",
    number: "04",
  },
  {
    icon: Factory,
    title: "Factories & Industrial Units",
    description:
      "For raw materials, machine components, tools and spare parts.",
    number: "05",
  },
  {
    icon: HeartPulse,
    title: "Pharma, Hospitals & Clinics",
    description:
      "For medicine stock, medical supplies and consumables storage.",
    number: "06",
  },
  {
    icon: Building2,
    title: "Offices, Schools & Banks",
    description:
      "For files, documents, stationery and long-term record rooms.",
    number: "07",
  },
  {
    icon: Snowflake,
    title: "Cold Storage & Food Processing",
    description:
      "Galvanised rack finishes for storage environments exposed to damp conditions.",
    number: "08",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function IndustryApplications({city}) {
  const [productquote, setProductquote] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#F4F6F9] py-6 lg:py-12">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#203070]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-1 w-12 rounded-full bg-[#F5B817]" />

              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#203070]">
                Industry Applications
              </span>
            </div>

            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-[#172653] sm:text-4xl lg:text-[52px]">
              Who Uses Our
              <span className="block text-[#D69A0A]">
                Slotted Angle Racks?
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#657083] sm:text-lg">
              From busy wholesale markets to large industrial
              warehouses, our slotted angle racks support
              organised storage across different industries
              throughout {city}.
            </p>
          </div>

          {/* Location indicator */}
          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-[#E0A010]/30 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF2CC] text-[#203070]">
              <MapPin size={23} />
            </div>

            <div>
              <p className="text-sm font-extrabold text-[#203070]">
                Serving {city}
              </p>
              <p className="mt-1 text-xs text-[#657083]">
                Multiple industries & locations
              </p>
            </div>
          </div>
        </motion.div>

        {/* INDUSTRY CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <motion.article
                key={industry.number}
                variants={cardVariants}
                whileHover={{ y: -7 }}
                className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-2xl border border-[#E0E5ED] bg-white p-6 shadow-[0_6px_25px_rgba(23,38,83,0.045)] transition-all duration-300 hover:border-[#E0A010] hover:shadow-[0_15px_35px_rgba(23,38,83,0.10)]"
              >

                {/* Top number and icon */}
                <div className="flex items-center justify-between">

                  <div className="flex h-[58px] w-[58px] items-center justify-center rounded-xl bg-[#FFF2CC] text-[#203070] transition-all duration-300 group-hover:bg-[#F5B817] group-hover:text-[#172653]">
                    <Icon size={29} strokeWidth={1.8} />
                  </div>

                  <span className="text-3xl font-extrabold text-[#E9EDF3] transition-colors group-hover:text-[#F5B817]/50">
                    {industry.number}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="mt-6 text-lg font-extrabold leading-6 text-[#172653] transition-colors group-hover:text-[#B27D00]">
                  {industry.title}
                </h3>

                {/* Locations */}
              

                {/* Divider */}
                <div className="my-4 h-px w-full bg-[#E6EAF0] transition-colors group-hover:bg-[#E0A010]/50" />

                {/* Description */}
                <p className="text-sm leading-6 text-[#657083]">
                  {industry.description}
                </p>

                {/* Bottom decorative line */}
                <div className="absolute bottom-0 left-0 h-[4px] w-0 bg-[#F5B817] transition-all duration-500 group-hover:w-full" />

              </motion.article>
            );
          })}
        </motion.div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#203070] px-7 py-8 text-white shadow-xl sm:px-10 lg:flex-row"
        >
          <div>
            <h3 className="text-xl font-extrabold sm:text-2xl">
              Need Racks for Your Industry?
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
              Tell us what you store, your available space
              and shelf load. We will help you choose the
              right slotted angle rack.
            </p>
          </div>

          <button
            onClick={() => setProductquote(true)}
            className="inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#F5B817] px-6 py-4 text-sm font-extrabold text-[#172653] transition-all hover:-translate-y-1 hover:bg-[#FFD04A]"
          >
            Discuss Your Requirement
            <ArrowUpRight size={19} />
          </button>
        </motion.div>

        <QuoteModal open={productquote} onClose={() => setProductquote(false)} />


      </div>
    </section>
  );
}
