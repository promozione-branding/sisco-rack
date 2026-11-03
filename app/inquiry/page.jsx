import { pageSeo } from "@/lib/seo"
import { homeAbout } from "@/lib/aboutContent"
import Hero from "@/landing components/Hero"
import Marquee from "@/landing components/Marquee"
import FeaturedProducts from "@/landing components/FeaturedProducts"
import AboutUsHome from "@/landing components/AboutUsHome"
import Categories from "@/landing components/Categories"
import Industries from "@/landing components/Industries"
import OurStory from "@/landing components/OurStory"
import CTA from "@/landing components/Cta"
import WhyChooseUs from "@/landing components/WhyChooseUs"
import Testimonials from "@/landing components/Testimonials"
import QueryForm from "@/landing components/QueryForm"
import StickyContactBar from "@/landing components/StickyContactBar"


export const metadata = { title: pageSeo.home.title, description: pageSeo.home.description }

export default function inquiry() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <AboutUsHome {...homeAbout}/>
      <Categories/>
      {/* <Industries/> */}
      <OurStory/>
       {/* <CTA/>  */}
       <WhyChooseUs /> 
      <Testimonials/>
      {/* <Faq /> */}
      <QueryForm/>
      <StickyContactBar />
    </>
  )
}