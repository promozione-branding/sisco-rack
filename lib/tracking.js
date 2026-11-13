const TRACKING_API = "https://brandbnalo.com/api/tracking/create"

// Set your default supplier token here
const DEFAULT_SUPPLIER_TOKEN =
  process.env.NEXT_PUBLIC_SUPPLIER_TOKEN || "6adc42d8755e2e90adbbad2b"

const getWebsiteUrl = () => {
  if (typeof window === "undefined") return "" // SSR safety for Next.js
  return window.location.hostname + window.location.pathname
}

export const trackEvent = ({
  eventType,
  obj = null,
  source,
  supplierToken,
}) => {
  const payload = {
    productId: obj?.name || "N/A",
    supplierToken: supplierToken || obj?.supplierToken || DEFAULT_SUPPLIER_TOKEN,
    eventType,
    source: source || getWebsiteUrl(),
  }

  if (!payload.supplierToken) {
    console.warn("Tracking: supplierToken missing")
    return
  }

  // Fire and forget - no blocking navigation
  fetch(TRACKING_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error) => {
    console.error("Tracking Error:", error)
  })
}

// Call tracking
export const handleCallClick = ({ obj = null, source, supplierToken } = {}) => {
  trackEvent({ eventType: "call_click", obj, source, supplierToken })
}

// WhatsApp tracking
export const handleWhatsappClick = ({ obj = null, source, supplierToken } = {}) => {
  trackEvent({ eventType: "whatsapp_click", obj, source, supplierToken })
}