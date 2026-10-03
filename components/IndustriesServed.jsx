const NAVY = "#0b1a40"
const BLUE = "#2563c9"
const BLUE_TINT = "#e6effc"
const YELLOW = "#e0a400"
const YELLOW_TINT = "#fdf3d6"

const svgBase = {
  width: 34,
  height: 34,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
}

const icons = {
  warehouse: (
    <svg {...svgBase}>
      <path d="M4 20L24 8l20 12v22H4z" />
      <path d="M12 42V28h24v14M12 35h24" />
      <path d="M18 28v14M30 28v14" />
    </svg>
  ),
  package: (
    <svg {...svgBase}>
      <path d="M24 5l16 8v20l-16 10L8 33V13z" />
      <path d="M8 13l16 8 16-8M24 21v22" />
      <path d="M16 9l16 8" />
    </svg>
  ),
  retail: (
    <svg {...svgBase}>
      <path d="M4 8h6l5 22h21l5-16H12" />
      <circle cx="19" cy="38" r="3" />
      <circle cx="33" cy="38" r="3" />
    </svg>
  ),
  factory: (
    <svg {...svgBase}>
      <path d="M5 42V22l12 7v-7l12 7v-7l12 7v13z" />
      <path d="M33 22V7h7v22" />
      <path d="M11 36h4M21 36h4M31 36h4" />
    </svg>
  ),
  snowflake: (
    <svg {...svgBase}>
      <path d="M24 4v40M7 14l34 20M41 14L7 34" />
      <path d="M19 7l5 4 5-4M19 41l5-4 5 4" />
      <path d="M6 22l6-1-2-5.5M42 26l-6 1 2 5.5" />
    </svg>
  ),
  pharma: (
    <svg {...svgBase}>
      <rect x="6" y="14" width="36" height="28" rx="4" />
      <path d="M17 14V9h14v5" />
      <path d="M24 21v14M17 28h14" />
    </svg>
  ),
  wrench: (
    <svg {...svgBase}>
      <path d="M31 6a10 10 0 00-9 13L6 35a4 4 0 006 6l16-16a10 10 0 0013-9l-7 5-6-2-2-6z" />
    </svg>
  ),
  archive: (
    <svg {...svgBase}>
      <path d="M4 17L24 6l20 11z" />
      <path d="M9 21v15M19 21v15M29 21v15M39 21v15M5 40h38" />
    </svg>
  ),
  pin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.800 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
}

// Desktop positions are percentages of the 883 x 450 board (l = left, t = top, w = width, h = height)
const industries = [
  { label: "Warehouses & Logistics", icon: "warehouse", tone: "blue", l: "19%", t: "0%", w: "23.2%", h: "27.8%" },
  { label: "E-commerce & Fulfilment", icon: "package", tone: "yellow", l: "60.6%", t: "0%", w: "21.9%", h: "27.8%" },
  { label: "Retail & Supermarkets", icon: "retail", tone: "blue", l: "0%", t: "33.3%", w: "22.4%", h: "28.2%" },
  { label: "Manufacturing Plants", icon: "factory", tone: "yellow", l: "39.6%", t: "33.3%", w: "22.4%", h: "28.2%" },
  { label: "Cold Storage & Food Processing", icon: "snowflake", tone: "blue", l: "75.9%", t: "33.3%", w: "24.1%", h: "30%" },
  { label: "Pharma & Healthcare", icon: "pharma", tone: "yellow", l: "7.6%", t: "69.1%", w: "23.4%", h: "30.2%" },
  { label: "Automotive & Workshops", icon: "wrench", tone: "blue", l: "41.8%", t: "69.1%", w: "22.9%", h: "30.2%" },
  { label: "Government & Archives", icon: "archive", tone: "yellow", l: "73.4%", t: "69.1%", w: "22.9%", h: "30.2%" },
]

function IndustryCard({ item }) {
  const isBlue = item.tone === "blue"
  const accent = isBlue ? BLUE : YELLOW
  const tint = isBlue ? BLUE_TINT : YELLOW_TINT

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-[10px] bg-white px-4 py-5 text-center shadow-[0_8px_24px_-8px_rgba(20,30,70,0.22),0_1px_3px_rgba(20,30,70,0.08)] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:h-[var(--h)] lg:w-[var(--w)] lg:py-0"
      style={{
        borderLeft: `4px solid ${accent}`,
        "--l": item.l,
        "--t": item.t,
        "--w": item.w,
        "--h": item.h,
      }}
    >
      <span
        className="flex h-[58px] w-[58px] items-center justify-center rounded-full"
        style={{ background: tint, color: accent }}
      >
        {icons[item.icon]}
      </span>
      <span
        className="max-w-[11rem] text-[1.05rem] font-semibold leading-snug"
        style={{ color: NAVY }}
      >
        {item.label}
      </span>
    </div>
  )
}

function Connectors() {
  const dotted = {
    stroke: YELLOW,
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeDasharray: "0.1 9",
    fill: "none",
  }
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 883 450"
    >
      {/* Warehouses -> E-commerce */}
      <path d="M376 59H525" {...dotted} />
      <circle cx="442" cy="59" r="3.5" fill={YELLOW} />
      <path d="M529 54l9 5-9 5z" fill={YELLOW} />

      {/* Warehouses -> Manufacturing */}
      <path d="M271 131C271 190 290 206 336 206" {...dotted} />
      <path d="M338 201l9 5-9 5z" fill={YELLOW} />

      {/* Manufacturing -> Cold storage */}
      <path d="M553 214H640" {...dotted} />
      <path d="M642 209l9 5-9 5z" fill={YELLOW} />

      {/* Manufacturing -> Pharma */}
      <path d="M382 281C372 330 350 384 286 384" {...dotted} />
      <circle cx="382" cy="281" r="3.5" fill={YELLOW} />

      {/* Automotive -> Government */}
      <path d="M575 378H630" {...dotted} />
      <path d="M632 373l9 5-9 5z" fill={YELLOW} />
    </svg>
  )
}

export default function IndustriesServed() {
  return (
    <section
      className="relative overflow-hidden py-20 max-[720px]:py-12"
      style={{
        background:
          "radial-gradient(circle at 15% 10%, #ffffff 0%, #f2f4f7 55%, #eceef2 100%)",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[0.9rem] font-bold uppercase tracking-[0.12em] shadow-[0_6px_18px_-6px_rgba(20,30,70,0.25)]" style={{ color: NAVY }}>
            {icons.pin}
            Industries we serve
          </span>

          <h2
            className="mt-6 font-display text-[3.6rem] font-extrabold leading-[1.05] tracking-tight max-[720px]:text-[2.4rem]"
            style={{ color: NAVY }}
          >
            Racking Built For
            <br />
            <span style={{ color: "#3d5078" }}>Every Kind of Storage Floor</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[34rem] text-[1.1rem] leading-[1.6] text-[#5b6478]">
            Proven expertise. Trusted solutions.
            <br />
            Load-rated steel racks for the way each industry stores, picks and moves.
          </p>
        </div>

        <div className="relative mx-auto mt-14 grid max-w-[900px] grid-cols-2 gap-5 max-[560px]:grid-cols-1 lg:mt-16 lg:block lg:aspect-[883/450]">
          <Connectors />
          {industries.map((item) => (
            <IndustryCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}