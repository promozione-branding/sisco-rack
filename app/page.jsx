import Hero from "@/components/Hero"
import Marquee from "@/components/Marquee"
import FeaturedProducts from "@/components/FeaturedProducts"
import WhyChooseUs from "@/components/WhyChooseUs"
import Faq from "@/components/Faq"
import Industries from "@/components/Industries"
import Categories from "@/components/Categories"
import Testimonials from "@/components/Testimonials"
import QueryForm from "@/components/QueryForm"
import AboutUsSection from "@/components/AboutUsSection"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <Categories/>
      <Industries/>
      <AboutUsSection/>
      <WhyChooseUs />
      <Testimonials/>
      <Faq />
      <QueryForm/>
    </>
  )
}
