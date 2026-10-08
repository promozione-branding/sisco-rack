const NAVY = "#0b1a40"
const BLUE = "#2563c9"
const BLUE_TINT = "#e6effc"
const YELLOW = "#e0a400"
const YELLOW_TINT = "#fdf3d6"

const BOARD_W = 1126
const BOARD_H = 498

const SIDE_IMAGES = {
  left: "/testimonial_1.webp",
  top: "/testimonial_2.webp",
  middle: "/testimonial_3.webp",
  bottom: "/testimonial_2.webp",
}

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

const industries = [
  { n: "01", label: "Warehouses & Logistics", icon: "warehouse", tone: "blue", img: "/Warehouse.webp", x: 178, y: 1, w: 311, h: 138 },
  { n: "02", label: "E-commerce & Fulfilment", icon: "package", tone: "yellow", img: "/Packaging.webp", x: 624, y: 1, w: 284, h: 138 },
  { n: "03", label: "Retail & Supermarkets", icon: "retail", tone: "blue", img: "/supermarket_rack_use.webp", x: 0, y: 177, w: 307, h: 138 },
  { n: "04", label: "Manufacturing Plants", icon: "factory", tone: "yellow", img: "/manufacturing_plants_use.webp", x: 394, y: 177, w: 317, h: 138 },
  { n: "05", label: "Cold Storage & Food Processing", icon: "snowflake", tone: "blue", img: "/food_processing.webp", x: 801, y: 177, w: 308, h: 138 },
  { n: "06", label: "Pharma & Healthcare", icon: "pharma", tone: "yellow", img: "/pharma.webp", x: 225, y: 358, w: 282, h: 140 },
  { n: "07", label: "Automotive & Workshops", icon: "wrench", tone: "blue", img: "/automative.webp", x: 577, y: 358, w: 324, h: 140 },
]

const routes = [
  { d: "M489 79H620", arrow: true },
  { d: "M178 82C130 82 99 116 99 168", arrow: true },
  { d: "M335 140C335 190 352 215 391 215", arrow: true },
  { d: "M908 82C955 82 981 112 981 170" },
  { d: "M711 235C760 235 782 255 801 285" },
  { d: "M426 316C426 340 300 330 300 358" },
  { d: "M120 316C120 345 225 340 225 410" },
]

const pct = (v, total) => `${((v / total) * 100).toFixed(3)}%`

