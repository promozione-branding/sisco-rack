const path = require("path")

module.exports = {
  reactStrictMode: true,
  // Skip Next's legacy polyfill-module (Array.prototype.at/flat/flatMap, Object.fromEntries,
  // Object.hasOwn, trimStart/trimEnd ...). Every browser we target ships these natively.
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.alias["../build/polyfills/polyfill-module"] = path.resolve(__dirname, "lib/empty-polyfill.js")
    }
    return config
  },
  // Old short category URLs -> full category-name URLs
  async redirects() {
    return [
      { source: "/products/slotted", destination: "/products/slotted-angle-racks", permanent: true },
      { source: "/products/mezzanine", destination: "/products/mezzanine-floors", permanent: true },
      { source: "/products/supermarket", destination: "/products/supermarket-racks", permanent: true },
      { source: "/products/heavy", destination: "/products/heavy-duty-racks", permanent: true },
    ]
  },
}
