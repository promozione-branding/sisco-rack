
"use client"
export default function TermsAndConditionsPage() {
  const sections = [
    {
      title: "1. Introduction",
      content: (
        <p>
          Welcome to <strong>Sisco Steel Products</strong>. By accessing or
          using our website, you agree to comply with the following Terms
          and Conditions. Established in 2015, we specialize in
          manufacturing Slotted Angle Racks, Supermarket Racks,
          Heavy-Duty Racks, and Mezzanine Floors for industrial,
          commercial, retail, and storage applications. Please read
          these terms carefully before using our website or services.
        </p>
      ),
    },
    {
      title: "2. Products and Services",
      content: (
        <>
          <p>
            Sisco Steel Products offers a range of steel storage and
            infrastructure solutions, including:
          </p>
          <ul>
            <li>Slotted Angle Racks</li>
            <li>Supermarket Racks</li>
            <li>Heavy-Duty Racks</li>
            <li>Mezzanine Floors</li>
            <li>Other industrial and commercial storage solutions</li>
          </ul>
          <p>
            Product specifications, designs, dimensions, finishes, and
            configurations may vary depending on customer requirements
            and manufacturing availability.
          </p>
        </>
      ),
    },
    {
      title: "3. Product Information",
      content: (
        <ul>
          <li>
            We make reasonable efforts to ensure that product descriptions,
            images, specifications, and details displayed on our website
            are accurate.
          </li>
          <li>
            Actual product appearance, colour, dimensions, or finish may
            vary slightly from website images.
          </li>
          <li>
            Customers are advised to confirm technical specifications and
            product requirements before placing an order.
          </li>
        </ul>
      ),
    },
    {
      title: "4. Pricing and Quotations",
      content: (
        <ul>
          <li>
            Product prices and quotations are subject to change without
            prior notice.
          </li>
          <li>
            Final pricing depends on product specifications, dimensions,
            material requirements, quantity, and customization.
          </li>
          <li>
            Transportation, installation, taxes, and other applicable
            charges may be quoted separately.
          </li>
          <li>
            A quotation shared with a customer is subject to its stated
            validity period and applicable terms.
          </li>
        </ul>
      ),
    },
    {
      title: "5. Orders and Confirmation",
      content: (
        <ul>
          <li>
            Orders are accepted after confirmation of product details,
            specifications, quantity, and payment terms.
          </li>
          <li>
            Customers must provide accurate contact, billing, and delivery
            information.
          </li>
          <li>
            Bulk and customized orders may require additional confirmation
            and processing time.
          </li>
          <li>
            We reserve the right to decline or cancel an order where
            necessary due to availability or other valid business reasons.
          </li>
        </ul>
      ),
    },
    {
      title: "6. Payment Terms",
      content: (
        <ul>
          <li>
            Payment terms will be communicated during the quotation
            and order confirmation process.
          </li>
          <li>
            Customers are required to make payments according to the
            mutually agreed terms.
          </li>
          <li>
            Manufacturing or dispatch may be subject to receipt of the
            agreed advance or full payment.
          </li>
          <li>
            Any applicable taxes and additional charges will be
            communicated during order processing.
          </li>
        </ul>
      ),
    },
    {
      title: "7. Shipping and Delivery",
      content: (
        <ul>
          <li>
            Delivery timelines depend on product type, order quantity,
            customization, and delivery location.
          </li>
          <li>
            We make reasonable efforts to deliver products within the
            estimated timeline communicated to customers.
          </li>
          <li>
            Delays due to transportation, weather, or other unforeseen
            circumstances may occur.
          </li>
          <li>
            Customers are responsible for arranging appropriate unloading
            facilities wherever required.
          </li>
        </ul>
      ),
    },
    {
      title: "8. Returns, Refunds and Cancellations",
      content: (
        <p>
          Returns, refunds, replacements, and order cancellations are
          governed by our separate Return & Refund Policy. Customers are
          requested to review that policy before placing an order.
        </p>
      ),
    },
    {
      title: "9. Warranty and Product Usage",
      content: (
        <ul>
          <li>
            Any warranty or product guarantee will be provided only
            where specifically agreed and communicated at the time of sale.
          </li>
          <li>
            Products must be installed and used according to the
            recommended specifications and safety guidelines.
          </li>
          <li>
            Damage caused by improper installation, overloading,
            misuse, or unauthorized modification may not be covered
            under applicable warranty terms.
          </li>
          <li>
            Customers should ensure that racks and storage systems are
            used within their specified load-bearing capacity.
          </li>
        </ul>
      ),
    },
    {
      title: "10. Customer Responsibilities",
      content: (
        <ul>
          <li>
            Customers must provide accurate product requirements and
            delivery details.
          </li>
          <li>
            Customers should verify product specifications before
            confirming their orders.
          </li>
          <li>
            Proper handling, unloading, installation, and maintenance
            of products are the customer's responsibility unless
            otherwise agreed.
          </li>
          <li>
            Customers must follow all relevant safety instructions
            while using our storage products.
          </li>
        </ul>
      ),
    },
    {
      title: "11. Intellectual Property",
      content: (
        <p>
          All website content, including text, images, graphics, logos,
          product descriptions, and other materials, belongs to
          Sisco Steel Products or its respective owners. No content
          may be copied, reproduced, distributed, or used for
          commercial purposes without prior written permission.
        </p>
      ),
    },
    {
      title: "12. Limitation of Liability",
      content: (
        <p>
          Sisco Steel Products shall not be held responsible for indirect
          or consequential losses arising from the use of our website
          or products, to the extent permitted by applicable law.
          Nothing in these terms excludes liability that cannot
          legally be excluded.
        </p>
      ),
    },
    {
      title: "13. Third-Party Links",
      content: (
        <p>
          Our website may contain links to third-party websites for
          additional information or services. We do not control and
          are not responsible for the content, availability, or
          privacy practices of these external websites.
        </p>
      ),
    },
    {
      title: "14. Privacy Policy",
      content: (
        <p>
          Your use of our website is also subject to our Privacy Policy,
          which explains how we collect, use, and protect your personal
          information.
        </p>
      ),
    },
    {
      title: "15. Changes to Terms and Conditions",
      content: (
        <p>
          Sisco Steel Products reserves the right to modify or update
          these Terms and Conditions whenever necessary. Updated
          terms will be published on this page. Continued use of
          our website after changes are published constitutes
          acceptance of the revised terms, subject to applicable law.
        </p>
      ),
    },
    {
      title: "16. Governing Law and Jurisdiction",
      content: (
        <p>
          These Terms and Conditions shall be governed by the laws
          of India. Any disputes arising in connection with these
          terms shall be subject to the jurisdiction of the
          competent courts in the applicable jurisdiction.
        </p>
      ),
    },
  ];

  return (
    <main className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 mt-10">
    

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-5">
            Terms & Conditions
          </h1>

          <div className="w-20 h-1 bg-orange-500 rounded-full mb-6"></div>

          <p className="text-gray-600 leading-8">
            Welcome to <strong>Sisco Steel Products</strong>. These Terms
            and Conditions govern your access to and use of our website,
            products, and services. By visiting our website or making
            an enquiry or purchase, you acknowledge that you have read
            and understood these terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-9">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                {section.title}
              </h2>

              <div className="policy-content text-gray-600 leading-8 space-y-3">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <section className="mt-12 bg-slate-50 border-l-4 border-orange-500 rounded-r-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            17. Contact Us
          </h2>

          <p className="text-gray-600 leading-8 mb-5">
            If you have any questions or concerns regarding these
            Terms and Conditions, please contact us:
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

      <style jsx>{`
        .policy-content :global(ul) {
          list-style-type: disc;
          padding-left: 24px;
          margin-top: 12px;
        }

        .policy-content :global(li) {
          padding-left: 5px;
          margin-bottom: 8px;
        }
      `}</style>
    </main>
  );
}
