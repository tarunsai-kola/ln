import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const Dialog = ({ isOpen, onClose, fullname, errorMessage, email, counselor, domain, monthOpted }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-md w-full shadow-2xl text-slate-700">
        {errorMessage ? (
          <div>
            <h2 className="text-xl text-red-500 font-bold mb-2">{errorMessage}</h2>
            <p className="text-sm mt-2 text-slate-500">
              NOTE: if you have any doubt feel free to contact your counselor for more details.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">
              Thank you for registration!
            </h3>
            <h3 className="mb-2 text-green-500 font-bold">
              Welcome to Accenlearn Advance Program!
            </h3>
            <p className="text-slate-600">
              Your advance dashboard access form has been submitted successfully.
            </p>
          </div>
        )}
        <button
          className="bg-red-600 hover:bg-red-500 rounded-md px-6 py-2 text-white mt-6 w-full font-semibold"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

const AdvanceDashboardAccess = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [emailCheckComplete, setEmailCheckComplete] = useState(false);

  const toTitleCase = (value) => {
    if (!value) return "";
    const endsWithSpace = value.endsWith(" ");
    const formatted = value
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    return endsWithSpace ? formatted + " " : formatted;
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [alternativeEmail, setAlternativeEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [branch, setBranch] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [counselor, setCounselor] = useState("");
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [program, setProgram] = useState("");
  const [domain, setDomain] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [modeofpayment, setModeOfPayment] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [internshipstartsmonth, setInternshipStartsMonth] = useState("");
  const [internshipendsmonth, setInternshipEndsMonth] = useState("");
  const [referFriend, setReferFriend] = useState("");
  const [languages, setLanguages] = useState("English");
  
  const [course, setCourse] = useState([]);
  const [lead, setLead] = useState("");
  
  const [monthsToShow, setMonthsToShow] = useState([]);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextMonthYear = currentMonthIndex + 1 > 11 ? currentYear + 1 : currentYear;

    setMonthsToShow([
      `${monthNames[currentMonthIndex]} ${currentYear}`,
      `${monthNames[nextMonthIndex]} ${nextMonthYear}`,
    ]);
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/getadvcourses`);
      setCourse(response.data);
    } catch (error) {
      console.error("There was an error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const navigate = useNavigate();
  const resetForm = () => {
    setFullname(""); setEmail(""); setAlternativeEmail("");
    setCollegeName(""); setBranch(""); setYearOfStudy("");
    setPhone(""); setWhatsAppNumber(""); setCounselor("");
    setProgramPrice(""); setPaidAmount(""); setRemainingAmount("");
    setProgram(""); setDomain(""); setMonthOpted("");
    setModeOfPayment(""); setTransactionId(""); setClearPaymentMonth("");
    setInternshipStartsMonth(""); setInternshipEndsMonth("");
    setReferFriend(""); setLanguages("English");
    setIsEmailVerified(false);
    navigate("/registrationform");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const formData = {
      fullname, email: email.trim(), alternativeEmail: alternativeEmail.trim(),
      collegeName, branch, yearOfStudy, phone, whatsAppNumber, counselor: counselor.trim(),
      programPrice, paidAmount, remainingAmount, program, domain: domain.trim(), monthOpted,
      modeofpayment, transactionId, clearPaymentMonth, internshipstartsmonth, internshipendsmonth,
      referFriend, languages: [languages], lead: lead.trim()
    };

    if (isEmailVerified) {
      try {
        let response = await axios.post(`${API}/advenroll`, formData);
        if (response.status === 200 || response.status === 201) {
          setIsModalOpen(true);
        } else {
          toast.error("Error submitting the form.");
          resetForm();
        }
      } catch (error) {
        let errMessage = "An error occurred.";
        if (error.response) {
          errMessage = error.response.data?.message || error.response.data?.error || "An error occurred while processing your request.";
        } else if (error.request) {
          errMessage = "No response from the server. Please try again later.";
        }
        if (errMessage.toString().toLowerCase().includes("already submitted")) {
          errMessage = "You have already submitted your details.";
        }
        setErrorMessage(errMessage);
        setIsModalOpen(true);
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please enter a valid registered email.");
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = async (e) => {
    const enteredEmail = e.target.value.trim();
    setEmail(enteredEmail);
    setIsEmailVerified(false);
    setEmailCheckComplete(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(enteredEmail)) {
      setIsVerifyingEmail(true);
      try {
        const response = await axios.post(`${API}/verify-transaction-email`, { email: enteredEmail });
        if (response.data.success) {
          setCounselor(response.data.counselor || "");
          setLead(response.data.lead || "");
          setIsEmailVerified(true);
        }
      } catch (error) {
        setCounselor("");
        setLead("");
        setIsEmailVerified(false);
      } finally {
        setIsVerifyingEmail(false);
        setEmailCheckComplete(true);
      }
    } else {
      setCounselor(""); setLead(""); setIsVerifyingEmail(false); setEmailCheckComplete(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 py-10 font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 text-slate-700">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Row 1 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
              <input value={fullname} onChange={(e) => setFullname(toTitleCase(e.target.value))} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2 relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email</label>
              <input value={email} onChange={handleEmailChange} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="email" />
              {isVerifyingEmail && <p className="text-[10px] text-blue-400 absolute -bottom-4 italic">🔍 Checking enrollment...</p>}
              {emailCheckComplete && !isEmailVerified && !isVerifyingEmail && <p className="text-[10px] text-red-500 absolute -bottom-4 font-semibold">⚠️ Email not found.</p>}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">College Email</label>
              <input value={alternativeEmail} onChange={(e) => setAlternativeEmail(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="email" />
            </div>

            {/* Row 2 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">College Name</label>
              <input value={collegeName} onChange={(e) => setCollegeName(toTitleCase(e.target.value))} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Branch/Department</label>
              <input value={branch} onChange={(e) => setBranch(toTitleCase(e.target.value))} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Year of Study</label>
              <select value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors appearance-none">
                <option value="" disabled>Select Year of Study</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Contact No</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="number" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Whatsapp Number</label>
              <input value={whatsAppNumber} onChange={(e) => setWhatsAppNumber(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="number" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Counselor Name</label>
              <input value={counselor} onChange={(e) => setCounselor(toTitleCase(e.target.value))} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="text" />
            </div>

            {/* Row 4 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-orange-500">Program Price (₹)</label>
              <input value={programPrice} onChange={(e) => setProgramPrice(e.target.value)} required className="w-full bg-orange-50 border border-orange-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors" type="number" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Paid Amount (₹)</label>
              <input value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="number" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Remaining Amount (₹)</label>
              <input value={remainingAmount} onChange={(e) => setRemainingAmount(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="number" />
            </div>

            {/* Row 5 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mode of Program</label>
              <select value={program} onChange={(e) => setProgram(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors appearance-none">
                <option value="" disabled>Mode of Program</option>
                <option value="Self-Guided [2 Months – Training & Internship]">Self-Guided [2 Months – Training & Internship]</option>
                <option value="Instructor-Led [2 Months – Training & Internship]">Instructor-Led [2 Months – Training & Internship]</option>
                <option value="Career Advancement [3 Months – Training, Internship & Placement Assistance]">Career Advancement [3 Months – Training, Internship & Placement Assistance]</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Select Opted Domain</label>
              <select value={domain} onChange={(e) => setDomain(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors appearance-none">
                <option value="" disabled>Select Opted Domain</option>
                {course.filter((item) => item.show === true).map((item, idx) => (<option key={idx} value={item.title}>{item.title}</option>))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Select Opted Month</label>
              <select value={monthOpted} onChange={(e) => setMonthOpted(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors appearance-none">
                <option value="" disabled>Select Opted Month</option>
                {monthsToShow.map((month, index) => (<option key={index} value={month}>{month}</option>))}
              </select>
            </div>

            {/* Row 6 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mode of Payment</label>
              <select value={modeofpayment} onChange={(e) => setModeOfPayment(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors appearance-none">
                <option value="" disabled>Mode of Payment</option>
                <option value="RazorPay">RazorPay</option>
                <option value="QR Code">QR Code</option>
                <option value="EaseBuZZ">EaseBuZZ</option>
                <option value="PayPal">PayPal</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Transaction ID</label>
              <input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Due date for clear payment ?</label>
              <input value={clearPaymentMonth} onChange={(e) => setClearPaymentMonth(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors text-slate-500" type="date" />
            </div>
            
            {/* Row 7 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Internship starts month</label>
              <select value={internshipstartsmonth} onChange={(e) => setInternshipStartsMonth(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors appearance-none">
                <option value="" disabled>Internship starts month</option>
                {monthsToShow.map((month, index) => (<option key={index} value={month}>{month}</option>))}
              </select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Internship ends month</label>
              <select value={internshipendsmonth} onChange={(e) => setInternshipEndsMonth(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors appearance-none">
                <option value="" disabled>Internship ends month</option>
                {monthsToShow.map((month, index) => (<option key={index} value={month}>{month}</option>))}
              </select>
            </div>
            
            <div className="hidden lg:block"></div>
          </div>

          <div className="mt-8 pt-4">
            <label className="text-[14px] font-bold text-slate-700 block mb-1">Refer your friends to earn cashback.</label>
            <p className="text-[12px] text-slate-500 mb-3">Provide their Name and Contact Number</p>
            <textarea
              value={referFriend}
              onChange={(e) => setReferFriend(e.target.value)}
              placeholder="Name and Contact Number"
              rows={3}
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-4 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors resize-none"
            ></textarea>
          </div>
          
          <div className="flex flex-col space-y-2 mt-4">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Languages Known</label>
            <select value={languages} onChange={(e) => setLanguages(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-colors appearance-none">
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Kannada">Kannada</option>
              <option value="Telugu">Telugu</option>
              <option value="Tamil">Tamil</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 text-white font-semibold py-3 rounded-md transition-colors duration-200 mt-4 disabled:opacity-50">
            {isSubmitting ? "Submitting..." : "Submit Dashboard Access Form"}
          </button>
        </form>
      </div>

      <Dialog
        isOpen={isModalOpen}
        onClose={closeModal}
        fullname={fullname}
        errorMessage={errorMessage}
        email={email}
        counselor={counselor}
        domain={domain}
        monthOpted={monthOpted}
      />
    </div>
  );
};

export default AdvanceDashboardAccess;
