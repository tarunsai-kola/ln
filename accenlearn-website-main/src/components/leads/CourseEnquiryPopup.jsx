import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { trackEvent } from "../../utils/analytics";

const initialFormData = {
  name: "",
  mobileNumber: "",
  email: "",
  interestedCourse: "",
  message: "",
};

const courseOptions = [
  "Full Stack Web Development",
  "Artificial Intelligence",
  "Data Science",
  "Data Analytics",
  "MERN Stack Development",
  "Java Full Stack Development",
  "Python Programming",
  "Machine Learning",
  "Cloud Computing",
  "Cyber Security",
  "Ethical Hacking",
  "DevOps Engineering",
  "Digital Marketing",
  "UI/UX Designing",
  "Graphic Designing",
  "Medical Coding",
  "Soft Skills & Personality Development",
  "Spoken English & Communication Skills",
];

const CourseEnquiryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const popupAlreadyShown = sessionStorage.getItem(
      "accenlearnCoursePopupShown"
    );

    if (popupAlreadyShown) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      trackEvent("Popup", "Open", "Course Enquiry Popup");

      sessionStorage.setItem(
        "accenlearnCoursePopupShown",
        "true"
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required.";
    } else if (
      !/^[A-Za-z\s.'-]{2,50}$/.test(formData.name.trim())
    ) {
      validationErrors.name = "Enter a valid name.";
    }

    if (!formData.mobileNumber.trim()) {
      validationErrors.mobileNumber =
        "Mobile number is required.";
    } else if (
      !/^[6-9]\d{9}$/.test(formData.mobileNumber)
    ) {
      validationErrors.mobileNumber =
        "Enter a valid 10-digit mobile number.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      validationErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.interestedCourse) {
      validationErrors.interestedCourse =
        "Please select a course.";
    }

    if (formData.message.length > 500) {
      validationErrors.message =
        "Message cannot exceed 500 characters.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    trackEvent("Popup", "Submit", "Course Enquiry Form");

    // Web3Forms Access Key
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
          phone: formData.mobileNumber,
          course: formData.interestedCourse,
          message: formData.message || "No message provided",
          subject: `New Course Enquiry - ${formData.interestedCourse}`,
          from_name: "Accenlearn Website Course Enquiry",
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setSuccessMessage("Thank you! Our team will contact you shortly.");
        trackEvent("Popup", "Success", "Course Enquiry Form");
        setFormData(initialFormData);

        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      } else {
        setSuccessMessage(result.message || "Unable to submit your enquiry. Please try again.");
        trackEvent("Popup", "Error", "Course Enquiry Form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("Network error occurred. Please check your connection or try again.");
      trackEvent("Popup", "NetworkError", "Course Enquiry Form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrors({});
    setSuccessMessage("");
    trackEvent("Popup", "Close", "Course Enquiry Popup");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-enquiry-title"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close enquiry popup"
          className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <IoClose size={24} />
        </button>

        <div className="mb-7 pr-10">
          <h2
            id="course-enquiry-title"
            className="mb-3 text-2xl font-black text-primary sm:text-3xl"
          >
            Start Your Learning Journey with AccenLearn
          </h2>

          <p className="text-sm leading-6 text-gray-500 sm:text-base">
            Interested in joining one of our programs? Register
            your interest and our team will contact you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          noValidate
        >
          <FormField
            label="Name"
            htmlFor="enquiryName"
            error={errors.name}
          >
            <input
              id="enquiryName"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </FormField>

          <FormField
            label="Mobile Number"
            htmlFor="enquiryMobile"
            error={errors.mobileNumber}
          >
            <input
              id="enquiryMobile"
              name="mobileNumber"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </FormField>

          <FormField
            label="Email"
            htmlFor="enquiryEmail"
            error={errors.email}
          >
            <input
              id="enquiryEmail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </FormField>

          <FormField
            label="Interested Course"
            htmlFor="interestedCourse"
            error={errors.interestedCourse} 
          >
            <select
              id="interestedCourse"
              name="interestedCourse"
              value={formData.interestedCourse}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select a course</option>

              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </FormField>

          <div className="sm:col-span-2">
            <FormField
              label="Message (Optional)"
              htmlFor="enquiryMessage"
              error={errors.message}
            >
              <textarea
                id="enquiryMessage"
                name="message"
                rows={4}
                maxLength={500}
                value={formData.message}
                onChange={handleChange} 
                placeholder="Tell us what you would like to know"
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <div className="mt-1 text-right text-xs text-gray-400">
                {formData.message.length}/500
              </div>
            </FormField>
          </div>

          {successMessage && (
            <div className={`sm:col-span-2 rounded-xl p-3 text-sm font-medium ${
              successMessage.includes("Thank you") 
                ? "bg-green-50 border border-green-200 text-green-700" 
                : "bg-red-50 border border-red-200 text-red-700"
            }`}>
              {successMessage}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-600 transition hover:bg-gray-100"
            >
              Close
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-secondary px-6 py-3 font-black text-white shadow-lg transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormField = ({
  label,
  htmlFor,
  error,
  children,
}) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default CourseEnquiryPopup;
