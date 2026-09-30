import React, { useState } from "react";

import TitleText from "../../components/TitleText";
import {
  FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaStar,
  FaUsers, FaBuilding, FaTrophy, FaRupeeSign,
} from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import BgImage from "../../assets/alumni/alumni_hero_bg.jpg";

const alumniData = [
  { id: 1, name: "Aarav Sharma", role: "Software Engineer", company: "Infosys", pkg: 6.5, course: "Full Stack Development", location: "Bengaluru", year: 2026 },
  { id: 2, name: "Priya Iyer", role: "Data Analyst", company: "Wipro", pkg: 5.2, course: "Data Analytics", location: "Chennai", year: 2026 },
  { id: 3, name: "Rohit Verma", role: "ML Engineer", company: "TCS", pkg: 7.0, course: "Machine Learning", location: "Pune", year: 2025 },
  { id: 4, name: "Sneha Patel", role: "UI/UX Designer", company: "Zoho", pkg: 4.8, course: "UI/UX Design", location: "Chennai", year: 2026 },
  { id: 5, name: "Karthik Nair", role: "DevOps Engineer", company: "HCL Technologies", pkg: 6.0, course: "DevOps", location: "Hyderabad", year: 2025 },
  { id: 6, name: "Ananya Reddy", role: "Data Scientist", company: "Mu Sigma", pkg: 7.5, course: "Data Science", location: "Bengaluru", year: 2026 },
  { id: 7, name: "Vikram Singh", role: "Cloud Architect", company: "Tech Mahindra", pkg: 8.0, course: "Cloud Computing", location: "Noida", year: 2025 },
  { id: 8, name: "Divya Krishnan", role: "Cybersecurity Analyst", company: "Mphasis", pkg: 5.5, course: "Cyber Security", location: "Bengaluru", year: 2026 },
  { id: 9, name: "Arjun Mehta", role: "Android Developer", company: "Mindtree", pkg: 6.2, course: "Android App Development", location: "Bengaluru", year: 2025 },
  { id: 10, name: "Pooja Gupta", role: "Digital Marketing Manager", company: "Razorpay", pkg: 5.8, course: "Digital Marketing", location: "Bengaluru", year: 2026 },
  { id: 11, name: "Suresh Babu", role: "Database Administrator", company: "Oracle India", pkg: 6.8, course: "SQL", location: "Hyderabad", year: 2025 },
  { id: 12, name: "Kavya Nair", role: "Business Analyst", company: "Deloitte India", pkg: 7.2, course: "Business Analytics", location: "Mumbai", year: 2026 },
  { id: 13, name: "Manoj Kumar", role: "IoT Engineer", company: "L&T Technology Services", pkg: 5.0, course: "IoT & Robotics", location: "Pune", year: 2025 },
  { id: 14, name: "Lakshmi Prasad", role: "HR Manager", company: "Hexaware Technologies", pkg: 4.5, course: "Human Resource", location: "Mumbai", year: 2026 },
  { id: 15, name: "Sanjay Rajan", role: "Finance Analyst", company: "Bajaj Finserv", pkg: 6.0, course: "Finance", location: "Pune", year: 2025 },
  { id: 16, name: "Meera Subramanian", role: "AI Engineer", company: "Persistent Systems", pkg: 7.8, course: "Artificial Intelligence", location: "Pune", year: 2026 },
  { id: 17, name: "Abhishek Joshi", role: "Frontend Developer", company: "Freshworks", pkg: 5.5, course: "Full Stack Development", location: "Chennai", year: 2025 },
  { id: 18, name: "Riya Desai", role: "Graphic Designer", company: "WPP India", pkg: 4.2, course: "Graphics Designing", location: "Mumbai", year: 2026 },
  { id: 19, name: "Nikhil Sharma", role: "Backend Developer", company: "Paytm", pkg: 6.5, course: "Full Stack Development", location: "Noida", year: 2025 },
  { id: 20, name: "Aishwarya Rao", role: "Medical Coder", company: "GeBBS Healthcare", pkg: 4.8, course: "Medical Coding", location: "Mumbai", year: 2026 },
  { id: 21, name: "Deepak Pandey", role: "Network Security Engineer", company: "Tata Communications", pkg: 6.3, course: "Cyber Security", location: "Delhi", year: 2025 },
  { id: 22, name: "Preethi Sundar", role: "Data Engineer", company: "Fractal Analytics", pkg: 7.0, course: "Data Science", location: "Mumbai", year: 2026 },
  { id: 23, name: "Gaurav Tiwari", role: "Cloud Engineer", company: "Rackspace India", pkg: 5.8, course: "Cloud Computing", location: "Hyderabad", year: 2025 },
  { id: 24, name: "Swathi Moorthy", role: "UX Researcher", company: "Capgemini India", pkg: 5.5, course: "UI/UX Design", location: "Chennai", year: 2026 },
  { id: 25, name: "Harish Reddy", role: "Embedded Systems Engineer", company: "KPIT Technologies", pkg: 5.0, course: "Embedded Systems", location: "Pune", year: 2025 },
  { id: 26, name: "Nithya Krishnamurthy", role: "BI Analyst", company: "Genpact", pkg: 6.0, course: "Business Analytics", location: "Hyderabad", year: 2026 },
  { id: 27, name: "Arun Pillai", role: "Full Stack Developer", company: "Zoho Corporation", pkg: 6.8, course: "Full Stack Development", location: "Chennai", year: 2025 },
  { id: 28, name: "Shreya Malhotra", role: "Stock Market Analyst", company: "ICICI Securities", pkg: 5.5, course: "Stock Market", location: "Mumbai", year: 2026 },
  { id: 29, name: "Rajesh Dutta", role: "DevOps Lead", company: "Birlasoft", pkg: 7.5, course: "DevOps", location: "Noida", year: 2025 },
  { id: 30, name: "Varsha Menon", role: "ML Researcher", company: "Ola AI", pkg: 8.0, course: "Machine Learning", location: "Bengaluru", year: 2026 },
  { id: 31, name: "Sachin Bhatt", role: "VLSI Engineer", company: "Semiconductor Labs", pkg: 6.5, course: "VLSI Design", location: "Bengaluru", year: 2025 },
  { id: 32, name: "Chitra Anand", role: "Psychologist", company: "Apollo Hospitals", pkg: 4.5, course: "Psychology", location: "Chennai", year: 2026 },
  { id: 33, name: "Manish Yadav", role: "Android Developer", company: "Dream11", pkg: 7.0, course: "Android App Development", location: "Mumbai", year: 2025 },
  { id: 34, name: "Soundarya Venkat", role: "Data Analyst", company: "EXL Service", pkg: 5.2, course: "Data Analytics", location: "Noida", year: 2026 },
  { id: 35, name: "Praveen Kumar", role: "Cloud Solution Architect", company: "Hexaware Technologies", pkg: 7.8, course: "Cloud Computing", location: "Mumbai", year: 2025 },
  { id: 36, name: "Shalini Mishra", role: "HR Business Partner", company: "Zomato", pkg: 5.0, course: "Human Resource", location: "Delhi", year: 2026 },
  { id: 37, name: "Ashwin Nambiar", role: "IoT Developer", company: "Bosch India", pkg: 5.5, course: "IoT & Robotics", location: "Bengaluru", year: 2025 },
  { id: 38, name: "Bhavana Reddy", role: "Digital Strategist", company: "iProspect India", pkg: 4.8, course: "Digital Marketing", location: "Hyderabad", year: 2026 },
  { id: 39, name: "Siddharth Pillai", role: "Cybersecurity Consultant", company: "Quick Heal Technologies", pkg: 6.5, course: "Cyber Security", location: "Pune", year: 2025 },
  { id: 40, name: "Kirthika Selvam", role: "Finance Manager", company: "Sundaram Finance", pkg: 5.8, course: "Finance", location: "Chennai", year: 2026 },
  { id: 41, name: "Naveen Bhat", role: "Data Scientist", company: "Unison International", pkg: 7.2, course: "Data Science", location: "Bengaluru", year: 2025 },
  { id: 42, name: "Padmini Seshadri", role: "Medical Coder Lead", company: "Omega Healthcare", pkg: 5.0, course: "Medical Coding", location: "Chennai", year: 2026 },
  { id: 43, name: "Dinesh Srinivasan", role: "Backend Engineer", company: "Swiggy", pkg: 7.5, course: "Full Stack Development", location: "Bengaluru", year: 2025 },
  { id: 44, name: "Yamini Kumari", role: "Business Analyst", company: "Cognizant", pkg: 6.0, course: "Business Analytics", location: "Pune", year: 2026 },
  { id: 45, name: "Aditya Raj", role: "AutoCAD Designer", company: "Larsen & Toubro", pkg: 4.5, course: "AutoCAD", location: "Mumbai", year: 2025 },
  { id: 46, name: "Keerthana Balaji", role: "AI/ML Engineer", company: "Juspay Technologies", pkg: 7.8, course: "Artificial Intelligence", location: "Bengaluru", year: 2026 },
  { id: 47, name: "Sandeep Reddy", role: "DevOps Engineer", company: "Zynga India", pkg: 6.5, course: "DevOps", location: "Bengaluru", year: 2025 },
  { id: 48, name: "Renuka Verma", role: "Graphic Designer", company: "Publicis India", pkg: 4.2, course: "Graphics Designing", location: "Mumbai", year: 2026 },
  { id: 49, name: "Balaji Krishnan", role: "SQL Developer", company: "Ramco Systems", pkg: 5.5, course: "SQL", location: "Chennai", year: 2025 },
  { id: 50, name: "Madhuri Naidu", role: "Digital Marketing Executive", company: "InMobi", pkg: 5.0, course: "Digital Marketing", location: "Bengaluru", year: 2026 },
];

