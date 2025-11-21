import React, { useState } from "react";
import { handleError, handleSuccess } from "../Cards/Notification";
import emailjs from "@emailjs/browser";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      handleError("Please fill out all the fields");
      return;
    }

    const templateParams = {
      site_name: "TripMate",
      date: new Date().toLocaleString(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(() => {
        handleSuccess("Message sent successfully!");
      })
      .catch((err) => {
        console.log("EMAILJS ERROR →", err);
        handleError("Failed to send message");
      });
  };

  return (
    <div className="w-full bg-white mt-5" id="contact">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-violet-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out to
            our support team anytime.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>

                <form
                  onSubmit={sendEmail}
                  className="space-y-6"
                  autoComplete="off"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg cursor-pointer  text-white font-medium bg-blue-600"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Email */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="flex shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Email
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        support@tripmate.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="flex shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l2.498 7.493a1 1 0 00.502.684l2.220 1.11a1 1 0 00.548 0l2.22-1.11a1 1 0 00.502-.684l2.498-7.493a1 1 0 00.948-.684h3.28a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Phone
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        +91 (800) 123-4567
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="flex shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100">
                        <svg
                          className="h-6 w-6 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Office
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        123 Travel Street, Delhi, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="flex shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100">
                        <svg
                          className="h-6 w-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Hours
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Mon - Fri: 9AM - 6PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How do I book a trip?",
                a: 'Browse our travel packages, click "Book Now", fill in your details, and proceed to payment. You\'ll receive a confirmation email immediately.',
              },
              {
                q: "Can I cancel my booking?",
                a: "Yes, you can cancel up to 7 days before your trip for a full refund. Contact our support team for cancellation requests.",
              },
              {
                q: "How do I find travel buddies?",
                a: "Browse traveler profiles, check compatibility scores, and send connection requests. Once accepted, you can start planning together!",
              },
              {
                q: "Is my payment secure?",
                a: "Absolutely! We use JWT-protected encryption and partner with trusted payment gateways to ensure your data is safe.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
