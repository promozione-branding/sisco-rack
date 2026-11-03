
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { indianCities } from "@/lib/city";

export default function SupplyNetworkCity({ pagePath }) {
  return (
    <section className="bg-white py-6 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-5 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-1.5 w-12 rounded-full bg-[#F5B817]" />
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#172653]">
              Our Supply Network
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#172653] sm:text-4xl md:text-5xl">
            Our Supply{" "}
            <span className="text-[#F5B817]">Network</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
            We supply and deliver our storage solutions across major cities
            and industrial hubs in India.
          </p>
        </div>

        {/* City Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#DCE3EE] bg-white px-1 py-2 shadow-sm "
        >
          <div className="flex flex-wrap items-center justify-center gap-y-2">
            {indianCities.map((city, index) => {
              const cityName =
                typeof city === "string"
                  ? city
                  : city.name || city.city || city.label;

              const citySlug = cityName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

              return (
                <div
                  key={citySlug}
                  className="inline-flex items-center gap-5 px-2 sm:px-2"
                >
                  <Link
                    href={`/${citySlug}${pagePath}`}
                    className="text-base  capitalize  text-[#172653] transition-colors hover:text-[#D99C00] sm:text-lg "
                  >
                    {cityName}
                  </Link>

                  {index !== indianCities.length - 1 && (
                    <span className="font-semibold text-[#F5B817]">
                      |
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <MapPin size={16} className="text-[#F5B817]" />
          Delivering storage solutions across India
        </div>

      </div>
    </section>
  );
}
