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
  const classes = `split ${dark ? "dark" : ""} ${className}`

  const content = (
    <>
      <span className="split-label">{children}</span>
      <span className="split-arrow" aria-hidden="true">
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