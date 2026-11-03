
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Ruler,
  Layers3,
  Weight,
  CheckCircle2,
} from "lucide-react";

const products = [
  {
    name: "Wall Mounted Display Rack",
    image: "/wall_mounted_display_rack.webp",
    placement: "Wall",
    height: "8 ft",
    shelves: "7",
    load: "100 kg",
    bestFor: "Grocery and FMCG walls",
    slug: "/products/wall-mounted-display-rack",
  },
  {
    name: "Departmental Store Rack",
    image: "/departmental_racks.webp",
    placement: "Wall",
    height: "7 ft",
    shelves: "6",
    load: "250 kg",
    bestFor: "Heavy packs: atta, oil, rice",
    slug: "/products/departmental-store-rack",
  },
  {
    name: "Personal Care Display Racks",
    image:"/personal_care_display_rack.webp",
    placement: "Wall",
    height: "8 ft",
    shelves: "7",
    load: "250 kg",
    bestFor: "Toiletries and cosmetics",
    slug: "/products/personal-care-display-racks",
  },
  {
    name: "Wall Mounted Supermarket Wall Racks",
    image: "/wall_mounted_supermarket.webp",
    placement: "Wall",
    height: "5–8 ft",
    shelves: "5",
    load: "Up to 50 kg",
    bestFor: "Snacks and light goods",
    slug: "/products/wall-mounted-supermarket-wall-racks",
  },
  {
    name: "Double Sided Display Rack",
    image: "/double_sided_racks.webp",
    placement: "Centre aisle",
    height: "6 ft",
    shelves: "On request",
    load: "50–100 kg",
    bestFor: "Grocery aisles, with branding space",
    slug: "/products/double-sided-display-rack"
  },
  {
    name: "Hypermarket Display Rack",
    image: "/hypermarket_display_raw.webp",
    placement: "Centre, freestanding",
    height: "8 ft, 1,200 mm bay",
    shelves: "5",
    load: "80 kg",
    bestFor: "Large-format stores",
    slug: "/products/hypermarket-display-rack",
  },
  {
    name: "Wooden Center Rack",
    image:  "/wooden_storage_racks.webp",
    placement: "Centre",
    height: "On request",
    shelves: "8",
    load: "On request",
    bestFor: "Premium stores; back sheet, beading, PVC stoppers",
    slug: "/products/wooden-center-rack",
  },
  {
    name: "Supermarket Corner Display Rack",
    image: "/supermarket_rack_red.webp",
    placement: "Corner",
    height: "6 ft, 900 mm bay",
    shelves: "5",
    load: "100 kg",
    bestFor: "Turning wall corners into display",
    slug: "/products/supermarket-corner-display-rack",
  },
  {
    name: "Store Display Racks",
    image: "/store_display_racks_black_.webp",
    placement: "Wall-faced side corner",
    height: "6 ft",
    shelves: "5",
    load: "On request",
    bestFor: "Departmental stores",
    slug: "/products/store-display-racks",
  },
  {
    name: "Supermarket Storage Racks",
    image: "/slotted_angle_commercial_rack.webp",
    placement: "Wall-faced side corner",
    height: "7 ft",
    shelves: "6",
    load: "On request",
    bestFor: "Groceries and household goods",
    slug: "/products/supermarket-storage-racks",
  },
  {
    name: "End Display Rack",
    image:  "/end_display_rack_.webp",
    placement: "Aisle end",
    height: "5 ft",
    shelves: "4",
    load: "On request",
    bestFor: "Offers and new launches",
    slug: "/products/end-display-rack",
  },
  {
    name: "Toy Display Rack",
    image: "/toy_display_racks.webp",
    placement: "Free-standing",
    height: "1,500 mm",
    shelves: "On request",
    load: "25 kg",
    bestFor: "Toy and gift shops",
    slug: "/products/toy-display-rack",
  },

];