const shapeMask = (d) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='${d}' fill='#000'/></svg>`
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  return {
    WebkitMaskImage: url,
    maskImage: url,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }
}

const LEFT_SHAPE = "M0 0 L30 0 C62 18 100 36 100 58 C100 74 90 88 82 100 L0 100 Z"
const LEFT_HALO = "M0 0 L36 0 C72 18 108 36 108 58 C108 76 97 90 89 100 L0 100 Z"
const TOP_SHAPE = "M22 0 C6 25 0 55 0 100 L100 80 L100 0 Z"
const MIDDLE_SHAPE = "M0 22 L100 2 L100 90 L0 98 Z"
const BOTTOM_SHAPE = "M14 4 L100 0 L100 83 C70 72 8 52 14 4 Z"

function Chevron({ color }) {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(20,30,70,0.18)]"
      style={{ color }}
    >
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M3.5 1.5L7 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function IndustryCard({ item }) {
  const isBlue = item.tone === "blue"
  const accent = isBlue ? BLUE : YELLOW
  const tint = isBlue ? BLUE_TINT : YELLOW_TINT
  const numberColor = isBlue ? "#a9c3f1" : "#f2c44c"

  return (
    <div
      className="group relative min-h-[132px] rounded-[10px] bg-white shadow-[0_10px_28px_-10px_rgba(20,30,70,0.25),0_1px_3px_rgba(20,30,70,0.08)] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:h-[var(--h)] lg:min-h-0 lg:w-[var(--w)]"
      style={{
        borderLeft: `4px solid ${accent}`,
        "--l": pct(item.x, BOARD_W),
        "--t": pct(item.y, BOARD_H),
        "--w": pct(item.w, BOARD_W),
        "--h": pct(item.h, BOARD_H),
      }}
    >
      <img
        src={item.img}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -right-[3%] -top-[14%] left-[50%] z-10 h-[96%] w-[50%] object-contain object-right-bottom drop-shadow-[0_14px_14px_rgba(15,25,60,0.35)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03] w-auto"
      />
      <div className="relative z-20 flex h-full max-w-[56%] flex-col justify-center gap-2.5 px-5 py-4 lg:px-[6%] lg:py-0">
        <div className="flex items-center gap-3">
          <span
            className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full [&_svg]:h-7 [&_svg]:w-7"
            style={{ background: tint, color: accent }}
          >
            {icons[item.icon]}
          </span>
          <span className="font-display text-[2.5rem] font-extrabold leading-none tracking-tight" style={{ color: numberColor }}>
            {item.n}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="max-w-[10rem] text-[0.75rem] font-bold leading-snug" style={{ color: NAVY }}>
            {item.label}
          </span>
          <Chevron color={accent} />
        </div>
      </div>
    </div>
  )
}

function Connectors() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox={`0 0 ${BOARD_W} ${BOARD_H}`}
    >
      <defs>
        <marker id="industry-arrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0 0.5L8 4.5L0 8.5z" fill={YELLOW} />
        </marker>
      </defs>
      {routes.map((r) => (
        <path key={`t-${r.d}`} d={r.d} fill="none" stroke="#e3e7ee" strokeWidth="14" strokeLinecap="round" />
      ))}
      {routes.map((r) => (
        <path
          key={`d-${r.d}`}
          d={r.d}
          fill="none"
          stroke="#f2b705"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="9 7"
          markerEnd={r.arrow ? "url(#industry-arrow)" : undefined}
        />
      ))}
    </svg>
  )
}

function SideImages() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[25%] bg-white/55 min-[1200px]:block"
        style={shapeMask(LEFT_HALO)}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[24%] bg-cover bg-bottom min-[1200px]:block"
        style={{ backgroundImage: `url(${SIDE_IMAGES.left})`, ...shapeMask(LEFT_SHAPE) }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-[37%] w-[19.5%] bg-cover bg-center min-[1200px]:block"
        style={{ backgroundImage: `url(${SIDE_IMAGES.top})`, ...shapeMask(TOP_SHAPE) }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[32%] hidden h-[27%] w-[19.5%] bg-cover bg-center min-[1200px]:block"
        style={{ backgroundImage: `url(${SIDE_IMAGES.middle})`, ...shapeMask(MIDDLE_SHAPE) }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[58%] hidden h-[36%] w-[16%] bg-cover bg-center min-[1200px]:block"
        style={{ backgroundImage: `url(${SIDE_IMAGES.bottom})`, ...shapeMask(BOTTOM_SHAPE) }}
      />
    </>
  )
}

export default function IndustriesServed() {
  return (
    <section
      className="relative overflow-hidden py-20 max-[720px]:py-12"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, #ffffff 0%, #f3f6fb 55%, #e9eef6 100%)",
      }}
    >
      <SideImages />

      <div className="relative z-10 mx-auto max-w-[1200px] px-14 max-[960px]:px-10 max-[720px]:px-5">
        <div className="text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[0.9rem] font-bold uppercase tracking-[0.12em] shadow-[0_8px_22px_-8px_rgba(20,30,70,0.28)]"
            style={{ color: NAVY }}
          >
            {icons.pin}
            Industries we serve
          </span>

          <h2
            className="mt-6 font-display text-[3.6rem] font-extrabold leading-[1.05] tracking-tight max-[720px]:text-[2.4rem]"
            style={{ color: NAVY }}
          >
            Racking Built For
            <br />
            <span style={{ color: "#2c4b8f" }}>Every Kind of Storage Floor</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[40rem] text-[1.1rem] leading-[1.6] text-[#5b6478]">
            Proven expertise. Trusted solutions.
            <br />
            Load-rated steel racks for the way each industry stores, picks and moves.
          </p>
        </div>

        <div className="relative mx-auto mt-14 grid max-w-[1126px] grid-cols-2 gap-5 max-[560px]:grid-cols-1 lg:mt-14 lg:block lg:aspect-[1126/498]">
          <Connectors />
          {industries.map((item) => (
            <IndustryCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}