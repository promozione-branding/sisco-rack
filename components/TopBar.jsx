import { contact } from "@/lib/contact"

const Phone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
)

const Mail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-in">
        <div className="topbar-links">
          <a href={`tel:${contact.phoneHref}`}>
            <Phone />
            <span>{contact.phone}</span>
          </a>
          <a href={`mailto:${contact.email}`}>
            <Mail />
            <span>{contact.email}</span>
          </a>
        </div>
        <span className="topbar-hours">{contact.hours}</span>
      </div>
    </div>
  )
}