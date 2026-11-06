import React, { useState } from "react";
import SharedBreadcrumb from "../../components/SharedBreadcrumb";
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
  const [status, setStatus] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SUBMITTING");
    setErrorMessage("");
    trackEvent("Contact", "Submit", "Contact Form via Web3Forms");

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
          result.message || "Failed to send message. Please try again."
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
    <div className="min-h-screen w-full bg-[#f8fafc] font-sans pt-8 sm:pt-12 pb-24 relative overflow-hidden">
      
      {/* Decorative Background Effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none transform translate-y-1/4 translate-x-1/4"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12">
          <SharedBreadcrumb to="/contact" title="Contact Us" />
          <div className="mt-8 max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-widest uppercase mb-4 border border-blue-100">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
              Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Conversation</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contacts & Connect on Social */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Information Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 group hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                Direct Contacts
              </h3>
              <div className="space-y-6">
                {CONTACT_INFO.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <item.icon size={20} />
                    </div>
                    <div className="pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">{item.type}</p>
                      <p className="text-base font-semibold text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                Follow Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SOCIAL_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
                    aria-label={item.name}
                  >
                    <span className="text-xl">
                      <item.icon />
                    </span>
                    <span className="text-sm font-bold">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden">
              
              {/* Form background decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Send Us a Message</h3>
                <p className="text-sm text-gray-500 font-medium mb-8">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                {status === "SUCCESS" ? (
                  <div className="py-16 px-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm border border-emerald-200">
                      <FaCheckCircle />
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-3">Message Sent!</h4>
                    <p className="text-gray-600 font-medium max-w-md">
                      Thank you for contacting us. We have received your inquiry and will respond to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("IDLE")}
                      className="mt-8 px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {status === "ERROR" && (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-700 text-sm">
                        <FaExclamationCircle className="text-lg flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Unable to Send Message</p>
                          <p className="mt-1 font-medium">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="e.g. John Carter"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-gray-900 font-medium placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-gray-900 font-medium placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Phone Number <span className="text-slate-400 normal-case font-medium">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-gray-900 font-medium placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Inquiry Type <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-gray-900 font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Programs & Training">Programs & Training</option>
                            <option value="Internship Program">Internship Program</option>
                            <option value="Mentorship & Guidance">Mentorship & Guidance</option>
                            <option value="Collaboration / Partnership">Collaboration / Partnership</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us exactly how we can assist you..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-gray-900 font-medium placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "SUBMITTING"}
                        className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {status === "SUBMITTING" ? (
                          <>
                            <FaSpinner className="animate-spin text-lg" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <FaPaperPlane className="text-sm" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;