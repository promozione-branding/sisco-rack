import PageHead from "@/components/PageHead"
import ContactForm from "@/components/ContactForm"

export const metadata = { title: "Contact | Rackwell Steel" }

export default function Contact() {
  return (
    <>
      <PageHead title="Get a quote" text="Tell us what you store and how you load it. We reply with drawings and a fixed price." />
      <ContactForm />
    </>
  )
}