const alumniData2 = [
  { id: 51, name: "Rakesh Sharma", role: "VLSI Design Engineer", company: "Sankalp Semiconductor", pkg: 6.0, course: "VLSI Design", location: "Bengaluru", year: 2025 },
  { id: 52, name: "Janani Subramanian", role: "Android Developer", company: "PhonePe", pkg: 7.0, course: "Android App Development", location: "Bengaluru", year: 2026 },
  { id: 53, name: "Varun Bhargava", role: "Cloud Security Engineer", company: "Paysign India", pkg: 6.5, course: "Cyber Security", location: "Hyderabad", year: 2025 },
  { id: 54, name: "Divya Lakshmi", role: "UX Designer", company: "Flipkart", pkg: 6.2, course: "UI/UX Design", location: "Bengaluru", year: 2026 },
  { id: 55, name: "Sudarshan Murthy", role: "Embedded Engineer", company: "Continental India", pkg: 5.5, course: "Embedded Systems", location: "Bengaluru", year: 2025 },
  { id: 56, name: "Priyanka Shetty", role: "HR Generalist", company: "Byju's", pkg: 4.8, course: "Human Resource", location: "Bengaluru", year: 2026 },
  { id: 57, name: "Akash Tomar", role: "Stock Trader Analyst", company: "Sharekhan", pkg: 5.2, course: "Stock Market", location: "Mumbai", year: 2025 },
  { id: 58, name: "Nandita Rao", role: "Data Analyst", company: "Tiger Analytics", pkg: 6.5, course: "Data Analytics", location: "Chennai", year: 2026 },
  { id: 59, name: "Kiran Babu", role: "Full Stack Developer", company: "MakeMyTrip", pkg: 7.2, course: "Full Stack Development", location: "Delhi", year: 2025 },
  { id: 60, name: "Saranya Krishnan", role: "Finance Analyst", company: "Kotak Mahindra Bank", pkg: 5.8, course: "Finance", location: "Mumbai", year: 2026 },
  { id: 61, name: "Hemant Gupta", role: "ML Ops Engineer", company: "DataWeave", pkg: 7.5, course: "Machine Learning", location: "Bengaluru", year: 2025 },
  { id: 62, name: "Latha Vijayakumar", role: "Medical Coder", company: "Hirslanden India", pkg: 4.5, course: "Medical Coding", location: "Chennai", year: 2026 },
  { id: 63, name: "Prashanth Gowda", role: "IoT Solutions Architect", company: "Wipro", pkg: 6.8, course: "IoT & Robotics", location: "Bengaluru", year: 2025 },
  { id: 64, name: "Ramya Sundaram", role: "BI Developer", company: "Mu Sigma", pkg: 6.5, course: "Business Analytics", location: "Bengaluru", year: 2026 },
  { id: 65, name: "Jayakar Pillai", role: "AutoCAD Structural Engineer", company: "Shapoorji Pallonji", pkg: 5.0, course: "AutoCAD", location: "Mumbai", year: 2025 },
  { id: 66, name: "Amrita Singh", role: "AI Product Manager", company: "Zendesk India", pkg: 8.0, course: "Artificial Intelligence", location: "Pune", year: 2026 },
  { id: 67, name: "Sathish Kumar", role: "DevSecOps Engineer", company: "TCS", pkg: 7.0, course: "DevOps", location: "Chennai", year: 2025 },
  { id: 68, name: "Bhavya Reddy", role: "Digital Media Designer", company: "Ogilvy India", pkg: 4.8, course: "Graphics Designing", location: "Mumbai", year: 2026 },
  { id: 69, name: "Nagarajan S", role: "Database Engineer", company: "Syntel", pkg: 5.5, course: "SQL", location: "Pune", year: 2025 },
  { id: 70, name: "Aparna Krishnamurthy", role: "Content Marketing Manager", company: "HubSpot India", pkg: 5.8, course: "Digital Marketing", location: "Bengaluru", year: 2026 },
  { id: 71, name: "Venkat Subramanian", role: "Senior Data Scientist", company: "Licious", pkg: 7.8, course: "Data Science", location: "Bengaluru", year: 2025 },
  { id: 72, name: "Prathyusha Rao", role: "Cybersecurity Manager", company: "Sophos India", pkg: 7.2, course: "Cyber Security", location: "Bengaluru", year: 2026 },
  { id: 73, name: "Mukesh Anand", role: "Cloud Infrastructure Engineer", company: "Mastech Digital", pkg: 6.2, course: "Cloud Computing", location: "Pune", year: 2025 },
  { id: 74, name: "Tharani Devi", role: "Psychologist Counselor", company: "Fortis Healthcare", pkg: 4.5, course: "Psychology", location: "Delhi", year: 2026 },
  { id: 75, name: "Karthi Murugan", role: "Full Stack Developer", company: "Razorpay", pkg: 8.0, course: "Full Stack Development", location: "Bengaluru", year: 2025 },
  { id: 76, name: "Sunitha Narayanan", role: "UX Product Designer", company: "Meesho", pkg: 6.5, course: "UI/UX Design", location: "Bengaluru", year: 2026 },
  { id: 77, name: "Ramesh Babu", role: "VLSI Verification Engineer", company: "Broadcom India", pkg: 7.5, course: "VLSI Design", location: "Hyderabad", year: 2025 },
  { id: 78, name: "Gayathri Raman", role: "HR Operations Analyst", company: "UrbanClap", pkg: 4.5, course: "Human Resource", location: "Delhi", year: 2026 },
  { id: 79, name: "Yogesh Patil", role: "Android Lead Developer", company: "Nykaa", pkg: 7.0, course: "Android App Development", location: "Mumbai", year: 2025 },
  { id: 80, name: "Lavanya Mohan", role: "Business Analyst", company: "PwC India", pkg: 6.8, course: "Business Analytics", location: "Delhi", year: 2026 },
  { id: 81, name: "Shankar Prasad", role: "ML Engineer", company: "Ather Energy", pkg: 6.5, course: "Machine Learning", location: "Bengaluru", year: 2025 },
  { id: 82, name: "Chandana Reddy", role: "Data Analyst", company: "Lenskart", pkg: 5.5, course: "Data Analytics", location: "Delhi", year: 2026 },
  { id: 83, name: "Vivek Menon", role: "Site Reliability Engineer", company: "Zepto", pkg: 7.2, course: "DevOps", location: "Mumbai", year: 2025 },
  { id: 84, name: "Poornima Selvam", role: "Financial Planner", company: "HDFC Life", pkg: 5.8, course: "Finance", location: "Chennai", year: 2026 },
  { id: 85, name: "Balachandran KV", role: "Embedded Software Developer", company: "Ashok Leyland", pkg: 5.2, course: "Embedded Systems", location: "Chennai", year: 2025 },
  { id: 86, name: "Niranjana Subramani", role: "Digital Brand Strategist", company: "Pinstorm", pkg: 4.5, course: "Digital Marketing", location: "Mumbai", year: 2026 },
  { id: 87, name: "Sriram Venkatesan", role: "Cloud Platform Engineer", company: "Whatfix", pkg: 7.0, course: "Cloud Computing", location: "Bengaluru", year: 2025 },
  { id: 88, name: "Tamilarasi Ravi", role: "Medical Coding Specialist", company: "Hinduja Healthcare", pkg: 5.0, course: "Medical Coding", location: "Chennai", year: 2026 },
  { id: 89, name: "Anand Murugesan", role: "SQL Database Developer", company: "Minda Industries", pkg: 5.5, course: "SQL", location: "Pune", year: 2025 },
  { id: 90, name: "Kowsalya Suresh", role: "Graphic & Motion Designer", company: "BigBrainco", pkg: 4.2, course: "Graphics Designing", location: "Bengaluru", year: 2026 },
  { id: 91, name: "Praveen Annamalai", role: "AI Research Engineer", company: "IIT Madras Research Park", pkg: 7.8, course: "Artificial Intelligence", location: "Chennai", year: 2025 },
  { id: 92, name: "Suganya Perumal", role: "Stock Research Analyst", company: "Motilal Oswal", pkg: 5.5, course: "Stock Market", location: "Mumbai", year: 2026 },
  { id: 93, name: "Dhanush Rajaram", role: "Backend Developer", company: "Urban Ladder", pkg: 6.5, course: "Full Stack Development", location: "Bengaluru", year: 2025 },
  { id: 94, name: "Lakshana Sundaresan", role: "Cybersecurity Analyst", company: "Infowatch India", pkg: 6.0, course: "Cyber Security", location: "Bengaluru", year: 2026 },
  { id: 95, name: "Selva Ganesh", role: "AutoCAD Civil Engineer", company: "NCC Limited", pkg: 4.8, course: "AutoCAD", location: "Hyderabad", year: 2025 },
  { id: 96, name: "Vaishnavi Iyer", role: "Data Scientist Lead", company: "Dunzo Digital", pkg: 7.5, course: "Data Science", location: "Bengaluru", year: 2026 },
  { id: 97, name: "Kumaraswamy R", role: "IoT Product Engineer", company: "Microchip Technology India", pkg: 6.2, course: "IoT & Robotics", location: "Pune", year: 2025 },
  { id: 98, name: "Sowmiya Chandrasekhar", role: "Business Development Manager", company: "Freshworks", pkg: 6.8, course: "Business Analytics", location: "Chennai", year: 2026 },
  { id: 99, name: "Narayanan Subash", role: "ML Platform Engineer", company: "ShareChat", pkg: 7.5, course: "Machine Learning", location: "Bengaluru", year: 2025 },
  { id: 100, name: "Dharanya Krishnaswamy", role: "UX Lead Designer", company: "Swiggy", pkg: 7.0, course: "UI/UX Design", location: "Bengaluru", year: 2026 },
];

