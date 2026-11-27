import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SharedBreadcrumb from "../../components/SharedBreadcrumb";
import {
  FaFileContract,
  FaBan,
  FaShieldAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaBalanceScale,
  FaUserShield,
  FaBriefcase,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEnvelope,
  FaPhone,
  FaPrint,
  FaArrowRight,
  FaRegClock,
} from "react-icons/fa";

const Terms = () => {
  const [activeSection, setActiveSection] = useState("refund-policy");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const navSections = [
    { id: "overview", label: "01. Acceptance & Overview" },
    { id: "refund-policy", label: "02. No-Refund & Once-Paid Policy", highlight: true },
    { id: "digital-fulfillment", label: "03. Digital Fulfillment" },
    { id: "account-security", label: "04. Account & Security" },
    { id: "intellectual-property", label: "05. Intellectual Property" },
    { id: "code-of-conduct", label: "06. Code of Conduct" },
    { id: "mentorship-delivery", label: "07. Program & Mentorship" },
    { id: "placement-disclaimer", label: "08. Placement Disclaimer" },
    { id: "certification", label: "09. Certification Criteria" },
    { id: "liability-disclaimer", label: "10. Limitation of Liability" },
    { id: "termination", label: "11. Suspension & Termination" },
    { id: "governing-law", label: "12. Governing Law & Disputes" },
    { id: "contact-support", label: "13. Contact & Redressal" },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] font-sans pb-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[140px] pointer-events-none translate-x-1/3"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 pt-4 sm:pt-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <SharedBreadcrumb to="/terms" title="Terms & Conditions" />
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs tracking-widest uppercase mb-4 shadow-sm">
            <FaFileContract className="text-blue-600" />
            Legal Agreement
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Terms &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Conditions
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Welcome to Accenlearn. These Terms and Conditions constitute a legally binding agreement governing your access to and enrollment in our industry-focused educational programs, workshops, mentorship sessions, and digital learning platforms.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <FaRegClock className="text-blue-600" /> Last Updated: November 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <FaShieldAlt className="text-emerald-600" /> Applicable Globally
            </span>
            {/* <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm transition-all cursor-pointer hover:border-slate-300"
              title="Print Terms"
            >
              <FaPrint className="text-slate-500" /> Print Document
            </button> */}
          </div>
        </div>

        {/* PROMINENT CALLOUT: STRICT NO REFUND NOTICE */}
        {/*
        <div className="mb-14 bg-gradient-to-br from-red-50 via-rose-50 to-amber-50 border-2 border-red-300/80 rounded-3xl p-6 sm:p-10 shadow-lg shadow-red-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
              <FaBan className="text-3xl" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  Critical Notice
                </span>
                <span className="text-red-900 font-black text-lg sm:text-xl tracking-tight">
                  Strict 100% Non-Refundable &amp; Once-Paid Policy
                </span>
              </div>
              <p className="text-red-950/80 text-sm sm:text-base leading-relaxed font-medium">
                All fees, tuition charges, seat reservation deposits, workshop enrollments, and payment installments remitted to Accenlearn are <strong className="text-red-900 font-bold underline decoration-red-400 decoration-2 underline-offset-2">strictly non-refundable and non-transferable under any circumstances once payment is completed</strong>. 
                Immediate digital fulfillment and platform resource provisioning take effect upon enrollment. No exceptions are granted for voluntary withdrawal, scheduling conflicts, lack of attendance, or personal circumstances.
              </p>
            </div>

            <button
              onClick={() => scrollToSection("refund-policy")}
              className="mt-2 md:mt-0 shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
            >
              Read Full Policy <FaArrowRight size={12} />
            </button>
          </div>
        </div>
        */}

        {/* MAIN LAYOUT: Sidebar Nav + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Quick-Jump Table of Contents (Sticky on Large Screens) */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
                <div className="w-2 h-5 bg-blue-600 rounded-full"></div>
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
                  Table of Contents
                </h3>
              </div>

              <nav className="flex flex-col space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {navSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                      activeSection === sec.id
                        ? "bg-blue-600 text-white shadow-sm font-bold"
                        : sec.highlight
                        ? "bg-red-50 text-red-700 hover:bg-red-100 font-bold border border-red-200/60"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span className="truncate">{sec.label}</span>
                    {sec.highlight && (
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        activeSection === sec.id ? "bg-white/20 text-white" : "bg-red-600 text-white"
                      }`}>
                        Strict
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-3">Have questions about our terms?</p>
                <a
                  href="mailto:support@accenlearn.com"
                  className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
                >
                  <FaEnvelope size={12} /> Contact Legal Support
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Legal Content */}
          <main className="lg:col-span-8 space-y-8">
            {/* Section 1 */}
            <article
              id="overview"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200">
                  01
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Agreement &amp; Onboarding
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Acceptance of Terms &amp; Eligibility
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  These Terms and Conditions (&quot;Terms&quot;, &quot;Agreement&quot;) govern your use of the website located at{" "}
                  <strong className="text-slate-900">https://accenlearn.com</strong>, including all subdomains, online portals, student learning management systems (LMS), mobile interfaces, cohorts, technical workshops, and mentorship training services operated by <strong className="text-slate-900">Accenlearn</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
                </p>
                <p>
                  By visiting, browsing, registering an account, making an inquiry, applying for an internship or training cohort, or remitting tuition/workshop fees, you unequivocally acknowledge that you have read, comprehended, and agreed to be legally bound by this Agreement and our Privacy Policy.
                </p>
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" /> Eligibility Requirements:
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                    <li>You must be at least 16 years of age or possess the explicit consent and supervision of a legal parent or guardian.</li>
                    <li>You represent that all information provided during registration (including full legal name, contact email, phone number, and academic background) is complete, accurate, and verifiably truthful.</li>
                    <li>You are solely responsible for ensuring that your participation in Accenlearn programs complies with all local laws and institutional regulations applicable to you.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Section 2: THE STRICT NO-REFUND POLICY */}
            <article
              id="refund-policy"
              className="bg-white rounded-3xl border-2 border-red-300 shadow-md shadow-red-500/5 p-6 sm:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-bl-full pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-red-600/30">
                  02
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                    Financial Policies &amp; Payments
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Strict No-Refund &amp; Once-Paid Policy
                  </h2>
                </div>
              </div>

              <div className="space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
                <div className="p-5 rounded-2xl bg-red-50/90 border border-red-200">
                  <h4 className="font-black text-red-900 text-base mb-2 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-600 shrink-0" />
                    Absolute Non-Refundable Standard
                  </h4>
                  <p className="text-red-950/80 text-xs sm:text-sm leading-relaxed">
                    At Accenlearn, we uphold the highest standard of technical education by curating proprietary curricula, contracting veteran engineering mentors, and allocating high-performance digital laboratory environments. Consequently, <strong className="text-red-950 font-bold">ALL PAYMENTS, COURSE FEES, REGISTRATION DEPOSITS, WORKSHOP CHARGES, AND TUITION AMOUNTS ARE 100% NON-REFUNDABLE AND NON-TRANSFERABLE UNDER ANY CIRCUMSTANCES ONCE PAYMENT HAS BEEN INITIATED OR CONFIRMED.</strong>
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-slate-900 text-base">Key Provisions of the Once-Paid Policy:</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                        1. Immediate Digital Delivery
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The moment payment is approved, our system automatically provisions access to digital learning assets, reserved batch slots, and mentor allocations. This instantaneous delivery constitutes complete fulfillment of our primary service obligation.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                        2. No Voluntary Withdrawal Refunds
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        No refunds, partial reimbursements, credit notes, or roll-over vouchers will be provided if a learner chooses to withdraw, ceases participation, changes their academic priorities, or experiences a change of mind.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                        3. Schedule &amp; Device Conflicts
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Absence from live lectures, scheduling conflicts, lack of study time, personal obligations, or hardware/internet connectivity issues on the student&apos;s end do not qualify for any refund or fee deferral.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                        4. Disciplinary Expulsion
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        If a student is dismissed or their access is terminated due to plagiarism, code of conduct violations, intellectual property theft, or abusive behavior, no refund will be provided.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Installment &amp; EMI Agreements (Deferred Payments):
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If an enrollment is facilitated via an installment plan, educational loan, or third-party NBFC EMI facility, the student remains <strong className="text-slate-900">unconditionally and legally bound</strong> to pay all scheduled installment amounts until the balance is cleared in full. Withdrawing from the course or discontinuing attendance does not waive or nullify your obligation to settle remaining installments.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Taxes, Gateway Deductions &amp; Chargeback Prevention:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    All payment processing charges, banking convenience fees, and applicable government taxes (including GST) are non-refundable. Initiating unauthorized chargebacks or fraudulent transaction disputes with your bank or credit card provider constitutes a material violation of this contract. Accenlearn reserves the right to immediately terminate access and pursue appropriate civil and legal recovery actions for disputed amounts and associated administrative costs.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 3 */}
            <article
              id="digital-fulfillment"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center border border-indigo-200">
                  03
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                    Service Delivery
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Program Access &amp; Digital Fulfillment
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Accenlearn provides digital educational services through live interactive lectures, hands-on workshop modules, curriculum roadmaps, architectural code walkthroughs, and mentorship cohorts across various engineering, management, and healthcare technology tracks.
                </p>
                <p>
                  Upon payment confirmation, students receive admission credentials and batch schedules. Access is granted for the specific batch and duration outlined in the course catalog. Because digital resources and cohort slots are limited and instantaneously allocated, enrollment represents full execution of the enrollment contract.
                </p>
                <p>
                  Accenlearn guarantees that programs will be conducted with reasonable care, skill, and industry diligence. In the rare circumstance that Accenlearn is permanently unable to deliver a scheduled program due to internal operational impediments, an alternate batch placement or prorated accommodation will be offered at Accenlearn&apos;s sole discretion.
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article
              id="account-security"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center border border-purple-200">
                  04
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                    Identity &amp; Credentials
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    User Accounts, Access Credentials &amp; Security
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Each student is granted a personal, single-user license to access the portal and batch materials. You are exclusively responsible for safeguarding your login credentials, passwords, and security tokens.
                </p>
                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
                  <h4 className="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                    <FaUserShield className="text-amber-600" />
                    Strict Ban on Account Sharing &amp; Concurrent Logins:
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed">
                    Sharing, pooling, renting, reselling, or delegating your account credentials to peers, classmates, or third parties is strictly prohibited. Our security systems monitor concurrent sessions, suspicious IP hops, and unauthorized downloads. Any detected credential-sharing will result in immediate permanent expulsion, complete revocation of all certificates, and forfeiture of all fees paid without refund.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 5 */}
            <article
              id="intellectual-property"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200">
                  05
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Proprietary Assets
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Intellectual Property Rights &amp; Anti-Piracy
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  All curriculum materials, live session recordings, architectural blueprints, slide presentations, coding challenges, assignment solutions, assessment question banks, graphics, and trade dress are the exclusive intellectual property of Accenlearn and its licensors.
                </p>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Anti-Piracy &amp; Digital Copyright Enforcement:
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600">
                    <li>You are granted a revocable, non-exclusive, non-transferable, personal license to view materials solely for your own educational edification.</li>
                    <li>You must NOT record, screen-capture, mirror, copy, republish, upload to cloud drives (Google Drive, Dropbox, Mega), share in public forums (Telegram, Discord, Reddit, WhatsApp), or sell any part of our course materials.</li>
                    <li>Violations will be prosecuted vigorously under the Indian Copyright Act, 1957, the Information Technology Act, 2000, and international intellectual property conventions, involving both civil damages and criminal complaints.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Section 6 */}
            <article
              id="code-of-conduct"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center border border-emerald-200">
                  06
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                    Community Standards
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Student Code of Conduct &amp; Community Integrity
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Accenlearn fosters a collaborative, professional, and respectful learning environment. Learners are expected to maintain professional etiquette across all webinars, discussion channels, breakout rooms, and mentor communications.
                </p>
                <p>
                  The following behaviors constitute violations of our Code of Conduct:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {[
                    "Harassment, hate speech, or discrimination based on race, gender, religion, or nationality.",
                    "Disrupting live sessions, spamming chat boards, or advertising commercial products.",
                    "Plagiarism, unauthorized copying of another student's project code, or academic dishonesty.",
                    "Defamatory remarks, libel, or malicious misinformation targeting mentors or peers.",
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Violating this code may lead to immediate disciplinary probation, suspension from live sessions, or permanent expulsion from Accenlearn without any entitlement to a refund.
                </p>
              </div>
            </article>

            {/* Section 7 */}
            <article
              id="mentorship-delivery"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200">
                  07
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Curriculum &amp; Instructors
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Program Delivery, Mentorship &amp; Schedule Updates
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  To keep pace with the rapidly evolving technology landscape (AI, Cloud, Full Stack, Data Science), Accenlearn continually refines syllabi, project specifications, and tooling recommendations.
                </p>
                <p>
                  Accenlearn expressly reserves the right to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                  <li>Reschedule, postpone, or adjust the timing of live sessions or workshops with advance notice to accommodate mentor availability or national holidays.</li>
                  <li>Substitute mentors or instructors with professionals possessing equivalent industry credentials and pedagogical qualifications.</li>
                  <li>Update curriculum modules, frameworks, or project assignments to reflect modern industry practices.</li>
                </ul>
              </div>
            </article>

            {/* Section 8: PLACEMENT DISCLAIMER */}
            <article
              id="placement-disclaimer"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-black text-sm flex items-center justify-center border border-amber-200">
                  08
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                    Career Enablement
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Internship &amp; Placement Assistance Disclaimer
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Accenlearn offers placement assistance services to eligible learners, which may encompass resume polishing, GitHub portfolio reviews, LinkedIn profile enhancement, mock technical interviews, and sharing profiles with hiring partner networks.
                </p>
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                  <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
                    <FaBriefcase className="text-amber-700" />
                    No Guarantee of Job Placement or Remuneration:
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                    <strong className="text-amber-950 font-bold">ACCENLEARN DOES NOT GUARANTEE EMPLOYMENT, SPECIFIC SALARY PACKAGES, INTERVIEW SHORTLISTS, OR PROMOTIONS.</strong> Hiring decisions are made exclusively by third-party recruitment partners based on an applicant&apos;s personal performance, problem-solving skills, background checks, and dynamic macroeconomic hiring conditions. Our role is strictly limited to education, coaching, and talent discovery.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 9 */}
            <article
              id="certification"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200">
                  09
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Credentials &amp; Awards
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Assessment, Evaluation &amp; Certification Criteria
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Accenlearn issues certificates of completion, merit, or internship to participants who satisfy all rigorous academic evaluation criteria established for each program:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-2xl font-black text-blue-600 mb-1">75%+</div>
                    <p className="text-xs font-bold text-slate-900">Live Attendance</p>
                    <p className="text-[11px] text-slate-500 mt-1">Mandatory attendance in live interactive sessions and masterclasses.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-2xl font-black text-indigo-600 mb-1">100%</div>
                    <p className="text-xs font-bold text-slate-900">Capstone Project</p>
                    <p className="text-[11px] text-slate-500 mt-1">Successful submission and defense of practical engineering capstone.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-2xl font-black text-emerald-600 mb-1">Pass</div>
                    <p className="text-xs font-bold text-slate-900">Code Reviews</p>
                    <p className="text-[11px] text-slate-500 mt-1">Passing peer assessments and mentor-evaluated code reviews.</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Accenlearn reserves the right to withhold certificates from individuals who have not met attendance thresholds, have outstanding fee balances, or have engaged in academic malpractice.
                </p>
              </div>
            </article>

            {/* Section 10 */}
            <article
              id="liability-disclaimer"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-black text-sm flex items-center justify-center border border-slate-200">
                  10
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Legal Disclaimers
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Limitation of Liability &amp; Disclaimers
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Our services, platform, content, and materials are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <FaBalanceScale className="text-slate-700" /> Maximum Financial Liability Cap:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    To the maximum extent permitted by applicable law, in no event shall Accenlearn, its directors, officers, employees, mentors, partners, or agents be liable for any indirect, incidental, punitive, special, or consequential damages (including loss of profits, data, career opportunities, or business interruption). In any circumstance, <strong className="text-slate-900">Accenlearn&apos;s aggregate liability for all claims arising out of or related to your enrollment shall be strictly capped at the actual amount paid by you for that specific program</strong>.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 11 */}
            <article
              id="termination"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-black text-sm flex items-center justify-center border border-rose-200">
                  11
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                    Breach &amp; Revocation
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Suspension, Revocation &amp; Termination
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Accenlearn reserves the absolute right to suspend, terminate, or indefinitely deactivate your platform credentials and access to live sessions without notice if:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-600 pl-2">
                  <li>You violate any material provision of these Terms or related policies.</li>
                  <li>You default on any installment or scheduled tuition payment.</li>
                  <li>You engage in piracy, screen recording, unauthorized sharing, or reselling of course materials.</li>
                  <li>You exhibit abusive, disruptive, or harmful conduct towards instructors, mentors, or students.</li>
                </ul>
                <p className="text-xs text-rose-700 font-semibold">
                  Upon termination for cause, all licenses granted herein terminate immediately, and no refund or fee waiver shall be issued.
                </p>
              </div>
            </article>

            {/* Section 12 */}
            <article
              id="governing-law"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200">
                  12
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Legal Jurisdiction
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Governing Law &amp; Dispute Resolution
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  This Agreement, along with all operational policies and dispute procedures, shall be governed by and construed in accordance with the substantive laws of <strong className="text-slate-900">India</strong>, without regard to conflict of law principles.
                </p>
                <p>
                  Any controversy, dispute, or claim arising out of or relating to these Terms or program participation shall initially be submitted to amicable negotiation between the parties. In the event negotiation fails within thirty (30) days, the dispute shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996. The competent courts located in India shall have exclusive jurisdiction over any legal proceedings arising hereunder.
                </p>
              </div>
            </article>

            {/* Section 13 */}
            <article
              id="contact-support"
              className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs uppercase tracking-widest mb-3 border border-blue-400/20">
                    Legal &amp; Grievance Redressal
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    Questions Regarding Our Terms?
                  </h2>
                  <p className="text-slate-300 text-sm max-w-xl font-normal leading-relaxed">
                    If you have questions, require legal clarification, or need administrative verification concerning these Terms, our compliance team is available to assist you.
                  </p>
                  
                  <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm">
                    <a
                      href="mailto:support@accenlearn.com"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl transition-all"
                    >
                      <FaEnvelope className="text-blue-400" /> support@accenlearn.com
                    </a>
                    <a
                      href="tel:+919344322482"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl transition-all"
                    >
                      <FaPhone className="text-emerald-400" /> +91 9344322482
                    </a>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-xs sm:text-sm"
                  >
                    Contact Us <FaArrowRight size={12} />
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/15 transition-all text-xs sm:text-sm"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Terms;
