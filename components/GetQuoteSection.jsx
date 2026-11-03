
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Globe,
  Boxes,
  ArrowUpRight,
  MessageCircle,
  Factory,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// API helper
async function postJson(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result?.success === false) {
    throw new Error(result?.message || "Form submission failed");
  }

  return result;
}

export default function GetQuoteSection({product}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // FORM SUBMIT FUNCTION
  


const submit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  setSent(false);

  const form = e.currentTarget;
  const formDataRaw = new FormData(form);

  const name = formDataRaw.get("name")?.trim();
  const phone = formDataRaw.get("mobile")?.trim();
  const location = formDataRaw.get("location")?.trim();
  const racks = formDataRaw.get("racks")?.trim();
  const message = formDataRaw.get("message")?.trim();

  const formData = {
    platform: "Sisco steel Products",
    supplierToken: "6adc42d8755e2e90adbbad2b",
    platformEmail: "info.siscosteel@gmail.com",
    name: name || "N/A",
    phone: phone || "N/A",
    email: "N/A",
    product: product || "N/A",
    message: `Number of Racks: ${racks || "N/A"}\n\nRequirements: ${message || "N/A"}`,
    place: location || "N/A",
  };

  if (!/^\d{10}$/.test(phone || "")) {
    setError("Enter a valid 10-digit phone number");
    setLoading(false);
    return;
  }

  try {
    // Submit enquiry to BrandBnalo API
    await postJson(
      "https://brandbnalo.com/api/form/add",
      formData
    );

    // Prepare WhatsApp message
    const whatsappMessage = `
Hello Sisco Steel Products,

A new ${product} enquiry has been submitted.

Name: ${name || "N/A"}
Mobile: ${phone || "N/A"}
Delivery Location: ${location || "N/A"}
Number of Racks: ${racks || "N/A"}

Message / Requirements:
${message || "N/A"}

Website: https://siscosteelproducts.com
    `.trim();

    const whatsappURL = `https://wa.me/917629827285?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Show success message
    setSent(true);
    form.reset();

    // Open WhatsApp after 1 second
    setTimeout(() => {
      window.location.href = whatsappURL;
    }, 1000);

    // Hide success message after 5 seconds
    setTimeout(() => setSent(false), 5000);

  } catch (err) {
    console.error("Form submission error:", err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};




  const inputClass =
    "mt-2 w-full rounded-xl border border-[#D9DFE9] bg-[#F9FAFC] px-4 py-3.5 text-sm text-[#172653] outline-none transition-all placeholder:text-[#9AA3B2] focus:border-[#203070] focus:bg-white focus:ring-2 focus:ring-[#203070]/10";

  const labelClass =
    "text-[11px] font-extrabold uppercase tracking-[1px] text-[#203070]";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F4F6F9] py-6 sm:py-12"
    >
      {/* DECORATIVE BACKGROUND */}
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#F5B817]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#203070]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[3px] w-9 rounded-full bg-[#F5B817]" />

            <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#203070]">
              Get a Quote
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#172653] sm:text-4xl lg:text-[48px]">
            Tell us about your store.
            <span className="block text-[#D99C00]">
              Get a rack quote.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#657084] sm:text-base">
            Share five details and our team will help plan your racks.
            No need to know steel gauges — just tell us what you're
            storing and where it has to fit.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT CONTACT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="relative flex flex-col overflow-hidden rounded-[24px] bg-[#172653] p-6 text-white shadow-xl sm:p-5"
          >
            {/* DECORATIVE CIRCLES */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

            {/* HEADING */}
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5B817] text-[#172653]">
                <Factory size={25} />
              </div>

              <h3 className="text-2xl font-extrabold sm:text-3xl">
                Talk to Sisco directly
              </h3>

              <span className="mt-2 block h-1 w-16 rounded-full bg-[#F5B817]" />

              <p className="mt-2 max-w-sm text-sm leading-5 text-white/75">
                Discuss your store, space and storage needs.
                Get a practical rack plan and a fixed quote.
              </p>
            </div>

            {/* CONTACT DETAILS */}
            <div className="relative z-10 mt-2 flex flex-col">

              {/* PHONE */}
              <a
                href="tel:+917629827285"
                className="flex items-center gap-4 border-b border-white/15 py-5 transition-colors hover:text-[#F5B817]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F5B817]">
                  <Phone size={21} />
                </div>

                <div>
                  <p className="text-base font-extrabold">
                    +91 76298 27285
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    Mon–Sat · 8:00 AM – 6:00 PM
                  </p>
                </div>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:info.siscosteel@gmail.com"
                className="flex items-center gap-4 border-b border-white/15 py-5 transition-colors hover:text-[#F5B817]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F5B817]">
                  <Mail size={21} />
                </div>

                <div className="min-w-0">
                  <p className="break-all text-sm font-extrabold sm:text-base">
                    info.siscosteel@gmail.com
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    Reply within one business day
                  </p>
                </div>
              </a>

              {/* WEBSITE */}
              <a
                href="https://siscosteelproducts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 py-5 transition-colors hover:text-[#F5B817]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F5B817]">
                  <Globe size={21} />
                </div>

                <div>
                  <p className="text-base font-extrabold">
                    siscosteelproducts.com
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    See the full product range
                  </p>
                </div>
              </a>
            </div>

            {/* LOAD GUIDANCE BOX */}
            <div className="relative z-10 mt-auto rounded-2xl border border-white/10 bg-white/10 p-3">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5B817] text-[#172653]">
                  <Boxes size={26} />
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-white">
                    Not sure about the load?
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-white/75 sm:text-sm">
                    Tell us what you plan to store and we'll recommend
                    the right rack and load capacity.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="rounded-[24px] border-2 border-[#F5B817] bg-white p-5 shadow-[0_15px_50px_rgba(23,38,83,0.07)] sm:p-5"
          >
            <form
              onSubmit={submit}
              className="space-y-6"
            >

              {/* ROW 1 */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="quote-name" className={labelClass}>
                    Your Name *
                  </label>

                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Rohit Sharma"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="quote-mobile" className={labelClass}>
                    Mobile Number *
                  </label>

                  <input
                    id="quote-mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    autoComplete="tel"
                    placeholder="e.g. 9876543210"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* ROW 2 */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="quote-location" className={labelClass}>
                    Delivery Location *
                  </label>

                  <input
                    id="quote-location"
                    name="location"
                    type="text"
                    required
                    autoComplete="address-level2"
                    placeholder="e.g. Delhi, Noida, Gurugram..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="quote-racks" className={labelClass}>
                    How Many Racks? *
                  </label>

                  <input
                    id="quote-racks"
                    name="racks"
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 10"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label htmlFor="quote-message" className={labelClass}>
                  Message / Requirements *
                </label>

                <textarea
                  id="quote-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="e.g. Store size, items to store, special requirements..."
                  className={`${inputClass} min-h-[130px] resize-y`}
                />
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                >
                  {error}
                </div>
              )}

              {/* SUCCESS MESSAGE */}
              {sent && (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
                >
                  <CheckCircle2 size={19} />
                  Your enquiry has been submitted successfully!
                </div>
              )}

              {/* SINGLE SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group flex min-h-[58px] w-full items-center justify-center gap-3 rounded-full bg-[#F5B817] px-6 py-4 text-sm font-extrabold text-[#172653] shadow-[0_8px_20px_rgba(245,184,23,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#203070] hover:text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting Enquiry...
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 size={20} />
                    Enquiry Submitted
                  </>
                ) : (
                  <>
                    <MessageCircle size={20} />
                    Send Enquiry
                    <ArrowUpRight
                      size={19}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-[#8791A1]">
                Our team will contact you regarding your rack requirements.
              </p>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
