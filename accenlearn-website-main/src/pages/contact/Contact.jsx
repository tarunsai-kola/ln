import React, { useState } from "react";
import SharedBreadcrumb from "../../components/SharedBreadcrumb";
import TitleText from "../../components/TitleText";
import { CONTACT_INFO, SOCIAL_ITEMS } from "../../shared/data";
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { trackEvent } from "../../utils/analytics";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [status, setStatus] = useState("IDLE"); // "IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR"
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SUBMITTING");
    setErrorMessage("");
    trackEvent("Contact", "Submit", "Contact Form via Web3Forms");

    // Web3Forms Access Key
    // You can obtain your free access key at https://web3forms.com
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "e1d57508-7ec7-4dac-853f-9113fb8293f3";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          from_name: "Accenlearn Website Contact Form",
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setStatus("SUCCESS");
        trackEvent("Contact", "Success", "Contact Form via Web3Forms");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setStatus("ERROR");
        trackEvent("Contact", "Error", "Contact Form via Web3Forms");
        setErrorMessage(
          result.message ||
            (accessKey === "YOUR_ACCESS_KEY_HERE"
              ? "Please configure your Web3Forms Access Key in your .env file (VITE_WEB3FORMS_ACCESS_KEY)."
              : "Failed to send message. Please try again.")
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("ERROR");
      trackEvent("Contact", "NetworkError", "Contact Form via Web3Forms");
      setErrorMessage("Network error occurred. Please check your internet connection or try again later.");
    }
  };

  return (
    <div className="min-h-screen w-full pt-4 sm:pt-6 pb-16">
      <div className="mx-auto max-w-6xl px-4 space-y-10">
        <SharedBreadcrumb to="/contact" title="Contact" />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts & Connect on Social */}
          <div className="lg:col-span-5 space-y-6">
            <TitleText align="left" title="Stay Connected" description="We’re just a message away." />
            
            <div className="rounded-2xl border border-primary/10 bg-white shadow-md p-6 space-y-4">
              <p className="text-lg font-semibold text-primary">Direct Contacts</p>
              <div className="space-y-3">
                {CONTACT_INFO.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm md:text-base text-gray-700">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
                      <item.icon />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-primary/60">{item.type}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-white shadow-md p-6 space-y-4">
              <p className="text-lg font-semibold text-primary">Connect on Social</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SOCIAL_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-primary/10 bg-primary/5 px-3 py-3 min-h-[48px] text-primary hover:bg-black hover:text-white hover:border-black transition shadow-sm group active:scale-95"
                    aria-label={item.name}
                  >
                    <span className="text-xl group-hover:text-white transition-colors">
                      <item.icon />
                    </span>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Web3Forms Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-primary/10 bg-white shadow-xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-primary">Send Us a Message</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Have a question about our programs, mentorship, or training? Fill out the form below and we will get right back to you.
                </p>
              </div>

              {status === "SUCCESS" ? (
                <div className="py-12 px-6 bg-green-50/80 border border-green-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 animate__animated animate__fadeIn">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                    <FaCheckCircle />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800">Message Sent!</h4>
                  <p className="text-gray-600 max-w-md">
                    Thank you for contacting us. We have received your message and will respond as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("IDLE")}
                    className="mt-4 px-6 py-2.5 min-h-[48px] bg-primary text-white font-semibold rounded-xl hover:bg-secondary transition-all shadow-md active:scale-95 text-sm flex items-center justify-center"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "ERROR" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm animate__animated animate__shakeX">
                      <FaExclamationCircle className="text-lg flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Unable to Send Message</p>
                        <p className="mt-0.5">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 min-h-[48px] text-sm text-gray-800 placeholder-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 min-h-[48px] text-sm text-gray-800 placeholder-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 min-h-[48px] text-sm text-gray-800 placeholder-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 min-h-[48px] text-sm text-gray-800 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Programs & Training">Programs & Training</option>
                        <option value="Internship Program">Internship Program</option>
                        <option value="Mentorship & Guidance">Mentorship & Guidance</option>
                        <option value="Collaboration / Partnership">Collaboration / Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 min-h-[120px] text-sm text-gray-800 placeholder-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "SUBMITTING"}
                    className="w-full sm:w-auto min-w-[200px] min-h-[48px] flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-secondary hover:shadow-secondary/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    {status === "SUBMITTING" ? (
                      <>
                        <FaSpinner className="animate-spin text-base" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FaPaperPlane className="text-xs" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;