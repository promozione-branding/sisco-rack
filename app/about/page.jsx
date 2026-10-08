import AboutUsHome from "@/components/AboutUsHome"
import AboutWhyChooseUs from "@/components/AboutWhyChooseUs"
import CTA from "@/components/Cta"
import IndustriesServed from "@/components/IndustriesServed"
import PageHead from "@/components/PageHead"
import WhyChooseUs from "@/components/WhyChooseUs"
import { aboutPageAbout, aboutWhyChoose } from "@/lib/aboutContent"

export const metadata = { title: "About | Rackwell Steel" }

const NAVY = "#0b1a40"
const YELLOW = "#f5b800"

const iconProps = {
  width: 42,
  height: 42,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "url(#iconShine)",
  strokeWidth: 2.5,
  style: { filter: "drop-shadow(0 4px 5px rgba(245,184,0,0.5)) drop-shadow(0 0 8px rgba(255,216,77,0.45))" },
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
}

function IconGradient() {
  return (
    <defs>
      <linearGradient id="iconShine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffe27a" />
        <stop offset="0.45" stopColor="#f5b800" />
        <stop offset="1" stopColor="#d99a00" />
      </linearGradient>
    </defs>
  )
}

function CalendarIcon() {
  return (
    <svg {...iconProps}>
      <IconGradient />
      <rect x="6" y="9" width="36" height="33" rx="5" />
      <path d="M15 5v8M33 5v8M6 19h36" />
      <path d="M15 26h3M22.5 26h3M30 26h3M15 33h3M22.5 33h3M30 33h3" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg {...iconProps}>
      <IconGradient />
      <path d="M4 12h24v22H4z" />
      <path d="M28 20h8l7 7v7H28z" />
      <circle cx="13" cy="36" r="4" fill="#fff" />
      <circle cx="35" cy="36" r="4" fill="#fff" />
      <path d="M11 23l4 4 7-8" />
      <path d="M1 18h6M0 24h5" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <IconGradient />
      <path d="M24 4l16 6v12c0 10-7 17-16 22C15 39 8 32 8 22V10z" />
      <path d="M16 24l6 6 11-12" />
    </svg>
  )
}

function StatCard({ value, unit, label, icon, className = "" }) {
  return (
    <div
      className={`group relative z-10 rounded-[22px] bg-white px-6 pb-4 pt-3 shadow-[0_18px_40px_-12px_rgba(20,30,70,0.28),0_2px_6px_rgba(20,30,70,0.08)] ${className}`}
    >
      <b
        className="block bg-no-repeat bg-[length:250%_100%,100%_100%] bg-[position:100%_0,0_0] bg-clip-text font-display text-[4rem] font-extrabold leading-[1] tracking-tight text-transparent transition-[background-position] duration-700 ease-out group-hover:bg-[position:0%_0,0_0] max-[720px]:text-[3.5rem]"
        style={{
          backgroundImage:
            "linear-gradient(105deg, transparent 38%, rgba(120,160,255,0.95) 50%, transparent 62%), linear-gradient(180deg, #2f4fa8 0%, #0b1a40 48%, #060f2b 100%)",
          WebkitBackgroundClip: "text",
          filter:
            "drop-shadow(0 3px 2px rgba(11,26,64,0.35)) drop-shadow(0 10px 14px rgba(40,90,255,0.35))",
        }}
      >
        {value}
        {unit && <span className="ml-2 text-[2.2rem]">{unit}</span>}
      </b>
      <div className="mt-2 h-[2px] w-[68%]" style={{ background: YELLOW }} />
      <div className="mt-3 flex items-end justify-between gap-4">
        <span className="text-[1.05rem] font-medium text-[#2a3350]">{label}</span>
        {icon}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <>
      <PageHead
        title="Built on the shop floor"
        text="Sisco started as a two-person welding bay. Today we make racking for warehouses, workshops and shops across the country."
        backgroundImage="/about_bg.webp"
      />
      <AboutUsHome {...aboutPageAbout}/>
      <IndustriesServed />
<section
  className="bg-[#eceef1] bg-cover bg-center bg-no-repeat py-12 max-[720px]:py-8"
  style={{
    backgroundImage:
      "linear-gradient(90deg, rgba(236,238,241,0.96) 0%, rgba(236,238,241,0.88) 40%, rgba(236,238,241,0.45) 100%), url('/steel.webp')",
  }}
>
        <div className="mx-auto max-w-full px-14 max-[960px]:px-10 max-[720px]:px-5">
          <div className="grid grid-cols-[1fr_1fr] items-center gap-10 max-[960px]:grid-cols-[1fr]">
            <div className="relative pl-12 max-[720px]:pl-8">
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-3"
                style={{ background: YELLOW }}
              />
              <h2
                className="font-display text-[4.8rem] font-extrabold leading-[0.95] tracking-tight max-[720px]:text-[3.2rem]"
                style={{ color: NAVY }}
              >
                Steel 
                <br />
                you
                <br />
                can trust
              </h2>
              <p className="mt-7 max-w-[30rem] text-[1.05rem] leading-[1.6] text-[#1f2740]">
                Since 2015, Sisco Steel Products has focused on quality manufacturing, durable products, and practical storage solutions for industrial, commercial, and retail applications.
              </p>
              <p className="mt-4 text-[1.05rem] leading-[1.6] text-[#1f2740]">
                Built for performance. 
                <br />
                Focused on quality.
              </p>
            </div>

            <div className="relative flex flex-col gap-5 min-[961px]:min-h-[470px] min-[961px]:gap-4">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full max-[960px]:hidden"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M48 16 C 58 16, 56 26, 60 34"
                  stroke={YELLOW}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M68.5 50 C 79 50, 78 62, 81 69"
                  stroke={YELLOW}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <StatCard
                value="11+"
                label="years of experience"
                icon={<CalendarIcon />}
                className="min-[961px]:w-[48%]"
              />
              <StatCard
                value="5,000+"
                label="Racks Supplied"
                icon={<TruckIcon />}
                className="min-[961px]:ml-[16%] min-[961px]:w-[52%]"
              />
              <StatCard
                value="2017"
                label="GST registered"
                icon={<ShieldIcon />}
                className="min-[961px]:ml-[42%] min-[961px]:w-[48%]"
              />
            </div>
          </div>
        </div>
      </section>
      <AboutWhyChooseUs />
      <CTA />
    </>
  )
}