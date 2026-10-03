"use client"

import Link from "next/link"

export default function SplitButton({
  href,
  children,
  dark = false,
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ...props
}) {
  const classes = `group/split inline-flex items-stretch overflow-hidden rounded-[14px] font-semibold ${dark ? "bg-ink text-white" : "bg-white text-ink"} ${className}`

  const content = (
    <>
      <span className="px-6 py-3.5">{children}</span>
      <span className="grid w-[54px] place-items-center bg-safety text-ink transition-[width] duration-[250ms] group-hover/split:w-[68px]" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 4l8 8M12 5v7H5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  )
}