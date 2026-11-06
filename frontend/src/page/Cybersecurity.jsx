import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const CyberSecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "Cyber Security & Ethical Hacking",
  "heroSubtitle": "Defend enterprise networks, master penetration testing, and secure cloud infrastructures in this intensive 24-week program.",
  "toolsSubtitle": "Master the modern InfoSec & Hacker stack",
  "trackSubtitle": "A dedicated Cyber Security track tailored to your current experience level.",
  "trackButtonLabel": "Start Your Security Career →",
  "projectLabel": "Security Project",
  "careerOutcomesDomain": "SoftwareDeveloper",
  "trustStats": [
    {
      "value": "24 Weeks",
      "label": "Duration"
    },
    {
      "value": "100% Online",
      "label": "Format"
    },
    {
      "value": "10+ CTFs",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "Ethical Hacking",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "Kali Linux",
      "img": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg"
    },
    {
      "name": "Metasploit",
      "img": "https://upload.wikimedia.org/wikipedia/commons/2/24/Metasploit_logo.svg"
    },
    {
      "name": "Wireshark",
      "img": "https://upload.wikimedia.org/wikipedia/commons/0/00/Wireshark_Icon.png"
    },
    {
      "name": "Burp Suite",
      "img": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Burp_Suite_Logo.png"
    },
    {
      "name": "Nmap",
      "img": "https://upload.wikimedia.org/wikipedia/commons/3/37/Nmap_Logo.svg"
    },
    {
      "name": "Python",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    },
    {
      "name": "Linux",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
    },
    {
      "name": "AWS Security",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      "invert": true
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "SOC Analysts & Junior Penetration Testers",
      "desc": "Master network fundamentals, threat monitoring, and basic vulnerability assessments.",
      "benefits": [
        "Monitor SIEM alerts and analyze network traffic using Wireshark",
        "Execute vulnerability scans using Nmap and Nessus",
        "Understand OSINT (Open Source Intelligence) and social engineering tactics"
      ],
      "quote": "I want to become the first line of defense against cyber threats.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Ethical Hackers & Application Security Engineers",
      "desc": "Transition into proactive offensive security and advanced web application penetration testing.",
      "benefits": [
        "Exploit complex vulnerabilities using Metasploit and custom Python scripts",
        "Master OWASP Top 10 web vulnerabilities using Burp Suite Professional",
        "Perform privilege escalation and lateral movement in Active Directory environments"
      ],
      "quote": "I want to actively hack systems (legally) to find vulnerabilities before the bad guys do.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Security Architects & DevSecOps Leads",
      "desc": "Design impenetrable enterprise cloud architectures and lead security compliance programs.",
      "benefits": [
        "Integrate security into CI/CD pipelines (DevSecOps)",
        "Architect secure AWS/Azure environments with Zero-Trust principles",
        "Manage incident response, forensics, and corporate compliance (ISO 27001)"
      ],
      "quote": "My focus is on enterprise-wide security strategy, compliance, and securing cloud infrastructure.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Networks & Linux Administration",
      "focusLabel": "CURRICULUM",
      "focus": [
        "TCP/IP, Subnetting, Routing, and DNS fundamentals",
        "Advanced Linux Command Line & Bash Scripting",
        "Setting up Kali Linux and Virtualized Attack Labs",
        "Cryptography Basics (Symmetric, Asymmetric, Hashing)"
      ],
      "application": "Building a Secure Custom Linux Server"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "Network Security & Traffic Analysis",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Packet Sniffing and Traffic Analysis with Wireshark",
        "Firewalls, IDS/IPS (Snort, Suricata), and VPNs",
        "Network Reconnaissance and Port Scanning with Nmap",
        "Vulnerability Scanning with Nessus & OpenVAS"
      ],
      "application": "Deploying and Configuring an Enterprise IDS"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "Ethical Hacking & Exploitation",
      "focusLabel": "CURRICULUM",
      "focus": [
        "The Cyber Kill Chain and MITRE ATT&CK Framework",
        "Exploitation using the Metasploit Framework",
        "Password Cracking (Hashcat, John the Ripper)",
        "Post-Exploitation, Privilege Escalation, & Rootkits"
      ],
      "application": "Rooting a Vulnerable 'Capture The Flag' Machine"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–16",
      "title": "Web Application Penetration Testing",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Understanding HTTP/HTTPS and Web Architectures",
        "Mastering Burp Suite for Interception & Manipulation",
        "Exploiting OWASP Top 10 (SQLi, XSS, CSRF, SSRF)",
        "API Security and Authentication Bypasses"
      ],
      "application": "Performing a Full Web App Security Audit"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 17–20",
      "title": "Python for Cybersecurity",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Python Basics for Security Professionals",
        "Writing Custom Network Scanners and Sniffers",
        "Automating Exploits and Payload Generation",
        "Malware Analysis and Reverse Engineering Basics"
      ],
      "application": "Developing a Custom Ransomware Simulator"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 21–24",
      "title": "Cloud Security & DevSecOps",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Securing AWS/Azure Infrastructure (IAM, VPCs)",
        "Integrating Security Tools into CI/CD Pipelines",
        "Incident Response & Digital Forensics (Autopsy)",
        "Interview Prep, Cert Guidance (CEH, OSCP), & Placement"
      ],
      "application": "Securing a Cloud-Native Microservices Architecture"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "ShieldCheck",
      "title": "Enterprise Web App Security Audit",
      "desc": "Perform a comprehensive black-box penetration test on a simulated banking application, exploiting SQLi and XSS, and write a professional remediation report.",
      "tools": [
        "Burp Suite",
        "OWASP",
        "SQLmap"
      ]
    },
    {
      "icon": "Network",
      "title": "Active Directory Compromise Lab",
      "desc": "Set up a Windows Server domain environment and execute a full attack chain: phishing, Kerberoasting, and Domain Admin privilege escalation.",
      "tools": [
        "Kali",
        "Metasploit",
        "BloodHound"
      ]
    },
    {
      "icon": "Code",
      "title": "Custom Python Vulnerability Scanner",
      "desc": "Develop a multithreaded Python application that scans IP ranges for open ports, grabs banners, and cross-references known CVEs.",
      "tools": [
        "Python",
        "Sockets",
        "NVD API"
      ]
    },
    {
      "icon": "Server",
      "title": "Cloud DevSecOps Pipeline",
      "desc": "Build a CI/CD pipeline in GitHub Actions that automatically runs SAST and DAST security scans before deploying infrastructure to AWS.",
      "tools": [
        "AWS",
        "Docker",
        "Trivy"
      ]
    }
  ],
  "faqData": [
    {
      "q": "Is hacking legal to learn?",
      "a": "Yes, you will learn Ethical Hacking in isolated, virtualized lab environments. We strictly teach defensive and authorized offensive techniques."
    },
    {
      "q": "Do I need to know programming?",
      "a": "Basic programming is helpful, but we teach the necessary Bash and Python scripting required for cybersecurity from the ground up."
    },
    {
      "q": "Will this help me pass the CEH or OSCP?",
      "a": "Yes. The curriculum maps heavily to the practical knowledge required for certifications like CompTIA Security+, CEH, and OSCP."
    },
    {
      "q": "What kind of computer do I need?",
      "a": "You need a machine capable of running multiple virtual machines simultaneously (minimum 16GB RAM is highly recommended)."
    },
    {
      "q": "Are there practical labs?",
      "a": "Absolutely. The course is highly practical, involving weekly Capture The Flag (CTF) challenges and live virtual ranges."
    },
    {
      "q": "Do you offer placement assistance?",
      "a": "Yes. Our placement cell helps you craft a cybersecurity portfolio and connects you with SOC and Penetration Testing roles."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default CyberSecurity;
