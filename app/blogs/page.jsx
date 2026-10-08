import PageHead from "@/components/PageHead"
import ContactForm from "@/components/ContactForm"
import Map from "@/components/Map"
import { pageSeo } from "@/lib/seo"
import BlogPage from "@/components/BlogPage"

export const metadata = { title: pageSeo.blogs.title, description: pageSeo.blogs.description }

export default function Contact() {
  return (
    <>
    <PageHead 
  title="Blogs" 
  text="Insights That Shape Smarter, Safer Storage Spaces"
  backgroundImage="/blog_hero.webp"
/>
      <BlogPage/>
      <Map/>
    </>
  )
}