const allAlumni = [...alumniData, ...alumniData2];

const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const avatarPalette = [
  "#1e3a5f","#0d4a6b","#1b4332","#2d3748","#4a1942",
  "#1a365d","#234e52","#322659","#3d1f00","#1c3d5a",
];
const getAvatarBg = (id) => avatarPalette[(id - 1) % avatarPalette.length];

const getPkgInfo = (pkg) => {
  if (pkg >= 7.5) return { label: "Top Package", dot: "#10b981", text: "#059669", bg: "#ecfdf5" };
  if (pkg >= 6.5) return { label: "High Package", dot: "#3b82f6", text: "#2563eb", bg: "#eff6ff" };
  if (pkg >= 5.5) return { label: "Good Package", dot: "#8b5cf6", text: "#7c3aed", bg: "#f5f3ff" };
  return { label: "Package", dot: "#f59e0b", text: "#d97706", bg: "#fffbeb" };
};

const packageFilters = ["All", "4-5 LPA", "5-6 LPA", "6-7 LPA", "7-8 LPA"];
const yearFilters = ["All", "2026", "2025"];

const Alumni = () => {
  const [search, setSearch] = useState("");
  const [selectedPkg, setSelectedPkg] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const filtered = allAlumni.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.name.toLowerCase().includes(q) ||
      a.company.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.course.toLowerCase().includes(q);
    const matchPkg =
      selectedPkg === "All" ||
      (selectedPkg === "4-5 LPA" && a.pkg >= 4 && a.pkg < 5) ||
      (selectedPkg === "5-6 LPA" && a.pkg >= 5 && a.pkg < 6) ||
      (selectedPkg === "6-7 LPA" && a.pkg >= 6 && a.pkg < 7) ||
      (selectedPkg === "7-8 LPA" && a.pkg >= 7 && a.pkg <= 8);
    const matchYear = selectedYear === "All" || String(a.year) === selectedYear;
    return matchSearch && matchPkg && matchYear;
  });

  const stats = [
    { icon: FaUsers, value: "100+", label: "Alumni Placed", color: "#2563eb", bg: "#eff6ff" },
    { icon: FaBuilding, value: "50+", label: "Top Companies", color: "#059669", bg: "#ecfdf5" },
    { icon: FaRupeeSign, value: "8 LPA", label: "Highest Package", color: "#7c3aed", bg: "#f5f3ff" },
    { icon: FaTrophy, value: "100%", label: "Placement Rate", color: "#d97706", bg: "#fffbeb" },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "5rem", background: "#f8fafc" }}>
      
      {/* Hero Section with Background */}
      <div style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingBottom: "3rem",
        borderBottom: "1px solid #e2e8f0",
        position: "relative",
      }}>
        {/* Optional overlay to make text readable depending on image */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Light tint overlay reduced for more brightness
          backdropFilter: "brightness(1.1)", // Increase brightness slightly
          zIndex: 1
        }}></div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.25rem" }}>
            
            {/* Page Header */}
            <div style={{ textAlign: "center", paddingTop: "2rem", marginBottom: "3rem" }}>
              <TitleText
                align="center"
                title="Our Proud Alumni Network"
                description="100+ students placed at leading Indian companies after completing AccenLearn programs — packages ranging from 4 LPA to 8 LPA."
              />
            </div>

            {/* Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "1rem" }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: "0.875rem",
                  padding: "1.25rem 1.5rem",
                  display: "flex", alignItems: "center", gap: "1rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "0.625rem", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <s.icon style={{ fontSize: "1.2rem", color: s.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, marginTop: "0.2rem" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "3rem auto 0", padding: "0 1.25rem" }}>

        {/* Filter Panel */}
        <div style={{ background: "#fff", borderRadius: "1rem", border: "1px solid #e2e8f0", padding: "1.25rem 1.5rem", marginBottom: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <RiSearchLine style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "1rem" }} />
            <input
              type="text"
              placeholder="Search by name, company, role or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", paddingLeft: "2.5rem", paddingRight: "1rem",
                paddingTop: "0.65rem", paddingBottom: "0.65rem",
                borderRadius: "0.625rem", border: "1.5px solid #e2e8f0",
                background: "#f8fafc", fontSize: "0.825rem", fontWeight: 500,
                color: "#0f172a", outline: "none", boxSizing: "border-box", fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Package:</span>
              {packageFilters.map((f) => (
                <button key={f} onClick={() => setSelectedPkg(f)} style={{
                  padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700,
                  cursor: "pointer", transition: "all 0.15s",
                  border: selectedPkg === f ? "1.5px solid #1d4ed8" : "1.5px solid #e2e8f0",
                  background: selectedPkg === f ? "#1d4ed8" : "#fff",
                  color: selectedPkg === f ? "#fff" : "#64748b",
                }}>{f}</button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Batch:</span>
              {yearFilters.map((f) => (
                <button key={f} onClick={() => setSelectedYear(f)} style={{
                  padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700,
                  cursor: "pointer", transition: "all 0.15s",
                  border: selectedYear === f ? "1.5px solid #059669" : "1.5px solid #e2e8f0",
                  background: selectedYear === f ? "#059669" : "#fff",
                  color: selectedYear === f ? "#fff" : "#64748b",
                }}>{f}</button>
              ))}
            </div>
            <div style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
              <strong style={{ color: "#0f172a" }}>{filtered.length}</strong> of 100 alumni
              {(search || selectedPkg !== "All" || selectedYear !== "All") && (
                <button onClick={() => { setSearch(""); setSelectedPkg("All"); setSelectedYear("All"); }}
                  style={{ marginLeft: "0.75rem", fontSize: "0.72rem", color: "#1d4ed8", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Alumni Cards */}
        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: "1rem" }}>
            {filtered.map((alumni, index) => {
              const pkgInfo = getPkgInfo(alumni.pkg);
              return (
                <div
                  key={alumni.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 12) * 40}
                  style={{
                    background: "#fff", borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 2px 12px rgba(15,23,42,0.08)",
                    overflow: "hidden", transition: "all 0.22s ease",
                    display: "flex", flexDirection: "column",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 10px 36px rgba(15,23,42,0.14)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(15,23,42,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {/* Top accent bar */}
                  <div style={{ height: "3px", background: "linear-gradient(90deg,#1d4ed8,#7c3aed,#059669)" }} />

                  <div style={{ padding: "1.1rem" }}>
                    {/* Top row: avatar + info + year */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.875rem" }}>
                      <div style={{
                        width: "44px", height: "44px", borderRadius: "0.5rem",
                        background: getAvatarBg(alumni.id), flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 800, fontSize: "0.9rem",
                        letterSpacing: "0.02em", boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}>
                        {getInitials(alumni.name)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: "0.875rem", color: "#0f172a", lineHeight: 1.2, marginBottom: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {alumni.name}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {alumni.role}
                        </div>
                      </div>
                      <div style={{
                        fontSize: "0.6rem", fontWeight: 800, color: "#94a3b8",
                        background: "#f1f5f9", border: "1px solid #e2e8f0",
                        borderRadius: "0.35rem", padding: "0.18rem 0.45rem",
                        whiteSpace: "nowrap", flexShrink: 0,
                      }}>
                        {alumni.year}
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: "1px", background: "#f1f5f9", marginBottom: "0.75rem" }} />

                    {/* Details */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <FaBuilding style={{ color: "#94a3b8", fontSize: "0.65rem", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {alumni.company}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <FaGraduationCap style={{ color: "#94a3b8", fontSize: "0.65rem", flexShrink: 0, marginTop: "0.15rem" }} />
                        <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 500, lineHeight: 1.35 }}>
                          {alumni.course}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <FaMapMarkerAlt style={{ color: "#94a3b8", fontSize: "0.65rem", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 500 }}>{alumni.location}</span>
                      </div>
                    </div>

                    {/* Package footer */}
                    <div style={{
                      marginTop: "0.875rem", paddingTop: "0.75rem",
                      borderTop: "1px solid #f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: pkgInfo.dot }} />
                        <span style={{ fontSize: "0.65rem", color: pkgInfo.text, fontWeight: 700 }}>{pkgInfo.label}</span>
                      </div>
                      <div style={{
                        background: pkgInfo.bg, border: "1.5px solid " + pkgInfo.dot + "40",
                        borderRadius: "0.4rem", padding: "0.25rem 0.65rem",
                        fontSize: "0.78rem", fontWeight: 800, color: pkgInfo.text,
                      }}>
                        &#8377;{alumni.pkg} LPA
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <FaUsers style={{ fontSize: "2.5rem", color: "#cbd5e1", marginBottom: "0.75rem" }} />
            <p style={{ color: "#64748b", fontWeight: 600 }}>No alumni found. <button onClick={() => { setSearch(""); setSelectedPkg("All"); setSelectedYear("All"); }} style={{ color: "#1d4ed8", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Reset</button></p>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: "4rem",
          background: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 55%,#1d4ed8 100%)",
          borderRadius: "1.25rem", padding: "3.5rem 2rem",
          textAlign: "center", color: "#fff",
          boxShadow: "0 16px 48px rgba(29,78,216,0.28)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "999px", padding: "0.35rem 0.9rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#93c5fd", marginBottom: "1rem" }}>
            <FaStar style={{ color: "#fcd34d" }} /> Placement Driven Education
          </div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 0.75rem", lineHeight: 1.2 }}>Be Our Next Success Story</h2>
          <p style={{ color: "#93c5fd", fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto 1.75rem", lineHeight: 1.7 }}>
            Join AccenLearn programs and land your dream job at top Indian companies with packages from 4 to 8 LPA.
          </p>
          <button
            onClick={() => window.location.href = "/contact"}
            style={{
              background: "#fff", color: "#1d4ed8", fontWeight: 800, fontSize: "0.8rem",
              padding: "0.8rem 2.2rem", borderRadius: "999px", border: "none", cursor: "pointer",
              letterSpacing: "0.07em", textTransform: "uppercase",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#dbeafe"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Enroll Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default Alumni;
