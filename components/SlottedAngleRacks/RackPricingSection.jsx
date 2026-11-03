
"use client";

import { motion } from "framer-motion";
import {
  Layers3,
  Ruler,
  MoveVertical,
  SprayCan,
  Boxes,
  Truck,
  MessageCircle,
  FileText,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";



export default function RackPricingSection({city}) {
    const pricingFactors = [
  {
    icon: Layers3,
    title: "Angle Gauge",
    description:
      "2.5 mm (12 gauge) angles cost more than 2.0 mm (14 gauge).",
  },
  {
    icon: Ruler,
    title: "Shelf Gauge & Size",
    description:
      "Thicker and deeper shelves use more steel.",
  },
  {
    icon: MoveVertical,
    title: "Height & Shelves",
    description:
      "Height and number of shelves per bay.",
  },
  {
    icon: SprayCan,
    title: "Finish",
    description:
      "Powder coating, galvanising or paint.",
  },
  {
    icon: Boxes,
    title: "Quantity",
    description:
      "Bays added side by side share uprights, so the cost per bay drops.",
  },
  {
    icon: Truck,
    title: "Delivery & Installation",
    description:
      `Delivery and installation location within ${city}.`,
  },
];
  return (
    <section className="relative overflow-hidden bg-[#F4F6F9] py-6 lg:py-12">

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        {/* MAIN CONTENT */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">

          {/* LEFT CONTENT */}
          <div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-1 w-12 rounded-full bg-[#F5B817]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#203070]">
                Pricing & Quotations
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold leading-[1.12] tracking-tight text-[#172653] sm:text-5xl lg:text-[58px]"
            >
              Slotted Angle Rack
              <span className="block text-[#E0A010]">
                Price in {city} 
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-2xl text-base leading-7 text-[#536078] sm:text-lg"
            >
              We quote a fixed price per bay once we know your
              sizes and loads.
            </motion.p>

            {/* Yellow label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 inline-flex rounded-lg bg-[#F5B817] px-5 py-3"
            >
              <h3 className="text-base font-extrabold text-[#172653] sm:text-lg">
                Six things set that price:
              </h3>
            </motion.div>

            {/* PRICING FACTOR CARDS */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

              {pricingFactors.map((item, index) => {
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
                    whileHover={{ y: -4 }}
                    className="group flex  items-center gap-4 rounded-2xl border border-[#E2E7EF] bg-white p-4 shadow-[0_5px_20px_rgba(23,38,83,0.05)] transition-all duration-300 hover:border-[#F5B817] hover:shadow-lg sm:p-3"
                  >

                    {/* Icon */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FFF2CC] text-[#203070] transition-all duration-300 group-hover:bg-[#F5B817]">
                      <Icon size={27} strokeWidth={1.8} />
                    </div>

                    {/* Yellow divider */}
                    <div className="h-16 w-[3px] shrink-0 rounded-full bg-[#F5B817]" />

                    {/* Text */}
                    <div className="min-w-0">
                      <h4 className="text-base font-extrabold text-[#172653]">
                        {item.title}
                      </h4>

                      <p className="mt-1.5 text-sm leading-5 text-[#59667C]">
                        {item.description}
                      </p>
                    </div>

                  </motion.div>
                );
              })}

            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-[570px] pb-8"
          >

            {/* Yellow background shape */}
            <div className="absolute right-0 top-16 h-[75%] w-[85%] rounded-[45px] bg-[#F5B817]" />

            {/* Image */}
            <div className="relative z-10 h-[480px] overflow-hidden rounded-[30px] border-r-[7px] border-b-[7px] border-[#F5B817] shadow-2xl sm:h-[600px]">
              <img
                src="/end_display_rack_.webp"
                alt="14 ft heavy duty industrial slotted angle rack with six shelves"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#10244D]/75 via-transparent to-transparent" />
            </div>

            {/* 14 FT BADGE */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -left-4 top-12 z-20 max-w-[175px] rounded-2xl border-2 border-[#F5B817] bg-[#203070] px-5 py-5 text-white shadow-xl sm:-left-8 sm:px-6"
            >
              <p className="text-4xl font-extrabold text-[#FFC629] sm:text-5xl">
                14 ft
              </p>

              <p className="mt-2 text-sm font-bold leading-5">
                Industrial Slotted Angle Rack
              </p>

              <div className="mt-4 rounded-lg bg-[#F5B817] px-3 py-2 text-center text-sm font-extrabold text-[#172653]">
                5 Shelves
              </div>
            </motion.div>

            {/* Heavy duty badge */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="absolute -bottom-1 right-0 z-20 flex items-center gap-3 rounded-2xl border-2 border-[#F5B817] bg-white px-5 py-4 shadow-xl sm:-right-5 sm:px-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF2CC] text-[#D69A0A]">
                <Layers3 size={27} />
              </div>

              <div>
                <p className="text-xs font-medium text-[#647087]">
                  Move up to our
                </p>
                <p className="text-lg font-extrabold leading-5 text-[#203070]">
                  Heavy Duty Racks
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>

      

      </div>
    </section>
  );
}
