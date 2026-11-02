export default function LocationMap({
  address = "GALI NO-1, 41-B, BHAGAT VIHAR, KARAWAL NAGAR, New Delhi, Delhi, 110094",
  title = "Rackwell Steel location",
  zoom = 15,
  height = 450,
}) {
  const query = encodeURIComponent(address)
  const src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.9600940430405!2d77.26067077496!3d28.72073858007065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cff87da0efa3b%3A0xd7ca882078f92ee3!2sSisco%20Steel%20Products!5e0!3m2!1sen!2sin!4v1793432336429!5m2!1sen!2sin%22`
  const viewUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`

  return (
    <section className="mx-auto w-[90%] py-12">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Find us</h2>
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 underline-offset-4 transition hover:text-blue-700 hover:underline"
          >
            {address}
          </a>
        </div>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Get directions
        </a>
      </div>

      <div className="w-full overflow-hidden rounded-3xl">
        <iframe
          title={title}
          src={src}
          width="100%"
          height={height}
          style={{ border: 0, display: "block" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}