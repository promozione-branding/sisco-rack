
"use client";

import { motion } from "framer-motion";
import {
  Factory,
  MapPin,
  BadgeCheck,
  Truck,
  Settings2,
  CalendarDays,
  Layers3,
  ShieldCheck,
} from "lucide-react";




const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ManufacturerSection({city}) {
  const benefits = [
  {
    icon: Factory,
    title: "Direct Manufacturer",
    desc: `Buy directly from our own ${city} manufacturing facility.`,
  },
  {
    icon: Settings2,
    title: "Flexible Design",
    desc: `Adjust shelves, expand bays and dismantle when required in ${city}.`,
  },
  {
    icon: Truck,
    title: "Local Delivery",
    desc: `Delivery and installation across ${city}.`,
  },
];



const statistics = [
  {
    icon: CalendarDays,
    number: "2015",
    label: "Year Established",
  },
  {
    icon: Layers3,
    number: "5,000+",
    label: "Racks Supplied",
  },
  {
    icon: MapPin,
    number: `{city} `,
    label: "Local Delivery",
  },
  {
    icon: ShieldCheck,
    number: "100%",
    label: "Direct Manufacturing",
  },
];
  return (
    <section className="relative overflow-hidden bg-[#F4F6F9] py-6 lg:py-14">

      {/* Background decoration */}
      <div className="absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-[#203070]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">

          {/* LEFT IMAGE AREA */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative pb-7 pr-2 sm:pr-5"
          >

            {/* Yellow decorative frame */}
            <div className="absolute -left-3 -top-3 z-0 h-32 w-32 rounded-tl-[35px] border-l-[7px] border-t-[7px] border-[#F5B817]" />

            {/* Main image */}
            <div className="relative z-10 overflow-hidden rounded-[22px] shadow-2xl shadow-[#203070]/15">

              <img
                src="/cold_mezzanine_storage.webp"
                alt={`Slotted angle rack manufacturing factory  ${city}`}
                className="h-[390px] w-full object-cover sm:h-[470px] lg:h-[530px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#172653]/90 via-transparent to-transparent" />

              {/* Location */}
              <div className="absolute bottom-7 left-6 flex items-center gap-3 sm:left-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5B817] text-[#172653]">
                  <MapPin size={25} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">
                    {city} 
                  </h3>
                 
                </div>
              </div>
            </div>

            {/* Floating experience card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -bottom-1 right-0 z-20 flex items-center gap-3 rounded-2xl border-[5px] border-[#F4F6F9] bg-[#203070] px-4 py-4 text-white shadow-xl sm:right-0 sm:gap-4 sm:px-6 sm:py-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5B817] text-[#203070] sm:h-16 sm:w-16">
                <Factory size={30} />
              </div>

              <div>
                <p className="text-xs font-semibold text-white/80">
                  Manufacturing Since
                </p>
                <p className="text-3xl font-extrabold leading-tight text-[#FFC629] sm:text-4xl">
                  2015
                </p>
                <p className="text-xs font-semibold text-white sm:text-sm">
                  Trusted Experience
                </p>
              </div>
            </motion.div>

            {/* Bottom yellow line */}
            <div className="absolute bottom-0 left-5 right-20 h-[5px] rounded-full bg-[#F5B817]" />

          </motion.div>

          {/* RIGHT CONTENT AREA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.13,
                },
              },
            }}
            className="pt-4 lg:pt-0"
          >

            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-[4px] w-10 rounded-full bg-[#E0A010]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#203070]">
                About Sisco Steel Products
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-extrabold leading-[1.15] tracking-tight text-[#172653] sm:text-4xl lg:text-[46px]"
            >
              Slotted Angle Rack Manufacturer
              <span className="mt-1 block text-[#D69A0A]">
                in {city}  Since 2015
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              variants={fadeUp}
              className="mt-7 space-y-5 text-[15px] leading-[1.8] text-[#505B6C] sm:text-base"
            >
              <p>
                <strong className="font-bold text-[#203070]">
                  Sisco Steel Products
                </strong>{" "}
                makes slotted angle racks at our factory and showroom
                in {city}.
                We started in 2015 as a two-person welding bay.
                Since then we have supplied more than{" "}
                <strong className="font-bold text-[#203070]">
                  5,000 racks
                </strong>{" "}
                to warehouses, workshops, shops and offices.
              </p>

              <p>
                Buying from a {city} manufacturer means you deal
                directly with the people who make your racks.
                You can visit the showroom, check the angle
                thickness in your hand, and get delivery without
                long-distance freight or a dealer's margin.
              </p>

              <p>
                Every slotted angle rack we supply in {city} is
                bolted together on site. You can move shelves
                up or down later, add bays as stock grows, and
                dismantle the whole rack when you shift premises.
              </p>
            </motion.div>

            {/* Benefit Cards */}
            <motion.div
              variants={fadeUp}
              className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {benefits.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group rounded-2xl border border-[#E1E6EF] bg-white p-5 shadow-[0_8px_25px_rgba(23,38,83,0.05)] transition-all duration-300 hover:border-[#E0A010] hover:shadow-xl"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#203070] text-[#FFC629] transition-all duration-300 group-hover:bg-[#F5B817] group-hover:text-[#172653]">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-sm font-extrabold text-[#203070] sm:text-base">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-[#657083] sm:text-sm">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

          </motion.div>
        </div>

        {/* BOTTOM STATISTICS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 overflow-hidden rounded-2xl bg-[#203070] shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">

            {statistics.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`flex items-center justify-center gap-3 px-4 py-7 sm:gap-5 sm:py-9 ${
                    index % 2 !== 0 ? "border-l border-white/15" : ""
                  } ${
                    index >= 2 ? "border-t border-white/15 md:border-t-0" : ""
                  } ${
                    index !== 0 && index !== 2
                      ? "md:border-l"
                      : "md:border-l-0"
                  }`}
                >
                  <Icon
                    size={34}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#FFC629] sm:h-10 sm:w-10"
                  />

                  <div>
                    <p className="text-xl font-extrabold text-white sm:text-3xl">
                      {item.number}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-white/75 sm:text-sm">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </motion.div>

      </div>
    </section>
  );
}
