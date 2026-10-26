module.exports = {
  reactStrictMode: true,
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
