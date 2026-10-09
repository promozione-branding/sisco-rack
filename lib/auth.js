import crypto from "crypto"
import { cookies } from "next/headers"

export const makeToken = () =>
  crypto
    .createHash("sha256")
    .update(`${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}:${process.env.SESSION_SECRET}`)
    .digest("hex")

export async function isAdmin() {
  const value = (await cookies()).get("admin")?.value
  return value === makeToken()
}