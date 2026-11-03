
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Ruler,
  Layers3,
  Weight,
  Settings2,
  ArrowRight,
  MessageSquareQuote,
} from "lucide-react";
import QuoteModal from "../QuoteModal";
import { useState } from "react";

const products = [
  {
    name: "Mild Steel Mezzanine Floor",
    image: "/mezzanine_diff.webp",
    height: "12 Feet (3000 mm)",
    levels: "Single Level",
    load: "500 kg/m²",
    structure: "Mild Steel",
    link: "/products/mild-steel-mezzanine-floor",
  },
  {
    name: "Mezzanine Floor",
    image: "/4k_floor.webp",
    height: "Up to 2400 mm",
    levels: "Multi Level",
    load: "500 kg/m²",
    structure: "Mild Steel",
    link: "/products/mezzanine-floor",
  },
  {
    name: "Modular Mezzanine Floor",
    image: "/modular_mezzanine_floor.webp",
    height: "20 Feet",
    levels: "Multi-Level",
    load: "750 kg/m²",
    structure: "Rack Supported",
    link: "/products/modular-mezzanine-floor",
  },
  {
    name: "Metal Mezzanine Floor",
    image:  "/metal_mezzanine_floor_raw_u.webp",
    height: "3000 mm",
    levels: "2 Levels",
    load: "500 kg/level",
    structure: "Metal Deck",
    link: "/products/double-decker-mezzanine",
  },
  {
    name: "Slotted Angle Mezzanine",
    image: "/metal_mezzanine_floor_raw_u.webp",
    height: "15 Feet",
    levels: "Single Level",
    load: "500 kg/m²",
    structure: "Bolted Angle Frame",
    link: "/products/slotted-angle-mezzanine",
  },
  {
    name: "Slotted Angle Rack for Warehouse",
    image: "/slotted_angle_warehouse_racks.webp",
    height: "10 Feet",
    levels: "4 Levels",
    load: "500 kg",
    structure: "Angle Frame",
    link: "/products/slotted-angle-rack-for-warehouse",
  },
  {
    name: "Steel Mezzanine Floor",
    image: "/mezzanine_diff.webp",
    height: "As per requirement",
    levels: "Single Level",
    load: "800 kg",
    structure: "Colour-Coated MS",
    link: "/products/steel-mezzanine-floor",
  },
];

function ProductSpec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2 text-[12px] leading-5 sm:text-[13px]">
      <Icon
        size={15}
        strokeWidth={1.8}
        className="mt-[2px] shrink-0 text-[#203070]"
      />

      <span className="shrink-0 text-[#697386]">
        {label}:
      </span>

      <span className="font-semibold text-[#203070]">
        {value}
      </span>
    </div>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.08,
      }}
      className="group flex min-w-0 flex-col rounded-[15px] border border-[#E9EDF3] bg-white p-4 shadow-[0_5px_20px_rgba(25,42,80,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(25,42,80,0.10)]"
    >
      {/* IMAGE + DETAILS */}
      <div className="flex flex-1 items-start gap-3">

        {/* PRODUCT IMAGE */}
        <div className="relative h-[145px] w-[36%] shrink-0 overflow-hidden rounded-xl bg-[#F1F4F8] p-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 36vw, 160px"
            className="object-cover p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="flex min-w-0 flex-1 flex-col">

          <p className="line-clamp-2 text-[16px] font-extrabold leading-[1.45] text-[#172653] sm:text-[15px]">
            {product.name}
          </p>

          {product.dimension && (
            <p className="mt-1 text-[12px] font-semibold text-[#D18B00]">
              {product.dimension}
            </p>
          )}

          <div className="mt-4 space-y-2">
            <ProductSpec
              icon={Ruler}
              label="Height"
              value={product.height}
            />

            <ProductSpec
              icon={Layers3}
              label="Levels"
              value={product.levels}
            />

            <ProductSpec
              icon={Weight}
              label="Load"
              value={product.load}
            />

            <ProductSpec
              icon={Settings2}
              label="Structure"
              value={product.structure}
            />
          </div>
        </div>
      </div>

      {/* VIEW PRODUCT BUTTON */}
      <div className="mt-5 flex justify-end">
        <Link
          href={product.link}
          className="inline-flex min-h-[42px] items-center justify-center gap-3 rounded-lg bg-[#F5B817] px-5 py-2.5 text-[12px] font-extrabold text-[#172653] transition-all duration-300 hover:bg-[#203070] hover:text-white sm:text-[13px]"
        >
          View Product
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}

/* 8TH CARD - OTHER PRODUCT QUOTE */
function OtherProductCard() {
    const [productquote, setProductquote] = useState(false)  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-[225px] flex-col items-center justify-center overflow-hidden rounded-[15px] border border-[#203070]/10 bg-[#203070] p-6 text-center shadow-[0_5px_20px_rgba(25,42,80,0.08)]"
    >
      {/* DECORATIVE CIRCLES */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[25px] border-white/5" />

      <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full border-[25px] border-white/5" />

      {/* ICON */}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5B817] text-[#203070]">
        <MessageSquareQuote size={28} />
      </div>

      {/* CONTENT */}
      <h3 className="relative z-10 mt-5 text-xl font-extrabold text-white">
        Looking for Other Products?
      </h3>

      <p className="relative z-10 mt-3 max-w-[260px] text-sm leading-5 text-white/75">
        Tell us your warehouse storage requirements. Our team will help you.
       
      </p>

      {/* CTA BUTTON */}
      <button
        onClick={() => setProductquote(true)}
       
        className="group relative z-10 mt-6 inline-flex min-h-[44px] items-center justify-center gap-3 rounded-lg bg-[#F5B817] px-5 py-3 text-[13px] font-extrabold text-[#172653] transition-all duration-300 hover:bg-white"
      >
        Get Other Product Quote

        <ArrowRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      <QuoteModal open={productquote} onClose={() => setProductquote(false)} />
      
    </motion.div>
  );
}

export default function MezzanineProductCards() {
  return (
    <section className="bg-[#F1F3F7] py-6 sm:py-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="mb-10 text-center">
          <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
            Our Product Range
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#203070] sm:text-6xl">
            Mezzanine Floor{" "}
            <span className="text-[#D99C00]">
              Products
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-5 text-[#697386]">
            Explore our range of industrial mezzanine floor systems,
            designed for different storage requirements and working spaces.
          </p>
        </div>

        {/* 7 PRODUCTS + 1 QUOTE CARD */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              index={index}
            />
          ))}

          {/* 8TH CARD */}
          <OtherProductCard />

        </div>
      </div>
    </section>
  );
}
