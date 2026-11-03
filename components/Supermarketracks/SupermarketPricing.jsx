
"use client";

import { motion } from "framer-motion";
import {
  Ruler,
  Weight,
  Layers3,
  Paintbrush,
  Settings2,
  Boxes,
  Truck,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";



const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

export default function SupermarketPricing({city}) {
    const pricingFactors = [
  {
    number: "01",
    icon: Ruler,
    title: "Height and Shelf Count",
    description:
      "An 8 ft, 7-shelf bay uses more steel than a 5 ft, 4-shelf bay.",
  },
  {
    number: "02",
    icon: Weight,
    title: "Load per Shelf",
    description:
      "250 kg departmental racks need heavier sections than 50 kg snack racks.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Placement",
    description:
      "Double-sided centre racks cost more than single-sided wall racks.",
  },
  {
    number: "04",
    icon: Paintbrush,
    title: "Finish",
    description:
      "Choose powder coating, colour coating or a wooden finish.",
  },
  {
    number: "05",
    icon: Settings2,
    title: "Fittings",
    description:
      "Back sheets, branding panels, PVC stoppers and price-tag strips.",
  },
  {
    number: "06",
    icon: Boxes,
    title: "Quantity",
    description:
      "Larger store fit-outs generally cost less per bay.",
  },
  {
    number: "07",
    icon: Truck,
    title: "Installation & Delivery",
    description:
      `Delivery and installation arrangements within ${city}.`,
  },
];
  return (
    <section className="relative overflow-hidden bg-[#F4F6F9] py-6 sm:py-12">

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* SECTION HEADER */}
        <div className="mb-12 max-w-3xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-1 w-11 rounded-full bg-[#F5B817]" />

            <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
              Transparent Pricing
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold leading-tight tracking-tight text-[#203070] sm:text-4xl lg:text-[48px]"
          >
            Supermarket Rack Price{" "}
            <span className="text-[#D99C00]">in {city}</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base leading-7 text-[#606B7C] sm:text-lg"
          >
            We quote per bay, with a fixed total for your whole layout.
            Seven things set the price.
          </motion.p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:gap-10">

          {/* PRICING FACTORS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {pricingFactors.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 2) * 0.1,
                  }}
                  className={`group relative overflow-hidden rounded-2xl border border-[#E5E9F0] bg-white p-5 shadow-[0_5px_20px_rgba(23,38,83,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B817] hover:shadow-lg sm:p-6 ${
                    index === 6 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">

                    {/* ICON */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FFF4D3] text-[#203070] transition-all duration-300 group-hover:bg-[#F5B817]">
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-base font-extrabold leading-6 text-[#203070] sm:text-lg">
                          {item.title}
                        </p>

                        <span className="text-xs font-extrabold text-[#D99C00]">
                          {item.number}
                        </span>
                      </div>

                      <p className="text-sm leading-6 text-[#697386]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#F5B817] transition-all duration-500 group-hover:w-full" />
                </motion.article>
              );
            })}
          </div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative lg:sticky lg:top-24"
          >
            <div className="relative min-h-[350px] overflow-hidden rounded-2xl sm:min-h-[480px] lg:min-h-[560px]">

              {/* Replace with your supermarket image */}
              <img
                src="/store_display_racks.webp"
                alt="Supermarket display racks with stocked shelves"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#172653]/90 via-[#172653]/10 to-transparent" />

              {/* IMAGE CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                <span className="inline-block rounded-full bg-[#F5B817] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#172653]">
                  Sisco Steel Products
                </span>

                <h3 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  Racks Planned Around Your Store
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                  From a small kirana shop to a complete supermarket,
                  get a rack plan based on your space and stock.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* WHATSAPP CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#172653] p-6 sm:p-8 lg:flex-row lg:items-center lg:px-10"
        >

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#F5B817]">
              <MessageCircle size={32} />
            </div>

            <div>
              <h3 className="text-lg font-extrabold leading-7 text-white sm:text-xl">
                Send Your Shop Details on WhatsApp
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                Send your shop size, a photo and what you sell.
                You get a rack plan and a fixed quote within one working day.
              </p>
            </div>

          </div>

          <a
            href="https://wa.me/917629827285?text=Hello%2C%20I%20want%20a%20supermarket%20rack%20plan%20and%20price%20quote.%20I%20will%20share%20my%20shop%20size%20and%20photos."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[54px] w-full shrink-0 items-center justify-center gap-3 rounded-full bg-[#F5B817] px-6 py-4 text-sm font-extrabold text-[#172653] transition-all duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto"
          >
            <MessageCircle size={20} />
            WhatsApp +91 76298 27285
            <ArrowUpRight size={18} />
          </a>

        </motion.div>

      </div>
    </section>
  );
}
