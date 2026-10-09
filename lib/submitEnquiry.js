import axios from "axios"

const ENDPOINT = "https://brandbnalo.com/api/form/add"

const PLATFORM = "Sisco steel Products"
const SUPPLIER_TOKEN = "6a266629a0e54917311a8ce5"
const PLATFORM_EMAIL = "info.siscosteel@gmail.com"

export const PHONE_ERROR = "Enter a valid 10-digit phone number"
export const GENERIC_ERROR = "Something went wrong. Please try again."

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
    const { data } = await axios.post(ENDPOINT, payload)
    return data
  } catch (err) {
    console.error(err)
    throw new Error(GENERIC_ERROR)
  }
}