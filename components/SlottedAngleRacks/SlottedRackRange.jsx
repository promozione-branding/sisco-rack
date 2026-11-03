
"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Ruler,
  Layers3,
  Weight,
  Settings2,
  MoveVertical,
  Grid3X3,
  Wrench,
} from "lucide-react";

const products = [
  {
    name: "Slotted Angle Storage Rack Compact",
    dimensions: "3 × 4 × 1.8 ft",
    height: "3 ft",
    shelves: "Not specified",
    load: "50 kg",
    thickness: "On request",
    best: "Light office and home storage",
    image: "/industrial-store-rack.webp",
    slug: "/products/slotted-angle-storage-rack",
  },
  {
    name: "Adjustable Slotted Angle Rack",
    height: "6 ft",
    shelves: "5",
    load: "100 kg",
    thickness: "2.0 mm",
    best: "Shops, offices, small stores",
    image: "/adjustable_slotted_angle_rack.webp",
    slug: "/products/adjustable-slotted-angle-rack",
  },
  {
    name: "Slotted Angle Rack (Office)",
    height: "6 ft",
    shelves: "5",
    load: "150 kg",
    thickness: "2.0 mm",
    best: "Files, records, office supplies",
    image:  "/slotted_angle_rack_.webp",
    slug: "/products/slotted-angle-rack-manufacturer",
  },
  {
    name: "Commercial Slotted Angle Rack",
    height: "7 ft",
    shelves: "6",
    load: "50–100 kg",
    thickness: "2.0 mm (14 gauge)",
    best: "Shops, showrooms, godowns",
    image:"/slotted_angle_commercial_rack.webp",
    slug: "/products/commercial-slotted-angle-rack",
  },
  {
    name: "Shelving Rack",
    height: "8 ft",
    shelves: "4",
    load: "100 kg",
    thickness: "On request",
    best: "Stores needing movable layouts",
    image:"/shelving_rack.webp",
    slug: "/products/shelving-rack",
  },
  {
    name: "Slotted Angle Section Panel Rack",
    height: "8 ft",
    shelves: "4",
    load: "50 kg",
    thickness: "On request",
    best: "Panels, sheets, light parts",
    image: "/section_panel.webp",
    slug: "/products/slotted-angle-section-panel-rack",
  },
  {
    name: "Heavy Duty Slotted Angle Rack",
    dimensions: "2700 × 1200 mm base",
    height: "8 ft",
    shelves: "5",
    load: "250 kg",
    thickness: "On request",
    best: "Raw material, tools, auto parts",
    image: "/slotted.jpeg",
    slug: "/products/heavy-duty-slotted-angle-rack",
  },
  {
    name: "Metal Slotted Angle Rack",
    height: "10 ft",
    shelves: "8",
    load: "100 kg",
    thickness: "2.0 mm (14 gauge)",
    best: "Warehouses, archives",
    image: "/industrial-ms-storage-rack_.webp",
    slug: "/products/metal-slotted-angle-rack",
  },
  {
    name: "Slotted Angle Partition Rack",
    height: "10 ft",
    shelves: "8",
    load: "100–150 kg",
    thickness: "2.0 mm (14 gauge)",
    best: "Splitting a floor into storage zones",
    image:  "/partition_rack.webp",
    slug: "/products/slotted-angle-partition-rack",
  },
  {
    name: "Slotted Angle Rack for Warehouse",
    height: "10 ft",
    shelves: "8",
    load: "150 kg",
    thickness: "2.5 mm (12 gauge)",
    best: "Cartons, e-commerce stock",
    image: "/slotted_angle_warehouse_racks.webp",
    slug: "/products/slotted-angle-rack-for-warehouse",
  },
  {
    name: "MS Slotted Angle Rack",
    height: "12 ft",
    shelves: "6",
    load: "On request",
    thickness: "On request",
    best: "Tall warehouse bays",
    image: "/ms_slotted_angle_rack.webp",
    slug: "/products/ms-slotted-angle-rack",
  },
  {
    name: "Industrial Slotted Angle Storage Rack",
    height: "14 ft",
    shelves: "6",
    load: "250 kg",
    thickness: "On request",
    best: "High-bay industrial storage",
    image: "/industrial_slotted_angle_warehouse.webp",
    slug: "/products/industrial-slotted-angle-storage-rack",
  },
];

