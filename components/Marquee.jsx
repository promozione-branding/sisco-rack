import { marqueeItems } from "@/lib/data"

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <div
      className="overflow-hidden border-2 border-solid border-ink bg-[#253970] py-3 text-bg max-[720px]:mx-3"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max">
        {row.map((t, i) => (
          <span className="flex items-center gap-14 whitespace-nowrap px-7 font-display text-[1.5rem] font-semibold" key={i}>
            {t}
            <i className="inline-block h-3 w-3 bg-safety" />
          </span>
        ))}
      </div>
    </div>
  )
}