import Link from "next/link"

export default function SplitButton({ href, children, dark = false }) {
  return (
    <Link href={href} className={`split ${dark ? "dark" : ""}`}>
      <span className="split-label">{children}</span>
      <span className="split-arrow" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 5v7H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}