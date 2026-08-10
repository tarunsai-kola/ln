import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

const Dialog = ({ isOpen, onClose, fullname, errorMessage, email, counselor, domain, monthOpted }) => {
  if (!isOpen) return null;

  const whatsappMessage = `Hello,\n I am ${fullname}.\n Email: ${email}.\n Domain: ${domain}.\n Opted Month: ${monthOpted}.\n Kindly confirm my details`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-[#111217] border border-gray-700 rounded-lg p-6 max-w-md w-full shadow-2xl text-gray-200">
        {errorMessage ? (
          <div>
            <h2 className="text-xl text-red-500 font-bold mb-2">{errorMessage}</h2>
            <p className="text-sm mt-2 text-gray-400">
              NOTE: if you have any doubt feel free to contact your counselor for more details.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Thank you for registration!
            </h3>
            <h3 className="mb-2 text-green-500 font-bold">
              Welcome to Accenlearn!
            </h3>
            <p className="text-gray-300">
              Your dashboard access form has been submitted successfully.
            </p>
            <div className="mt-4 p-4 bg-[#1a1c23] border-l-4 border-blue-500 rounded text-sm text-gray-300">
              <p>
                <strong>Note:</strong> Please contact your assigned operations executive <br />Bhumika HK <br /> bhumika@accenlearn.org
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-200 w-full justify-center"
              >
                <FaWhatsapp size={20} />
                Contact on WhatsApp
              </a>
            </div>
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

const DashboardAccessForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

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
  const [phone, setPhone] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [counselor, setCounselor] = useState("");
  const [modeofpayment, setModeOfPayment] = useState("");
  const [domain, setDomain] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("");
  const [yearOfPassingOut, setYearOfPassingOut] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [languages, setLanguages] = useState("English");
  const [referFriend, setReferFriend] = useState("");
  
  // Extra fields that were in backend
  const [program, setProgram] = useState(""); // Mode of Program
  const [course, setCourse] = useState([]);
  const [lead, setLead] = useState("");
  
  const [monthsToShow, setMonthsToShow] = useState([]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
    const startMonthIndex = currentDay > 11 ? (currentMonthIndex + 1) : currentMonthIndex;
    const months = [0, 1, 2].map((offset) => {
      const index = (startMonthIndex + offset) % 12;
      const year = currentYear + Math.floor((startMonthIndex + offset) / 12);
      return `${monthNames[index]} ${year}`;
    });
    setMonthsToShow(months);
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/getcourses`);
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
    setFullname(""); setEmail(""); setPhone(""); setWhatsAppNumber("");
    setCounselor(""); setModeOfPayment(""); setDomain(""); setMonthOpted("");
    setProgramPrice(""); setPaidAmount(""); setRemainingAmount(""); setPaymentPlan("");
    setYearOfPassingOut(""); setCompanyName(""); setRole(""); setTotalExperience("");
    setTransactionId(""); setLanguages("English"); setReferFriend(""); setProgram("");
    navigate("/dashboardaccessform");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const formData = {
      fullname, email: email.trim(), phone, whatsAppNumber, counselor: counselor.trim(),
      modeofpayment, domain: domain.trim(), monthOpted, programPrice, paidAmount,
      remainingAmount, paymentPlan, yearOfPassingOut, companyName, role,
      totalExperience, transactionId, languages: [languages], referFriend, program,
      lead: lead.trim()
    };

    if (isEmailVerified) {
      try {
        let response = await axios.post(`${API}/newstudentenroll`, formData);
        if (response.status === 200 || response.status === 201) {
          setIsModalOpen(true);
        } else {
          toast.error("Error submitting the form.");
          resetForm();
        }
      } catch (error) {
        let errMessage = "An error occurred.";
        if (error.response) {
          errMessage = error.response.data?.message || "An error occurred while processing your request.";
        } else if (error.request) {
          errMessage = "No response from the server. Please try again later.";
        }
        if (errMessage.includes("already submitted")) {
          errMessage = "You have already submitted your details.";
        }
        setErrorMessage(errMessage);
        setIsModalOpen(true);
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
    setExistingEnrollment(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(enteredEmail)) {
      setIsCheckingEmail(true);
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
      }

      try {
        const enrollCheck = await axios.get(`${API}/check-existing-enrollment`, { params: { email: enteredEmail } });
        if (enrollCheck.data.exists) {
          setExistingEnrollment(enrollCheck.data);
        } else {
          setExistingEnrollment(false);
        }
      } catch (enrollErr) {
        setExistingEnrollment(false);
      } finally {
        setIsCheckingEmail(false);
      }
    } else {
      setCounselor(""); setLead(""); setExistingEnrollment(null); setIsCheckingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-4 py-10 font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-5xl bg-[#13151A] rounded-2xl shadow-xl border border-gray-800 p-8 md:p-10 text-gray-300">
        
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide text-white">Dashboard Access Form</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Row 1 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name</label>
              <input value={fullname} onChange={(e) => setFullname(toTitleCase(e.target.value))} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2 relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</label>
              <input value={email} onChange={handleEmailChange} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="email" />
              {isCheckingEmail && <p className="text-[10px] text-blue-400 absolute -bottom-4 italic">🔍 Checking enrollment...</p>}
              {!isCheckingEmail && existingEnrollment && <p className="text-[10px] text-orange-400 absolute -bottom-4 font-semibold">⚠️ Already filled this form.</p>}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Contact No</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="number" />
            </div>

            {/* Row 2 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Whatsapp Number</label>
              <input value={whatsAppNumber} onChange={(e) => setWhatsAppNumber(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="number" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Counselor Name</label>
              <input value={counselor} onChange={(e) => setCounselor(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Mode of Payment</label>
              <select value={modeofpayment} onChange={(e) => setModeOfPayment(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="" disabled>Select Mode of Payment</option>
                <option value="RazorPay">RazorPay</option>
                <option value="QR Code">QR Code</option>
                <option value="EaseBuZZ">EaseBuZZ</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Mode of Program</label>
              <select value={program} onChange={(e) => setProgram(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="" disabled>Select Mode of Program</option>
                <option value="Self-Guided [2 Months – Training & Internship]">Self-Guided [2 Months – Training & Internship]</option>
                <option value="Instructor-Led [2 Months – Training & Internship]">Instructor-Led [2 Months – Training & Internship]</option>
                <option value="Career Advancement [3 Months – Training, Internship & Placement Assistance]">Career Advancement [3 Months – Training, Internship & Placement Assistance]</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Opted Domain</label>
              <select value={domain} onChange={(e) => setDomain(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="" disabled>Select Opted Domain</option>
                {course.map((item, idx) => (<option key={idx} value={item.title}>{item.title}</option>))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Opted Month</label>
              <select value={monthOpted} onChange={(e) => setMonthOpted(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="" disabled>Select Opted Month</option>
                {monthsToShow.map((month, index) => (<option key={index} value={month}>{month}</option>))}
              </select>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Program Price (₹)</label>
              <input value={programPrice} onChange={(e) => setProgramPrice(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="number" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Paid Amount (₹)</label>
              <input value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="number" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Remaining Amount (₹)</label>
              <input value={remainingAmount} onChange={(e) => setRemainingAmount(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="number" />
            </div>

            {/* Row 5 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Payment Plan</label>
              <select value={paymentPlan} onChange={(e) => setPaymentPlan(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="" disabled>Select Payment Plan</option>
                <option value="Full Payment">Full Payment</option>
                <option value="Installments">Installments</option>
                <option value="Loan">Loan</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Year of Passing Out</label>
              <input value={yearOfPassingOut} onChange={(e) => setYearOfPassingOut(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Company Name (If working)</label>
              <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="text" />
            </div>

            {/* Row 6 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Role (If working)</label>
              <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Experience (Years)</label>
              <input value={totalExperience} onChange={(e) => setTotalExperience(e.target.value)} className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="text" />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Transaction ID</label>
              <input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" type="text" />
            </div>
            
            {/* Row 7 */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Languages Known</label>
              <select value={languages} onChange={(e) => setLanguages(e.target.value)} required className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Bengali">Bengali</option>
              </select>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-6">
            <label className="text-[14px] font-bold text-gray-300 block mb-1">Refer your friends to earn cashback.</label>
            <p className="text-[12px] text-gray-500 mb-3">Provide their Name and Contact Number</p>
            <textarea
              value={referFriend}
              onChange={(e) => setReferFriend(e.target.value)}
              placeholder="E.g., John Doe - 9876543210"
              rows={3}
              required
              className="w-full bg-[#0B0C10] border border-gray-700 rounded-md p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
            ></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-semibold py-3 rounded-md transition-colors duration-200 mt-4 disabled:opacity-50">
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

export default DashboardAccessForm;
