
"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Truck,
  Navigation,
  Factory,
  ArrowUpRight,
} from "lucide-react";

const zones = [
  {
    name: "North East Delhi",
    areas: "Karawal Nagar, Shahdara, Yamuna Vihar, Bhajanpura, Gokulpuri, Seelampur, Dilshad Garden, Nand Nagri",
  },
  {
    name: "East Delhi",
    areas: "Patparganj, Laxmi Nagar, Preet Vihar, Gandhi Nagar, Jhilmil, Mayur Vihar, Shakarpur",
  },
  {
    name: "North & North West Delhi",
    areas: "Bawana, Narela, Wazirpur, Rohini, Pitampura, Model Town, Azadpur, Mangolpuri",
  },
  {
    name: "Central Delhi",
    areas: "Chandni Chowk, Sadar Bazar, Kashmere Gate, Karol Bagh, Daryaganj, Paharganj",
  },
  {
    name: "West Delhi",
    areas: "Mundka, Mayapuri, Naraina, Kirti Nagar, Punjabi Bagh, Janakpuri, Tilak Nagar",
  },
  {
    name: "South Delhi",
    areas: "Okhla, Mohan Cooperative, Badarpur, Kalkaji, Saket, Lajpat Nagar, Mehrauli",
  },
  {
    name: "Delhi NCR",
    areas: "Ghaziabad, Loni, Noida, Greater Noida, Gurugram, Faridabad, Sonipat, Bahadurgarh",
  },
];

export default function ServiceAreasSection() {
  return (
    <section className="bg-white py-6 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-[#F5B817]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#203070]">
              Our Service Network
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#172653] sm:text-4xl lg:text-5xl">
            Areas We Serve in{" "}
            <span className="text-[#D69A0A]">Delhi and NCR</span>
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#657083] sm:text-base">
            Our Karawal Nagar factory sits in North East Delhi,
            close to Shahdara, East Delhi and Ghaziabad.
            Our crews deliver and install across the city.
          </p>
        </motion.div>

        {/* Map + Zones */}
        <div className="grid gap-7 lg:grid-cols-1">

     

          {/* SERVICE ZONES */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            

           
{/* SERVICE ZONES */}

{/* SERVICE ZONES */}
<motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <div className="mb-6 flex items-center justify-between">
    <h3 className="text-lg font-extrabold text-[#172653] sm:text-xl">
      Our Delivery Locations
    </h3>

    <span className="rounded-full bg-[#FFF2CC] px-4 py-2 text-xs font-bold text-[#203070]">
      7 Service Zones
    </span>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

    {/* 7 Service Zone Cards */}
    {zones.map((zone, index) => (
      <motion.div
        key={zone.name}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: (index % 4) * 0.08,
        }}
        whileHover={{ y: -5 }}
        className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-xl border border-[#E3E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#E0A010] hover:shadow-lg"
      >
        {/* Top */}
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF2CC] text-[#203070] transition-colors group-hover:bg-[#F5B817]">
            <MapPin size={23} />
          </div>

          <span className="text-2xl font-extrabold text-[#E9EDF3] group-hover:text-[#F5B817]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <h4 className="mt-5 text-base font-extrabold leading-5 text-[#203070]">
          {zone.name}
        </h4>

        <p className="mt-2 text-xs leading-5 text-[#657083]">
          {zone.areas}
        </p>

        <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#F5B817] transition-all duration-300 group-hover:w-full" />
      </motion.div>
    ))}

    {/* 8th Contact Card */}
    <motion.a
      href="https://wa.me/917629827285?text=Hello%20Sisco%20Racks%2C%20I%20want%20to%20know%20about%20delivery%20to%20my%20location."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group flex min-h-[190px] flex-col justify-between overflow-hidden rounded-xl bg-[#203070] p-5 text-white shadow-lg transition-all duration-300 hover:bg-[#172653]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5B817] text-[#172653]">
          <Navigation size={23} />
        </div>

        <ArrowUpRight
          size={24}
          className="text-[#FFC629] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>

      <div className="mt-5">
        <h4 className="text-lg font-extrabold leading-6 text-[#FFC629]">
          Your Location Not Listed?
        </h4>

        <p className="mt-2 text-xs leading-5 text-white/80">
          Contact our team to check delivery and installation
          availability in your area.
        </p>

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
          Contact Us
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.a>

  </div>
</motion.div>


          </motion.div>

        </div>

        {/* DELIVERY STRIP */}
       

      </div>
    </section>
  );
}
