

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      intro:
        "When you visit our website, contact us, or make an enquiry, we may collect the following information:",
      points: [
        "Name and contact details, including phone number and email address.",
        "Business name and company details, if provided.",
        "Delivery address and location details.",
        "Product enquiries, requirements, and communication details.",
        "Technical information such as browser type, IP address, and website usage data.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      intro: "We may use the collected information for the following purposes:",
      points: [
        "To respond to product enquiries and customer requests.",
        "To provide information about Slotted Angle Racks, Supermarket Racks, Heavy-Duty Racks, and Mezzanine Floors.",
        "To process orders and coordinate product deliveries.",
        "To provide customer support and after-sales assistance.",
        "To improve our website, products, and services.",
        "To communicate important business updates and service-related information.",
      ],
    },
    {
      title: "3. Information Sharing",
      intro:
        "Sisco Steel Products respects your privacy. We do not sell or rent your personal information to third parties.",
      points: [
        "Information may be shared with logistics and transportation partners when required for order delivery.",
        "We may share information with authorized service providers who help us operate our business.",
        "Information may be disclosed when required by applicable laws or legal authorities.",
      ],
    },
    {
      title: "4. Cookies and Website Technologies",
      points: [
        "Our website may use cookies and similar technologies to improve browsing experience.",
        "Cookies may help us understand visitor preferences and website performance.",
        "You can manage or disable cookies through your browser settings. Some website features may not function properly if cookies are disabled.",
      ],
    },
    {
      title: "5. Data Security",
      points: [
        "We take reasonable measures to protect personal information against unauthorized access, misuse, loss, or disclosure.",
        "Access to customer information is limited to authorized personnel and service providers where necessary.",
        "However, no method of internet transmission or electronic storage can be guaranteed to be completely secure.",
      ],
    },
    {
      title: "6. Data Retention",
      points: [
        "We retain personal information only for as long as necessary to fulfil business, customer service, and legal requirements.",
        "Information may be retained for record-keeping, order management, and resolving customer disputes.",
      ],
    },
    {
      title: "7. Third-Party Links",
      points: [
        "Our website may contain links to third-party websites or services.",
        "We are not responsible for the privacy practices, content, or security of external websites.",
        "Visitors are encouraged to review the privacy policies of third-party websites before sharing personal information.",
      ],
    },
    {
      title: "8. Your Privacy Rights",
      intro:
        "Subject to applicable laws, you may contact us to exercise your privacy rights, including:",
      points: [
        "Request access to your personal information.",
        "Request correction of inaccurate or incomplete information.",
        "Request deletion of personal information where legally permissible.",
        "Withdraw consent for certain communications or data processing activities.",
      ],
    },
    {
      title: "9. Changes to This Privacy Policy",
      points: [
        "Sisco Steel Products reserves the right to update or modify this Privacy Policy whenever necessary.",
        "Any changes will be published on this page with the updated policy information.",
        "We encourage visitors to review this page periodically.",
      ],
    },
  ];

  return (
    <main className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 mt-10">

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-5">
            Privacy Policy
          </h1>

          <div className="w-20 h-1 bg-orange-500 rounded-full mb-6"></div>

          <p className="text-gray-600 leading-8">
            At <strong>Sisco Steel Products</strong>, we respect your privacy
            and are committed to protecting the personal information you
            share with us. Established in 2015, we specialize in
            manufacturing Slotted Angle Racks, Supermarket Racks,
            Heavy-Duty Racks, and Mezzanine Floors for industrial,
            commercial, retail, and storage applications.
          </p>

          <p className="text-gray-600 leading-8 mt-3">
            This Privacy Policy explains how we collect, use, store, and
            protect your information when you visit our website or interact
            with our business.
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
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <section className="mt-12 bg-slate-50 border-l-4 border-orange-500 rounded-r-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            10. Contact Us
          </h2>

          <p className="text-gray-600 leading-8 mb-5">
            If you have any questions, concerns, or requests regarding
            this Privacy Policy or your personal information, please
            contact us:
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
