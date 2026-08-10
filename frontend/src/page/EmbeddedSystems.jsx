import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const EmbeddedSystems = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "Embedded Systems & IoT",
  "heroSubtitle": "Design robust firmware, master RTOS, and engineer bare-metal microcontroller architectures in this intensive 24-week program.",
  "toolsSubtitle": "Master the modern Embedded & Firmware stack",
  "trackSubtitle": "A dedicated Embedded track tailored to your current experience level.",
  "trackButtonLabel": "Start Your Embedded Career →",
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
      "value": "12+ Prototypes",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "Firmware",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "C",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
    },
    {
      "name": "C++",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
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
      "name": "Raspberry Pi",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg"
    },
    {
      "name": "Arduino",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg"
    },
    {
      "name": "Git",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Firmware Engineers & Junior Embedded Devs",
      "desc": "Write low-level microcontroller code and interact directly with hardware peripherals.",
      "benefits": [
        "Master Embedded C programming and pointer arithmetic",
        "Write bare-metal drivers for GPIO, Interrupts, and Timers",
        "Interface with basic sensors using ADC, I2C, and SPI"
      ],
      "quote": "I want to write code that interacts directly with physical hardware.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Embedded Systems Engineers & RTOS Devs",
      "desc": "Develop complex multitasking applications using Real-Time Operating Systems.",
      "benefits": [
        "Implement deterministic task scheduling using FreeRTOS",
        "Solve concurrency issues using Mutexes and Semaphores",
        "Develop custom Linux device drivers for Embedded Linux environments"
      ],
      "quote": "I need to build concurrent, real-time embedded systems that don't crash.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Systems Architects & Hardware Leads",
      "desc": "Design full embedded device architectures from PCB specification to cloud integration.",
      "benefits": [
        "Design overall Hardware/Software co-architecture and select microprocessors",
        "Implement secure IoT protocols (MQTT/TLS) and Over-The-Air (OTA) updates",
        "Optimize system power consumption and memory footprint"
      ],
      "quote": "My focus is on complete product architecture, reliability, and security.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Advanced C & Microcontroller Architecture",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Advanced C (Pointers, Structs, Bitwise Operations)",
        "Memory Management (Stack, Heap, Memory Mapped I/O)",
        "ARM Cortex-M Architecture Fundamentals",
        "Setting up Toolchains, Cross-compilers, and Debugging (GDB)"
      ],
      "application": "Writing a Bare-Metal Blinky from scratch without libraries"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "Bare-Metal Peripherals & Interrupts",
      "focusLabel": "CURRICULUM",
      "focus": [
        "GPIO configurations and Switch Debouncing",
        "Understanding Interrupt Service Routines (ISRs) and NVIC",
        "Timers, PWM Generation, and Motor Control",
        "Analog to Digital Converters (ADC) and Polling vs Interrupts"
      ],
      "application": "Building a Custom PWM DC Motor Controller"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "Communication Protocols",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Serial Communication basics (UART/USART)",
        "Inter-Integrated Circuit (I2C) for Sensor Interfacing",
        "Serial Peripheral Interface (SPI) for High-Speed data",
        "Introduction to CAN Bus for Automotive applications"
      ],
      "application": "Interfacing an OLED display and BME280 sensor via I2C/SPI"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–16",
      "title": "Real-Time Operating Systems (RTOS)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Introduction to RTOS concepts (Tasks, Schedulers, Context Switching)",
        "FreeRTOS Task Management and Priorities",
        "Inter-Task Communication (Queues)",
        "Synchronization (Mutexes, Semaphores, Spinlocks) avoiding Deadlocks"
      ],
      "application": "Developing a Multitasking Data Logger with FreeRTOS"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 17–20",
      "title": "Embedded Linux & IoT",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Embedded Linux Architecture (Bootloader, Kernel, RootFS)",
        "Yocto Project / Buildroot Basics",
        "Writing basic Linux Character Device Drivers",
        "IoT Connectivity: MQTT, WiFi (ESP32), and JSON parsing"
      ],
      "application": "Deploying a Networked Sensor Node sending telemetry to AWS IoT"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 21–24",
      "title": "System Integration & Capstone",
      "focusLabel": "CURRICULUM",
      "focus": [
        "System Integration, Logic Analyzers, and Hardware Debugging",
        "Power Optimization techniques (Sleep Modes)",
        "Embedded System Security & OTA Update strategies",
        "Technical Interview Prep (Coding, Whiteboarding) & Placement"
      ],
      "application": "Final End-to-End Embedded Device Prototype"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "Cpu",
      "title": "Smart Home RTOS Controller",
      "desc": "Develop firmware for a central thermostat hub using FreeRTOS to manage multiple sensor tasks and an LCD UI concurrently.",
      "tools": [
        "C",
        "FreeRTOS",
        "ARM Cortex-M"
      ]
    },
    {
      "icon": "Network",
      "title": "Industrial CAN Bus Node",
      "desc": "Implement a CAN bus communication network between two microcontrollers to simulate automotive telemetry data exchange.",
      "tools": [
        "C++",
        "CAN Protocol",
        "Transceivers"
      ]
    },
    {
      "icon": "Layers",
      "title": "Custom Linux Device Driver",
      "desc": "Write a custom Linux character device driver to read data from a specific hardware peripheral on a Raspberry Pi.",
      "tools": [
        "Linux Kernel",
        "C",
        "Raspberry Pi"
      ]
    },
    {
      "icon": "Target",
      "title": "Secure AWS IoT Sensor Node",
      "desc": "Program an ESP32 to read environmental data, package it as JSON, and securely publish it to AWS IoT Core over MQTT via TLS.",
      "tools": [
        "ESP32",
        "MQTT",
        "AWS IoT"
      ]
    }
  ],
  "faqData": [
    {
      "q": "What is the duration of the program?",
      "a": "The program runs for 24 weeks (6 months), 100% online."
    },
    {
      "q": "Do I need to buy hardware?",
      "a": "While we highly recommend purchasing an inexpensive STM32 or ESP32 development board (~$15), we also utilize powerful hardware simulators like Wokwi for learning."
    },
    {
      "q": "Is prior programming knowledge required?",
      "a": "A basic understanding of C or C++ is highly recommended, as we dive deep into pointers and memory management very quickly."
    },
    {
      "q": "What is the difference between Embedded Systems and IoT?",
      "a": "Embedded Systems focuses on the localized hardware and firmware (microcontrollers). IoT extends this by connecting these embedded systems to the internet (Cloud/MQTT)."
    },
    {
      "q": "Will I learn Arduino?",
      "a": "We use the Arduino platform initially for rapid prototyping, but we quickly move on to professional Bare-Metal C programming and RTOS which is required in the industry."
    },
    {
      "q": "Is placement assistance provided?",
      "a": "Yes, we provide resume guidance, embedded-specific technical interview preparation, and connect you with core engineering companies."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default EmbeddedSystems;
