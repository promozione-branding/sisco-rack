
"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  ShoppingBag,
  Package,
  Settings,
  Warehouse,
  Grid3X3,
  Weight,
  ArrowUpRight,
} from "lucide-react";
import QuoteModal from "../QuoteModal";
import { useState } from "react";

const loadOptions = [
  {
    icon: FolderOpen,
    store: "Office files, ledgers, stationery",
    load: "Up to 150 kg",
    build: "6 ft, 5 shelves, 2.0 mm angle, 20 gauge shelves",
  },
  {
    icon: ShoppingBag,
    store: "Shop stock, garments, packaged goods",
    load: "50–100 kg",
    build: "7–8 ft, 4–6 shelves, 2.0 mm angle",
  },
  {
    icon: Package,
    store: "E-commerce cartons, godown stock",
    load: "Up to 150 kg",
    build: "10 ft, 8 shelves, 2.5 mm (12 gauge) angle",
  },
  {
    icon: Settings,
    store: "Auto parts, hardware, tools, raw material",
    load: "Up to 250 kg",
    build: "Heavy duty slotted angle rack, 5 levels",
  },
  {
    icon: Warehouse,
    store: "Bulk stock in tall sheds",
    load: "Up to 250 kg",
    build: "14 ft industrial slotted angle rack, 6 shelves",
  },
  {
    icon: Grid3X3,
    store: "Pallets, or more than 250 kg per shelf",
    load: "300 kg and above",
    build: "Move up to our heavy duty racks",
  },
];

export default function LoadSuitabilitySection() {
    const [productquote, setProductquote] = useState(false)  

  return (
    <section className="relative overflow-hidden bg-[#F4F6F9] py-6 lg:py-12">

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-[950px]"
        >
          <span className="mb-4 block h-1.5 w-16 rounded-full bg-[#F5B817]" />

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#172653] sm:text-4xl lg:text-[48px]">
            Which Slotted Angle Rack
            <span className="block text-[#E0A010]">
              Suits Your Load?
            </span>
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#526078] sm:text-lg">
            Choose by what sits on each shelf, not by height alone.
            Use this as a starting point; we confirm the build on site.
          </p>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid items-stretch gap-7 lg:grid-cols-[0.32fr_0.68fr] lg:gap-8">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[320px] overflow-hidden rounded-[24px] border-r-[7px] border-[#F5B817] shadow-xl lg:min-h-[650px]"
          >
            <img
              src="/double_sided_racks.webp"
              alt="Industrial slotted angle racks storing warehouse cartons"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#142653]/75 via-transparent to-transparent" />

            <div className="absolute bottom-7 left-6 right-6">
              <span className="inline-block rounded-full bg-[#F5B817] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#172653]">
                Smart Storage Solutions
              </span>

              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Find the Right Rack
                <span className="block text-[#FFC629]">
                  For Every Load
                </span>
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/85">
                Choose storage solutions designed around your
                products, shelf capacity and warehouse space.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COMPARISON TABLE */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl border border-[#DFE5EF] bg-white shadow-[0_10px_35px_rgba(23,38,83,0.07)]"
          >

            {/* TABLE HEADER */}
            <div className="hidden grid-cols-[1.15fr_0.75fr_1.3fr] gap-4 bg-[#203B70] px-5 py-5 text-sm font-bold text-white md:grid lg:px-6">
              <div>What you store</div>
              <div className="text-center">Load per shelf</div>
              <div>Suggested build</div>
            </div>

            {/* TABLE ROWS */}
            <div className="divide-y divide-[#E2E7EF]">
              {loadOptions.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.store}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                    }}
                    className="grid grid-cols-1 items-center gap-4 px-5 py-5 transition-colors hover:bg-[#F8FAFD] md:grid-cols-[1.15fr_0.75fr_1.3fr] md:gap-4 lg:px-6"
                  >

                    {/* STORAGE TYPE */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF2CC] text-[#203070]">
                        <Icon size={22} strokeWidth={1.8} />
                      </div>

                      <div>
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#9AA3B1] md:hidden">
                          What you store
                        </span>

                        <h3 className="text-sm font-bold leading-5 text-[#172653] sm:text-[15px]">
                          {item.store}
                        </h3>
                      </div>
                    </div>

                    {/* LOAD CAPACITY */}
                    <div className="flex items-center md:justify-center">
                      <span className="mr-2 text-[10px] font-bold uppercase text-[#9AA3B1] md:hidden">
                        Load per shelf:
                      </span>

                      <span className="inline-flex items-center justify-center rounded-lg bg-[#FFF0C2] px-4 py-2 text-xs font-extrabold text-[#203070] sm:text-sm">
                        <Weight size={15} className="mr-2 text-[#D69A0A]" />
                        {item.load}
                      </span>
                    </div>

                    {/* SUGGESTED BUILD */}
                    <div className="border-l-[3px] border-[#F5B817] pl-4">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#9AA3B1] md:hidden">
                        Suggested build
                      </span>

                      <p className="text-sm font-medium leading-6 text-[#263653]">
                        {item.build}
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* KEY TAKEAWAY */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-10 overflow-hidden rounded-2xl bg-[#172F5D] px-6 py-7 text-white shadow-xl sm:px-9 lg:px-10"
        >

          {/* Decorative accents */}
          <div className="absolute -right-5 -top-16 h-48 w-48 rounded-full border-[25px] border-white/5" />

          <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center">

            {/* Yellow label */}
            <div className="flex shrink-0 items-center gap-3 rounded-xl bg-[#F5B817] px-5 py-4 text-[#172653]">
              <Weight size={26} strokeWidth={2.5} />

              <span className="text-lg font-extrabold">
                Key Takeaway
              </span>
            </div>

            <div className="hidden h-14 w-px bg-white/30 md:block" />

            {/* Message */}
            <div className="flex-1">
              <p className="text-base font-medium leading-7 text-white sm:text-lg">
                Match the rack to the weight on each shelf.
                For heavier loads (250 kg+), choose our
                <strong className="text-[#FFC629]">
                  {" "}heavy duty or industrial slotted angle racks.
                </strong>
              </p>
            </div>

            <button
              onClick={() => setProductquote(true)}
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-bold text-white transition-all bg-[#F5B817] hover:border-[#F5B817] hover:bg-[#F5B817] hover:text-[#172653]"
            >
              Get Expert Advice
              <ArrowUpRight size={17} />
            </button>

          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 right-0 h-1.5 w-1/3 bg-[#F5B817]" />

        </motion.div>

        <QuoteModal open={productquote} onClose={() => setProductquote(false)} />


      </div>
    </section>
  );
}
