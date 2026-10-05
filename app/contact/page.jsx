import PageHead from "@/components/PageHead"
import ContactForm from "@/components/ContactForm"

export const metadata = { title: "Contact | Rackwell Steel" }

export default function Contact() {
  return (
    <>
      <PageHead 
  title="Contact" 
  text="Get in touch with us."
  backgroundImage="/testimonial_6.png"
/>
      <ContactForm />
    </>
  )
}
