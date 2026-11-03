
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Warehouse,
  Layers3,
  ShoppingCart,
} from "lucide-react";

const supplyCategories = [
  {
    number: "01",
    title: "Slotted Angle Racks",
    description:
      "Strong, adjustable and space-efficient storage solutions for warehouses, factories, offices and commercial spaces.",
    image: "/slotted_angle_mezzanine_black_.webp",
    link: "/delhi/slotted-angle-racks",
    icon: Warehouse,
  },
  {
    number: "02",
    title: "Mezzanine Floors",
    description:
      "Maximise your vertical space with custom-designed steel mezzanine floors for industrial and commercial applications.",
    image: "/mezzanine_category.webp",
    link: "/delhi/mezzanine-floors",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Supermarket Racks",
    description:
      "Modern retail display and storage racks designed to organise products and improve your store layout.",
    image: "/supermarket_storage_.webp",
    link: "/delhi/supermarket-racks",
    icon: ShoppingCart,
  },
];

export default function SupplyNetwork() {
  return (
    <section className="relative overflow-hidden bg-[#F4F6F9] py-6 sm:py-12">

      {/* Decorative Shapes */}
      <div className="absolute -right-24 -top-28 h-64 w-64 rotate-45 rounded-[60px] bg-[#F5B817]/90" />
      <div className="absolute -bottom-28 -left-24 h-64 w-64 rotate-45 rounded-[60px] bg-[#F5B817]/90" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="mb-10 lg:mb-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-2 w-12 rounded-full bg-[#F5B817]" />
            <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#172653]">
              Our Supply Network
            </span>
          </div>

          <h2 className="max-w-5xl text-3xl font-extrabold leading-[1.1] tracking-tight text-[#172653] sm:text-4xl md:text-5xl lg:text-[60px]">
            Complete Steel Storage{" "}
            <span className="relative inline-block text-[#F2B600]">
              Solutions
              <span className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-2 rounded-full bg-[#F2B600]" />
            </span>
          </h2>

          <p className="mt-6 max-w-5xl text-base leading-7 text-gray-700 sm:text-lg">
            From smart storage systems to advanced retail and industrial
            infrastructure, explore our range of steel solutions.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">

          {supplyCategories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_12px_35px_rgba(23,38,83,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(23,38,83,0.16)]"
              >

                {/* Image */}
                <div className="relative h-[250px] overflow-hidden sm:h-[280px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172653]/20 via-transparent to-transparent" />

                  {/* Number */}
                  <div className="absolute left-6 top-5 flex h-14 min-w-14 items-center justify-center rounded-2xl bg-[#F5B817] px-3 text-xl font-extrabold text-[#172653] shadow-lg">
                    {item.number}
                  </div>

                  {/* Bottom Yellow Curve */}
                  <div className="absolute -bottom-12 -left-10 h-20 w-64 -rotate-6 rounded-full bg-[#F5B817]" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">

                  {/* Icon + Title */}
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F1F4F9] text-[#172653] transition-colors duration-300 group-hover:bg-[#F5B817]">
                      <Icon size={34} strokeWidth={1.8} />
                    </div>

                    <div className="h-14 w-[2px] shrink-0 bg-[#F5B817]" />

                    <h3 className="text-xl font-extrabold leading-tight text-[#172653] sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>

              

                  {/* CTA */}
                  <Link
                    href={item.link}
                    className="inline-flex w-fit items-center justify-center gap-4 rounded-full bg-[#F5B817] px-7 py-4 text-sm font-extrabold text-[#172653] transition-all duration-300 hover:bg-[#172653] hover:text-white sm:text-base"
                  >
                    Explore Solutions
                    <ArrowRight
                      size={21}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
