
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Factory,
  Ruler,
  Weight,
  Settings2,
  Wrench,
  MoveUpRight,
  CheckCircle2,
} from "lucide-react";



const highlights = [
  "Factory-direct manufacturing",
  "Site-specific measurements",
  "Customised steel structures",
  "Installation by our own crew",
];

export default function MezzanineAbout({city}) {
    const benefits = [
  {
    icon: Ruler,
    title: "Site Measurement",
    description:
      "We measure clear height, floor condition and column positions before designing.",
  },
  {
    icon: Weight,
    title: "Load-Based Design",
    description:
      "The platform is designed around the actual weight and type of stored material.",
  },
  {
    icon: Factory,
    title: `${city} Manufacturing`,
    description:
      "Your mezzanine structure is fabricated at our Karawal Nagar factory.",
  },
  {
    icon: Settings2,
    title: "Modular Construction",
    description:
      "Flexible structures that can be expanded, dismantled and reinstalled.",
  },
];
  return (
    <section className="relative overflow-hidden bg-white py-6 sm:py-12 lg:py-12">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative min-h-[380px] overflow-hidden rounded-2xl sm:min-h-[480px] lg:min-h-[570px]">
              <Image
                src="/mezzanine_category.webp"
                alt="Steel mezzanine floor manufactured and installed by Sisco Steel Products"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#172653]/70 via-transparent to-transparent" />

              {/* Image caption */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F5B817] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#172653]">
                  <Factory size={15} />
                  Manufactured in {city}
                </div>

                <h3 className="mt-4 max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Creating More Space.
                  <br />
                  Building Better Workspaces.
                </h3>
              </div>
            </div>

            {/* Experience card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-5 right-4 rounded-xl border border-[#E7EAF0] bg-white p-4 shadow-xl sm:-right-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF5D6] text-[#203070]">
                  <Factory size={25} />
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-[#203070]">
                    Since 2015
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    Steel Manufacturing Experience
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="pt-5 lg:pt-0"
          >
            {/* Section label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[3px] w-10 rounded-full bg-[#F5B817]" />
              <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
                About Sisco Steel Products
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold leading-[1.2] tracking-tight text-[#203070] sm:text-4xl xl:text-[46px]">
              Mezzanine Floor Manufacturer
              <span className="text-[#D99C00]"> in {city}</span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-[15px] leading-7 text-[#626B7A] sm:text-base sm:leading-8">
              Sisco Steel Products designs and builds mezzanine floors at our
              factory in {city}. A
              mezzanine uses the empty height above your floor, so you gain
              usable area without renting more space or adding a storey.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#626B7A] sm:text-base sm:leading-8">
              We start every job by measuring your site: clear height, floor
              condition and where the columns can stand. Then we rate the deck
              for what you will put on it, fabricate in {city}, and install with
              our own crew.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#626B7A] sm:text-base sm:leading-8">
              Our mezzanines are modular. When your layout changes or you move
              premises, we can dismantle the structure and put it up again at
              the new site.
            </p>

            {/* Highlights */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-[#D99C00]"
                  />
                  <span className="text-sm font-semibold text-[#26334D]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Process cards */}
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {benefits.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-xl border border-[#E8EBF1] bg-[#F8F9FB] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B817] hover:bg-white hover:shadow-md sm:p-4"
                  >
                    <Icon className="mb-3 h-6 w-6 text-[#203070]" />

                    <h3 className="text-xs font-extrabold leading-5 text-[#203070] sm:text-sm">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-gray-500">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          

          </motion.div>
        </div>
      </div>
    </section>
  );
}
