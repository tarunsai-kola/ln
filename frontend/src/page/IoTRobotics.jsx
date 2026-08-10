import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const IoTRobotics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "IoT & Robotics",
  "heroSubtitle": "Engineer connected devices, smart sensors, and autonomous robotic systems in this intensive 24-week hardware program.",
  "toolsSubtitle": "Master the modern IoT & Robotics stack",
  "trackSubtitle": "A dedicated hardware track tailored to your current experience level.",
  "trackButtonLabel": "Start Your IoT Career →",
  "projectLabel": "Hardware Project",
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
      "value": "15+ Prototypes",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "IoT Architecture",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "Arduino",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg"
    },
    {
      "name": "Raspberry Pi",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg"
    },
    {
      "name": "Python",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    },
    {
      "name": "C++",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
    },
    {
      "name": "AWS IoT",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      "invert": true
    },
    {
      "name": "Docker",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
    },
    {
      "name": "Linux",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Junior IoT Developers & Robotics Technicians",
      "desc": "Build the foundational skills to program microcontrollers and interface with basic sensors.",
      "benefits": [
        "Program ESP32 and Arduino microcontrollers using C/C++",
        "Interface with Analog and Digital sensors (Temperature, Motion, IMUs)",
        "Understand basic DC and Servo motor control for robotics"
      ],
      "quote": "I want to start building smart devices that interact with the physical world.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "IoT Systems Engineers & Robotics Developers",
      "desc": "Transition into designing networked systems and complex robotic kinematics.",
      "benefits": [
        "Implement secure MQTT communication protocols over WiFi/Cellular",
        "Develop Embedded Linux applications on Raspberry Pi using Python",
        "Implement basic autonomous navigation using ROS (Robot Operating System)"
      ],
      "quote": "I need to connect my devices to the cloud securely and build autonomous systems.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "IoT Solutions Architects & Robotics Leads",
      "desc": "Design enterprise-scale IoT cloud architectures and manage robotics engineering teams.",
      "benefits": [
        "Architect massive IoT fleets using AWS IoT Core and Azure IoT Hub",
        "Design secure Edge Computing pipelines and Over-The-Air (OTA) updates",
        "Lead multi-disciplinary teams (Hardware, Firmware, Cloud) to launch products"
      ],
      "quote": "My focus is on managing millions of connected devices securely and analyzing telemetry at scale.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Microcontrollers & Sensors",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Introduction to Arduino, ESP32, and Embedded C++",
        "Digital & Analog I/O, PWM, and Hardware Interrupts",
        "Interfacing Sensors (DHT11, Ultrasonic, Accelerometers)",
        "Basic Actuators (DC Motors, Servos, Relays)"
      ],
      "application": "Building a Smart Automated Greenhouse Controller"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "IoT Communication Protocols",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Local Communication (UART, I2C, SPI)",
        "Wireless Protocols (WiFi, Bluetooth Low Energy, LoRaWAN)",
        "Publish-Subscribe Messaging with MQTT",
        "Securing IoT communications using TLS/SSL"
      ],
      "application": "Wireless Sensor Network using ESP-NOW and MQTT"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "Cloud Integration & Analytics",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Connecting devices to AWS IoT Core",
        "Processing Telemetry Data with AWS Lambda & DynamoDB",
        "Visualizing Sensor Data in Real-Time Dashboards",
        "Edge Computing principles (Processing data locally)"
      ],
      "application": "Enterprise IoT Dashboard for Fleet Monitoring"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–16",
      "title": "Robotics Foundations",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Kinematics: Understanding robotic movement and joints",
        "PID Controllers (Proportional-Integral-Derivative) for smooth motion",
        "Motor Encoders and Closed-Loop Control Systems",
        "Line Following and Obstacle Avoidance Algorithms"
      ],
      "application": "Building an Autonomous PID Line-Following Robot"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 17–20",
      "title": "Advanced Robotics (ROS & Linux)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Introduction to Embedded Linux and Raspberry Pi",
        "Python for Hardware Control (GPIO, PiCamera)",
        "Introduction to ROS (Robot Operating System) Nodes and Topics",
        "Computer Vision for Robotics using OpenCV"
      ],
      "application": "Raspberry Pi based Object Tracking Turret"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 21–24",
      "title": "Security, OTA & Production",
      "focusLabel": "CURRICULUM",
      "focus": [
        "IoT Security Vulnerabilities and Mitigation (Botnets, DDoS)",
        "Implementing Over-The-Air (OTA) Firmware Updates",
        "PCB Design Basics (Schematics to Gerber files)",
        "Interview Prep, Project Polishing, and Placement"
      ],
      "application": "Final Secure End-to-End IoT Product Prototype"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "Network",
      "title": "Smart City Traffic Controller",
      "desc": "Design a networked system of ESP32 microcontrollers that uses ultrasonic sensors to optimize traffic light timing via MQTT.",
      "tools": [
        "ESP32",
        "MQTT",
        "C++"
      ]
    },
    {
      "icon": "Cpu",
      "title": "Autonomous Warehouse Robot",
      "desc": "Build a differential-drive robot that navigates a maze using PID control, motor encoders, and ultrasonic obstacle avoidance.",
      "tools": [
        "Arduino",
        "PID",
        "Sensors"
      ]
    },
    {
      "icon": "Server",
      "title": "AWS Cloud Telemetry Dashboard",
      "desc": "Connect an ESP32 weather station to AWS IoT Core, securely transmitting telemetry to be visualized in a web dashboard.",
      "tools": [
        "AWS IoT",
        "ESP32",
        "DynamoDB"
      ]
    },
    {
      "icon": "BrainCircuit",
      "title": "ROS Vision-Based Sorter",
      "desc": "Utilize a Raspberry Pi, OpenCV, and ROS to detect specific colored objects on a conveyor belt and trigger a servo sorting arm.",
      "tools": [
        "ROS",
        "Python",
        "OpenCV"
      ]
    }
  ],
  "faqData": [
    {
      "q": "Do I need to buy hardware kits?",
      "a": "Yes, you will need a basic electronics kit containing an ESP32, sensors, jumper wires, and motors. We will provide a cheap Amazon purchase list (~$40) before Week 1."
    },
    {
      "q": "What is the difference between IoT and Embedded Systems?",
      "a": "Embedded Systems focuses heavily on the low-level microchip itself. IoT focuses on taking that chip and connecting it securely to the Cloud."
    },
    {
      "q": "Is coding experience required?",
      "a": "Basic programming logic is helpful, but we teach the necessary C++ and Python from scratch."
    },
    {
      "q": "Will we learn ROS (Robot Operating System)?",
      "a": "Yes, Phase 5 introduces the fundamental concepts of ROS nodes, topics, and messages using a Raspberry Pi."
    },
    {
      "q": "Is this program suitable for Mechanical Engineers?",
      "a": "Absolutely! Mechanical, Electrical, and Electronics engineers excel in this course as it bridges the gap between hardware and software."
    },
    {
      "q": "How are the final projects evaluated?",
      "a": "You will record video demonstrations of your hardware working in the real world and submit your GitHub repositories for code review."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default IoTRobotics;
