import sharp from "sharp"
import fs from "fs"

sharp.cache(false) // don't keep file handles open (helps on Windows)

const file = "public/sisco_logo_transparent.webp"

const input = fs.readFileSync(file)            // read into memory
const output = await sharp(input)
  .resize({ width: 200 })
  .webp({ quality: 80 })
  .toBuffer()

fs.writeFileSync(file, output)                 // overwrite directly
console.log("done", (output.length / 1024).toFixed(1) + " KiB")