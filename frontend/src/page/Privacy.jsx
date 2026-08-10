import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaChevronRight } from "react-icons/fa";

const Privacy = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-300 font-sans relative overflow-hidden pb-24">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3"></div>

      <div className="max-w-[900px] mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl mb-6 text-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <FaShieldAlt size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Policy</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            At Accenlearn, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[32px] p-8 md:p-14 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          
          <div className="space-y-12">
            
            {/* Section 1 */}
            <section className="group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/20">01</span>
                Information We Collect
              </h2>
              <div className="pl-11 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                <p><strong className="text-gray-200">Personal Information:</strong> We may collect personal information, such as your name, email address, contact details, and other identifiers when you register for an account, apply for courses, or use our services.</p>
                <p><strong className="text-gray-200">Usage Data:</strong> We collect information about your interactions with our website, including your IP address, browser type, pages visited, and the date and time of your visits.</p>
                <p><strong className="text-gray-200">Payment Information:</strong> If you make payments for our services, we may collect payment card details or other financial information to process transactions.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Section 2 */}
            <section className="group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-sm border border-indigo-500/20">02</span>
                How We Use Your Information
              </h2>
              <div className="pl-11 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                <p><strong className="text-gray-200">Provide Services:</strong> We use your information to provide, maintain, and improve our services, including course registration, placement services, and customer support.</p>
                <p><strong className="text-gray-200">Communications:</strong> We may use your email address to send you important updates, newsletters, and promotional materials. You can opt-out of marketing communications at any time.</p>
                <p><strong className="text-gray-200">Analytics:</strong> We use data analytics to analyze website usage patterns, improve our content and services, and customize your experience.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Section 3 */}
            <section className="group">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/20">03</span>
                Information Sharing
              </h2>
              <div className="pl-11 space-y-4 text-gray-400 leading-relaxed text-sm md:text-base">
                <p>We may share your information with third parties in the following circumstances:</p>
                <p><strong className="text-gray-200">Service Providers:</strong> We may disclose your information to trusted third-party service providers who assist us in operating our website and providing our services.</p>
                <p><strong className="text-gray-200">Legal Compliance:</strong> We may share your information to comply with legal obligations, respond to legal requests, or protect our rights, privacy, safety, or property.</p>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Minor Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <section className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <h2 className="text-lg font-bold text-white mb-3">Security</h2>
                <p className="text-sm text-gray-400 leading-relaxed">We employ reasonable security measures to protect your personal information. However, no data transmission over the internet or storage system is completely secure, and we cannot guarantee absolute security.</p>
              </section>

              <section className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <h2 className="text-lg font-bold text-white mb-3">Your Choices</h2>
                <p className="text-sm text-gray-400 leading-relaxed">You can review and update your personal information by logging into your account, opt-out of marketing communications, or disable cookies in your browser settings (this may affect functionality).</p>
              </section>

              <section className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <h2 className="text-lg font-bold text-white mb-3">Children's Privacy</h2>
                <p className="text-sm text-gray-400 leading-relaxed">Our services are not intended for children under 13. We do not knowingly collect personal information from children. Contact us immediately if you believe a child has provided us with personal data.</p>
              </section>

              <section className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <h2 className="text-lg font-bold text-white mb-3">Changes to Policy</h2>
                <p className="text-sm text-gray-400 leading-relaxed">We may update this Privacy Policy for operational, legal, or regulatory reasons. We will notify you of any material changes by posting the revised policy on our website.</p>
              </section>
            </div>
            
            {/* Contact Support */}
            <section className="mt-8 p-6 md:p-8 bg-blue-900/20 border border-blue-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Have Questions?</h2>
                <p className="text-sm text-gray-400">If you have concerns about our data practices, our team is here to help.</p>
              </div>
              <a href="mailto:support@Accenlearn.com" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] whitespace-nowrap">
                Contact Support
              </a>
            </section>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in duration-1000 delay-300">
          <Link to="/" className="w-full md:w-auto text-center px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-sm transition-all border border-white/5">
            Back to Home
          </Link>
          <div className="flex gap-4 w-full md:w-auto">
            <Link to="/Terms" className="flex-1 md:flex-none text-center px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 text-gray-300 hover:text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group">
              Terms of Service <FaChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
            <Link to="/RefundPolicy" className="flex-1 md:flex-none text-center px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 text-gray-300 hover:text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group">
              Refund Policy <FaChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
