"use client"

import { useMemo } from "react"
import Lottie from "lottie-react"
import { rackAnimation } from "@/lib/lottie"

export default function LottieIcon({ colors = ["#3E5C76", "#E8A317"], className }) {
  const data = useMemo(() => rackAnimation(colors[0], colors[1]), [colors])
  return <Lottie animationData={data} loop autoplay className={className} aria-hidden="true" />
}
