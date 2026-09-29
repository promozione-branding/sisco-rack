import Link from "next/link"
import { brand, links } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h3>{brand}</h3>
            <p style={{ maxWidth: "38ch" }}>Industrial racking and shelving, made to your floor plan and installed by our own crews.</p>
          </div>
          <div>
            <h3>Pages</h3>
            <ul>
              {links.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Reach us</h3>
            <ul>
              <li>sales@rackwellsteel.com</li>
              <li>+1 (555) 014 2290</li>
              <li>Mon to Sat, 8am to 6pm</li>
            </ul>
          </div>
        </div>
        <small>© 2026 {brand}. All rights reserved.</small>
      </div>
    </footer>
  )
}