const specifications = [
  {
    icon: Layers3,
    title: "Angle Thickness",
    value: "2.0 mm (14 gauge)",
    extra: "& 2.5 mm (12 gauge)",
  },
  {
    icon: MoveVertical,
    title: "Height Range",
    value: "3 ft to 14 ft",
    extra: "(Custom up to 20 ft)",
  },
  {
    icon: Weight,
    title: "Shelf Load",
    value: "50 kg to",
    extra: "250 kg per shelf",
  },
  {
    icon: Grid3X3,
    title: "Shelves",
    value: "4 to 8",
    extra: "(As per model)",
  },
  {
    icon: Wrench,
    title: "Options",
    value: "Standard &",
    extra: "Custom sizes",
  },
];

const loadComparison = [
  {
    name: "Slotted Angle Shelving Rack",
    height: "Up to 20 ft",
    shelves: "Custom",
    load: "100 kg",
    thickness: "2.0 mm",
    best: "Grocery, retail, custom heights",
    image: "/products/shelving-rack.webp",
  },
];

function ProductCard({ product, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -5 }}
      className="group flex min-w-0 flex-col rounded-xl border border-[#E1E7F0] bg-white p-3 shadow-[0_5px_20px_rgba(23,38,83,0.05)] transition-all duration-300 hover:border-[#E0A010] hover:shadow-[0_12px_30px_rgba(23,38,83,0.12)] sm:flex-row sm:gap-3 sm:p-4"
    >
      {/* Product image */}
      <div className="flex h-[155px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F3F6FA] sm:h-[150px] sm:w-[115px]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover p-2 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product details */}
      <div className="flex min-w-0 flex-1 flex-col pt-3 sm:pt-0">
        <h3 className="text-[15px] font-extrabold leading-5 text-[#172653]">
          {product.name}
        </h3>

        {product.dimensions && (
          <p className="mt-1 text-[11px] font-semibold text-[#B17A00]">
            {product.dimensions}
          </p>
        )}

        <div className="mt-3 space-y-2">
          <Spec icon={Ruler} label="Height" value={product.height} />
          <Spec icon={Layers3} label="Shelves" value={product.shelves} />
          <Spec icon={Weight} label="Load" value={product.load} />
          <Spec
            icon={Settings2}
            label="Angle"
            value={product.thickness}
          />
        </div>

        <div className="mt-auto pt-4">
          {/* <p className="mb-3 text-xs leading-5 text-[#657083]">
            <span className="font-bold text-[#203070]">Best for: </span>
            {product.best}
          </p> */}

          <a
            href={product.slug}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F5B817] px-4 py-2.5 text-xs font-extrabold text-[#172653] transition-all hover:bg-[#FFD04A]"
          >
            View Product
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-[12px] leading-4">
      <Icon size={14} className="shrink-0 text-[#203070]" />
      <span className="text-[#657083]">{label}:</span>
      <span className="font-semibold text-[#172653]">{value}</span>
    </div>
  );
}

export default function SlottedRackRange() {
  return (
    <section className="relative overflow-hidden bg-[#F4F6F9] py-6 lg:py-12">

      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[#203070]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-[#F5B817]" />
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#203070]">
              Our Products
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#172653] sm:text-4xl lg:text-5xl">
            Our Slotted Angle{" "}
            <span className="text-[#D69A0A]">Rack Range</span>
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#657083] sm:text-lg">
            Pick a ready model or ask for a custom size.
            Each model links to its full specification.
          </p>
        </motion.div>

        {/* PRODUCT CARD GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* STANDARD SPECIFICATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden rounded-2xl border border-[#DFE5EF] bg-white shadow-[0_10px_35px_rgba(23,38,83,0.07)]"
        >
          <div className="grid lg:grid-cols-[250px_1fr]">

            {/* Navy heading panel */}
            <div className="relative flex items-center bg-[#203070] px-7 py-8 text-white">
              <div className="absolute right-0 top-0 h-full w-[7px] bg-[#F5B817]" />

              <h3 className="text-3xl font-extrabold leading-tight">
                Standard
                <span className="block text-[#FFC629]">
                  Specifications
                </span>
              </h3>
            </div>

            {/* Specification items */}
            <div className="grid grid-cols-2 divide-x divide-y divide-[#E2E7EF] sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
              {specifications.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center justify-center px-3 py-6 text-center"
                  >
                    <Icon
                      size={30}
                      strokeWidth={1.8}
                      className="mb-3 text-[#E0A010]"
                    />

                    <h4 className="text-sm font-extrabold text-[#172653]">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs font-semibold text-[#203070]">
                      {item.value}
                    </p>

                    <p className="text-xs text-[#657083]">
                      {item.extra}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* LOAD SELECTION SECTION */}
    

      </div>
    </section>
  );
}
