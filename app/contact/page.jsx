import PageHead from "@/components/PageHead"
import ContactForm from "@/components/ContactForm"
import Map from "@/components/Map"
import { pageSeo } from "@/lib/seo"

export const metadata = { title: pageSeo.contact.title, description: pageSeo.contact.description }

export default function Contact() {
  return (
    <>
      <PageHead 
  title="Contact" 
  text="Get in touch with us."
  backgroundImage="/testimonial_6.webp"
/>
      <ContactForm />
      <Map/>
    </>
  )
}
