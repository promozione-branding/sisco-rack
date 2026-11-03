
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Factory,
  LayoutGrid,
  Layers3,
  Truck,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Factory,
    title: "In-house",
    subtitle: "Manufacturing",
  },
  {
    icon: LayoutGrid,
    title: "Store Layout",
    subtitle: "Planning",
  },
  {
    icon: Layers3,
    title: "Wall, Centre",
    subtitle: "& Corner Racks",
  },
  {
    icon: Truck,
    title: "Supply &",
    subtitle: "Installation",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

export default function SupermarketAbout({city}) {
  return (
    <section className="overflow-hidden bg-white py-6 sm:py-12">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">

          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {/* LABEL */}
            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[4px] w-11 rounded-full bg-[#F5B817]" />
              <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
                About Sisco Steel Products
              </span>
            </motion.div>

            {/* HEADING */}
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-extrabold leading-[1.15] tracking-tight text-[#203070] sm:text-4xl xl:text-[48px]"
            >
              Supermarket Rack Manufacturer{" "}
              <span className="relative inline-block">
                <span className="relative z-10">in {city}</span>
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-sm bg-[#F5B817]/70" />
              </span>
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              className="mt-7 text-[15px] leading-7 text-[#626B7A] sm:text-base sm:leading-8"
            >
              Sisco Steel Products makes supermarket and display racks at our
              factory in {city}. From a
              200 sq ft kirana shop to a multi-aisle supermarket, we plan the
              layout, make the racks and fit them in your store.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[15px] leading-5 text-[#626B7A] sm:text-base sm:leading-6"
            >
              Tell us your store size and what you sell. We suggest how many
              wall, centre and corner racks fit, where the aisles go, and which
              shelf loads suit your stock.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[15px] leading-7 text-[#626B7A] sm:text-base sm:leading-8"
            >
              We supply a few units for a kirana shop as readily as a full
              store fit-out.
            </motion.p>

            {/* OPTIONAL NO MOQ NOTE - ENABLE AFTER CONFIRMATION */}
            {/*
            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-center gap-3 rounded-xl bg-[#FFF4CF] px-5 py-4"
            >
              <CheckCircle2 className="h-6 w-6 shrink-0 text-[#203070]" />
              <span className="text-sm font-extrabold text-[#203070]">
                No Minimum Order Quantity
              </span>
            </motion.div>
            */}

            {/* FEATURE HIGHLIGHTS */}
            <motion.div
              variants={fadeUp}
              className="mt-9 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-[#DDE2EA]"
            >
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center px-2 text-center first:pl-0 last:pr-0 sm:px-3"
                  >
                    <Icon
                      size={32}
                      strokeWidth={1.8}
                      className="mb-3 text-[#203070] transition-transform duration-300 hover:-translate-y-1"
                    />

                    <h3 className="text-xs font-extrabold leading-5 text-[#203070] sm:text-sm">
                      {item.title}
                      <span className="block">{item.subtitle}</span>
                    </h3>
                  </div>
                );
              })}
            </motion.div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Yellow decorative shape */}
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-br-[35px] rounded-tr-[35px] bg-[#F5B817] sm:-bottom-5 sm:-right-5" />

            {/* IMAGE CONTAINER */}
            <div className="relative h-[350px] overflow-hidden rounded-2xl sm:h-[470px] lg:h-[570px]">
              <Image
                src="/supermarket_rack_.webp"
                alt="Supermarket display racks manufactured by Sisco Steel Products"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#172653]/35 via-transparent to-transparent" />

              {/* Image caption */}
              <div className="absolute bottom-5 left-5 rounded-xl border border-white/30 bg-[#172653]/90 px-5 py-4 text-white shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#F5B817]">
                  Sisco Steel Products
                </p>
                <h3 className="mt-1 text-lg font-extrabold sm:text-xl">
                  Supermarket Display Racks
                </h3>
                <p className="mt-1 text-xs text-white/80">
                  Designed for your store space
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
