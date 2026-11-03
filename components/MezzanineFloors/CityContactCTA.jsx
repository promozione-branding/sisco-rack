"use client";

import {
  Phone,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export default function CityContactCTA({
  cityName = "Delhi",
  phone = "+91 76298 27285",
  whatsapp = "917629827285",
  image = "/mezzanine_blue_cold.webp",
}) {
  const whatsappMessage = encodeURIComponent(
    `Hello Sisco Racks, I need a mezzanine floor quotation in ${cityName}. Please share the details.`
  );

  return (
    <section className="relative overflow-hidden bg-white py-5 sm:py-10">

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        <div className="relative grid min-h-[480px] items-center overflow-hidden rounded-[28px] bg-[#F8FAFD] lg:grid-cols-[1.15fr_0.85fr] lg:rounded-[36px]">

          {/* LEFT CONTENT */}
          <div className="relative z-20 px-6 py-6 sm:px-10 lg:px-12 lg:py-6">

            {/* Yellow accent */}
            <div
              className="mb-7 h-2 w-[65px] rounded-full bg-[#F5B817]"
            />

            {/* Heading */}
            <h2
              className="max-w-[650px] text-4xl font-extrabold tracking-tight text-[#172F5D] sm:text-5xl lg:text-[58px]"
            >
              Get a Mezzanine Floor 
              <span className="mt-2 block text-[#F2B30B]">
                Quote in {cityName}
              </span>
            </h2>

            {/* Description */}
            <p
              className="mt-6 max-w-[620px] text-base leading-7 text-[#536078] sm:text-lg"
            >
              Visit our showroom, call, or send your sizes on WhatsApp.
            </p>

            {/* CTA BUTTONS */}
            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[76px] items-center justify-between gap-4 rounded-full bg-[#16B653] px-6 py-4 text-white shadow-[0_12px_28px_rgba(22,182,83,0.22)] hover:bg-[#109D46] sm:min-w-[280px] sm:px-8"
              >
                <div className="flex items-center gap-4">
                  <MessageCircle size={35} strokeWidth={2.2} />

                  <div>
                    <span className="block text-xs font-semibold text-white/85">
                      Get a Quote on
                    </span>
                    <span className="text-lg font-extrabold sm:text-xl">
                      WhatsApp
                    </span>
                  </div>
                </div>

                <ArrowUpRight
                  size={23}
                  className=""
                />
              </a>

              {/* Call */}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="group inline-flex min-h-[76px] items-center gap-4 rounded-full bg-[#F5B817] px-6 py-4 text-[#172F5D] shadow-[0_12px_28px_rgba(245,184,23,0.2)] hover:bg-[#FFD04A] sm:min-w-[280px] sm:px-8"
              >
                <Phone
                  size={32}
                  fill="currentColor"
                  strokeWidth={1.5}
                />

                <div>
                  <span className="block text-xs font-semibold">
                    Call Us
                  </span>

                  <span className="text-lg font-extrabold sm:text-xl">
                    {phone}
                  </span>
                </div>
              </a>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div
            className="relative min-h-[360px] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-[43%] lg:min-h-full"
          >

            {/* Yellow curved background */}
            <div className="absolute -left-20 top-[-15%] z-10 hidden h-[130%] w-36 rounded-[50%] bg-[#F5B817] lg:block" />

            <img
              src={image}
              alt={`Industrial slotted angle racks in ${cityName}`}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#172F5D]/30 via-transparent to-transparent" />

          </div>

          {/* Bottom brand accent */}
          <div className="absolute bottom-0 left-0 z-20 h-2 w-full bg-gradient-to-r from-[#172F5D] via-[#F5B817] to-transparent" />

        </div>
      </div>
    </section>
  );
}