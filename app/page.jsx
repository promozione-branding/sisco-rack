import { pageSeo } from "@/lib/seo"
import Hero from "@/components/Hero"
import Marquee from "@/components/Marquee"
import FeaturedProducts from "@/components/FeaturedProducts"
import WhyChooseUs from "@/components/WhyChooseUs"
import Faq from "@/components/Faq"
import Industries from "@/components/Industries"
import Categories from "@/components/Categories"
import dynamic from "next/dynamic"
import QueryForm from "@/components/QueryForm"
import Cta from "@/components/Cta"
import OurStory from "@/components/OurStory"
import AboutUsHome from "@/components/AboutUsHome"
import { homeAbout } from "@/lib/aboutContent"
import SupplyNetwork from "@/components/SupplyNetwork"

const Testimonials = dynamic(() => import("@/components/Testimonials"))

export const metadata = { title: pageSeo.home.title, description: pageSeo.home.description }

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <AboutUsHome {...homeAbout}/>
      <Categories/>
      <Industries/>
      <OurStory/>
      <Cta/>
      <WhyChooseUs />
      <SupplyNetwork />
      <Testimonials/>
      <Faq />
      <QueryForm/>
    </>
  )
}