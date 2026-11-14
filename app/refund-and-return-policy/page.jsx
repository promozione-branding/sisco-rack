

export default function ReturnRefundPolicyPage() {
  const sections = [
    {
      title: "1. Returns Eligibility",
      intro: "Returns are only accepted in the following cases:",
      points: [
        "Product received is damaged during transit.",
        "Product delivered is incorrect or not as per order specifications.",
      ],
      outro:
        "The return request must be raised within 24–48 hours of delivery, along with supporting photographs or videos.",
    },
    {
      title: "2. Non-Returnable Items",
      points: [
        "Products that have been used, installed, or altered.",
        "Customized or made-to-order steel racks and storage solutions.",
        "Products damaged due to improper handling after delivery.",
        "Products returned without prior approval from our team.",
      ],
    },
    {
      title: "3. Return Process",
      intro: "To initiate a return:",
      points: [
        "Contact us via phone or email within the eligible time frame.",
        "Share your order details along with photos or videos of the issue.",
        "Our team will review the request and verify the reported issue.",
        "Once approved, return or replacement instructions will be provided accordingly.",
      ],
    },
    {
      title: "4. Refund Policy",
      points: [
        "Refunds are processed only after inspection and approval of the returned product.",
        "Once approved, the refund will be initiated within 7–10 business days.",
        "Refunds will be issued through the original payment method or as mutually agreed.",
        "Shipping and handling charges may be non-refundable, depending on the reason for return.",
      ],
    },
    {
      title: "5. Replacement Policy",
      intro: "In case of damaged, defective, or incorrectly supplied products, we may offer:",
      points: [
        "Replacement of the product or affected components.",
        "Repair or service support, depending on the nature of the issue.",
        "A suitable resolution after inspection and verification by our team.",
      ],
    },
    {
      title: "6. Return Shipping",
      points: [
        "If the return is due to our error, such as an incorrect or defective product, we will bear the applicable return shipping cost.",
        "In other cases, return shipping charges may be the responsibility of the customer.",
        "For bulky steel racks and storage systems, return transportation arrangements will be communicated during the approval process.",
      ],
    },
    {
      title: "7. Order Cancellation",
      points: [
        "Orders can be cancelled before dispatch, subject to order status and applicable terms.",
        "Once the product has been dispatched, cancellation requests may not be accepted.",
        "Customized or made-to-order products may not be eligible for cancellation once manufacturing has started.",
        "Approved refunds for cancelled orders will be processed through the applicable payment method.",
      ],
    },
    {
      title: "8. Important Notes",
      points: [
        "Customers must ensure proper handling, storage, and installation of products as per the provided guidelines.",
        "Any damage or discrepancy must be reported within the specified time frame.",
        "Claims without proper supporting proof, such as photographs or videos, may not be accepted.",
        "All return and replacement requests are subject to inspection and approval by Sisco Steel Products.",
      ],
    },
  ];

  return (
    <main className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-10 mt-10">
         

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-7 mb-5">
            Return & Refund Policy
          </h1>

          <div className="w-20 h-1 bg-orange-500 rounded-full mb-6"></div>

          <p className="text-gray-600 leading-8">
            At <strong>Sisco Steel Products</strong>, we strive to deliver
            high-quality steel storage and infrastructure solutions while
            ensuring customer satisfaction. Established in 2015, we
            specialize in manufacturing Slotted Angle Racks, Supermarket
            Racks, Heavy-Duty Racks, and Mezzanine Floors. Our Return and
            Refund Policy is designed to provide a fair and transparent
            process for handling damaged, defective, or incorrectly
            supplied products.
          </p>
        </div>

        {/* Policy Sections */}
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

        {/* Contact Section */}
        <section className="mt-12 bg-slate-50 border-l-4 border-orange-500 rounded-r-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            9. Contact Us
          </h2>

          <p className="text-gray-600 leading-8 mb-5">
            For any return, refund, replacement, or cancellation-related
            queries, please contact us:
          </p>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Company Name:</strong> Sisco Steel Products
            </p>

            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info.siscosteel@gmail.com"
                className="text-orange-600 hover:underline"
              >
                info.siscosteel@gmail.com
              </a>
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+917629827285"
                className="text-orange-600 hover:underline"
              >
                +91-7629827285
              </a>
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
