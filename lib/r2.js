import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { randomUUID } from "crypto"

let client
export const getR2 = () =>
  (client ||= new S3Client({
    region: "auto",
    endpoint: process.env.CLOUD_FLARE_R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.CLOUD_FLARE_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUD_FLARE_SECRET_ACCESS_KEY,
    },
  }))

const BUCKET = () => process.env.CLOUD_FLARE_R2_BUCKET
const PUBLIC_URL = () => (process.env.CLOUD_FLARE_R2_PUBLIC_URL || "").replace(/\/$/, "")

const extFor = (name = "", type = "") => {
  const fromName = name.includes(".") ? name.split(".").pop().toLowerCase() : ""
  if (/^[a-z0-9]{2,5}$/.test(fromName)) return fromName
  return (type.split("/")[1] || "jpg").replace("jpeg", "jpg").replace(/[^a-z0-9]/g, "")
}

export async function uploadImage(buffer, { folder = "sisco", contentType = "image/jpeg", fileName = "" } = {}) {
  const key = `${folder}/${randomUUID()}.${extFor(fileName, contentType)}`
  await getR2().send(
    new PutObjectCommand({
      Bucket: BUCKET(),
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  )
  return { url: `${PUBLIC_URL()}/${key}`, key }
}

export async function deleteImage(key) {
  if (!key) return
  try {
    await getR2().send(new DeleteObjectCommand({ Bucket: BUCKET(), Key: key }))
  } catch (e) {
    console.error("R2 delete failed:", e.message)
  }
}