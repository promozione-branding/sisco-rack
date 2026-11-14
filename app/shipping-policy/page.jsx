
export default function ShippingPolicy() {
  const sections = [
    {
      title: "1. Order Processing",
      points: [
        "All orders are processed after confirmation of payment and order details.",
        "Standard processing time is 2–5 business days, depending on product availability and order requirements.",
        "For bulk orders, customized racks, and large-scale storage solutions, processing time may vary and will be communicated in advance.",
      ],
    },
    {
      title: "2. Shipping & Delivery Time",
      intro:
        "Delivery timelines depend on the delivery location, product type, order quantity, and transportation requirements.",
      points: [
        "Metro Cities: 5–7 business days",
        "Other Locations: 7–14 business days",
      ],
      outro:
        "Remote and rural locations may require additional delivery time. Bulk and customized orders may also have different delivery schedules.",
    },
    {
      title: "3. Shipping Charges",
      intro: "Shipping charges are calculated based on the following factors:",
      points: [
        "Product weight and dimensions",
        "Order quantity and packaging requirements",
        "Delivery location",
        "Mode of transportation",
      ],
      outro:
        "The final shipping cost will be communicated at the time of order confirmation.",
    },
    {
      title: "4. Delivery Method",
      points: [
        "We use reliable logistics partners and transport services to ensure the safe delivery of our steel storage products.",
        "Heavy-duty racks, mezzanine floors, and bulk orders may be transported through specialized freight and cargo services.",
        "Products are packed appropriately to minimize the risk of damage during transportation.",
      ],
    },
    {
      title: "5. Order Tracking",
      points: [
        "Once your order is dispatched, tracking details or transportation information will be shared through phone or email.",
        "Customers can contact our team for updates regarding their shipment and estimated delivery date.",
      ],
    },
    {
      title: "6. Delivery Guidelines",
      points: [
        "The customer or an authorized representative must be available at the delivery location to receive the order.",
        "Proper unloading arrangements, such as labour, forklifts, or other equipment, should be arranged by the customer wherever required.",
        "Customers are advised to inspect the products at the time of delivery for any visible damage or missing components.",
        "Any delivery-related concerns should be reported to our team immediately.",
      ],
    },
    {
      title: "7. Damaged or Delayed Shipments",
      points: [
        "If any product is received damaged, customers must inform us within 24 hours of delivery, along with supporting photographs or videos.",
        "We take appropriate steps to address reported shipping and transit-related issues.",
        "While we strive to ensure timely delivery, delays caused by weather conditions, transportation issues, strikes, or other unforeseen circumstances may occur.",
      ],
    },
    {
      title: "8. Service Availability",
      points: [
        "We currently provide shipping services across India.",
        "For international orders, customers are requested to contact us directly to confirm product availability, shipping charges, and delivery terms.",
      ],
    },
  ];

  return (
    <main className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 mt-10">

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-5">
            Shipping Policy
          </h1>

          <div className="w-20 h-1 bg-orange-500 rounded-full mb-6"></div>

          <p className="text-gray-600 leading-8">
            At <strong>Sisco Steel Products</strong>, we are committed to
            ensuring the safe and timely delivery of our steel storage and
            infrastructure solutions across India. Established in 2015,
            we specialize in manufacturing Slotted Angle Racks, Supermarket
            Racks, Heavy-Duty Racks, and Mezzanine Floors for industrial,
            commercial, retail, and storage applications. This Shipping
            Policy outlines our order processing, shipping methods,
            delivery timelines, and important guidelines.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-9">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                {section.title}
              </h2>

              {section.intro && (
                <p className="text-gray-600 leading-8 mb-3">
                  {section.intro}
                </p>
              )}

              <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-8">
                {section.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {section.outro && (
                <p className="text-gray-600 leading-8 mt-3">
                  {section.outro}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="mt-12 bg-slate-50 border-l-4 border-orange-500 rounded-r-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            9. Contact Us
          </h2>

          <p className="text-gray-600 leading-8 mb-5">
            For any shipping-related queries, delivery updates, or assistance,
            please contact us:
          </p>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Company Name:</strong> Sisco Steel Products
            </p>
            <p>
              <strong>Email:</strong>  info.siscosteel@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +917629827285
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