function ProductDetail({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-2 text-[12px] leading-5 sm:text-[13px]">
      <Icon
        size={15}
        strokeWidth={1.8}
        className="mt-0.5 shrink-0 text-[#203070]"
      />

      <span className="shrink-0 text-[#707A8A]">
        {label}:
      </span>

      <span className="min-w-0 font-semibold text-[#172653]">
        {value}
      </span>
    </div>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
      }}
      className="group flex h-full flex-col rounded-2xl border border-[#E8ECF2] bg-white p-4 shadow-[0_4px_18px_rgba(23,38,83,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B817] hover:shadow-[0_14px_35px_rgba(23,38,83,0.10)] sm:p-5"
    >
      {/* IMAGE + PRODUCT DETAILS */}
      <div className="flex flex-1 items-start gap-3">

        {/* IMAGE */}
        <div className="relative h-[145px] w-[36%] shrink-0 overflow-hidden rounded-xl bg-[#F1F4F8] sm:h-[160px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 36vw, 180px"
            className="object-cover p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* DETAILS */}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[14px] font-extrabold leading-[1.4] text-[#172653] sm:text-[15px]">
            {product.name}
          </p>

          <div className="mt-4 space-y-2.5">
            <ProductDetail
              icon={MapPin}
              label="Placement"
              value={product.placement}
            />

            <ProductDetail
              icon={Ruler}
              label="Height"
              value={product.height}
            />

            <ProductDetail
              icon={Layers3}
              label="Shelves"
              value={product.shelves}
            />

            <ProductDetail
              icon={Weight}
              label="Load"
              value={product.load}
            />
          </div>
        </div>
      </div>

      {/* BEST FOR */}
      {/* <div className="mt-5 flex min-h-[54px] items-start gap-2 rounded-lg bg-[#FFF7E3] px-3 py-3">
        <CheckCircle2
          size={17}
          className="mt-0.5 shrink-0 text-[#D99C00]"
        />

        <p className="text-[11px] leading-5 text-[#35415A] sm:text-xs">
          <span className="font-extrabold text-[#172653]">
            Best for:{" "}
          </span>
          {product.bestFor}
        </p>
      </div> */}

      {/* BUTTON */}
      <div className="mt-4 flex justify-end">
        <Link
          href={`${product.slug}`}
          className="inline-flex min-h-[42px] items-center justify-center gap-3 rounded-lg bg-[#F5B817] px-5 py-2.5 text-xs font-extrabold text-[#172653] transition-all duration-300 hover:bg-[#203070] hover:text-white"
        >
          View Product
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export default function SupermarketRackProducts() {
  return (
    <section className="overflow-hidden bg-[#F1F3F7] py-6 sm:py-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">

        {/* SECTION HEADER */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-14">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span className="h-[3px] w-9 rounded-full bg-[#F5B817]" />

            <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
              Sisco Steel Products
            </span>

            <span className="h-[3px] w-9 rounded-full bg-[#F5B817]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold leading-tight text-[#203070] sm:text-4xl lg:text-[46px]"
          >
            Our Supermarket{" "}
            <span className="text-[#D99C00]">
              Display Racks
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#697386] sm:text-base"
          >
            Choose racks by where they stand in your store.
            Each model links to its full specification.
          </motion.p>
        </div>

        {/* PRODUCT CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-[#203070] p-7 sm:flex-row sm:p-9"
        >
          <div>
            <h3 className="text-xl font-extrabold text-white sm:text-2xl">
              Planning a new supermarket?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/70">
              Share your store dimensions and let us help plan your rack layout.
            </p>
          </div>

          <Link
            href="https://wa.me/917629827285?text=Hello%2C%20I%20want%20to%20plan%20my%20supermarket%20display%20racks."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#F5B817] px-6 py-4 text-sm font-extrabold text-[#172653] transition-all hover:-translate-y-1 hover:bg-white"
          >
            Plan My Store
            <ArrowUpRight size={19} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
