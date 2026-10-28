
const ENDPOINT = "https://brandbnalo.com/api/form/add"

const PLATFORM = "Sisco steel Products"
const SUPPLIER_TOKEN = "6adc42d8755e2e90adbbad2b"
const PLATFORM_EMAIL = "info.siscosteel@gmail.com"

export const PHONE_ERROR = "Enter a valid 10-digit phone number"
export const GENERIC_ERROR = "Something went wrong. Please try again."

// Lightweight replacement for axios.post: throws on non-2xx like axios does.
export async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
  return res.json().catch(() => null)
}

export const isValidPhone = (phone) => /^\d{10}$/.test(phone || "")


export async function submitEnquiry({ name, phone, email, product, message, place }) {
  const payload = {
    platform: PLATFORM,
    supplierToken: SUPPLIER_TOKEN,
    platformEmail: PLATFORM_EMAIL,
    name: (name || "").trim(),
    phone: (phone || "").trim(),
    email: (email || "").trim(),
    product: (product || "").trim(),
    message: (message || "").trim(),
    place: (place || "").trim() || "N/A",
  }

  if (!isValidPhone(payload.phone)) throw new Error(PHONE_ERROR)

  try {
    return await postJson(ENDPOINT, payload)
  } catch (err) {
    console.error(err)
    throw new Error(GENERIC_ERROR)
  }
}