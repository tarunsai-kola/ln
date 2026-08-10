import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const CloudComputing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "Cloud Computing & Architecture",
  "heroSubtitle": "Design, deploy, and scale highly available enterprise architectures across AWS, Azure, and GCP in this 24-week program.",
  "toolsSubtitle": "Master the modern Cloud Architect stack",
  "trackSubtitle": "A dedicated Cloud Engineering track tailored to your current experience level.",
  "trackButtonLabel": "Start Your Cloud Career →",
  "projectLabel": "Cloud Architecture Project",
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
      "value": "10+ Architectures",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "Multi-Cloud",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "AWS",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      "invert": true
    },
    {
      "name": "Azure",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg"
    },
    {
      "name": "GCP",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
    },
    {
      "name": "Linux",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
    },
    {
      "name": "Terraform",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg"
    },
    {
      "name": "Docker",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
    },
    {
      "name": "Kubernetes",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg"
    },
    {
      "name": "Python",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Cloud Support Engineers & Administrators",
      "desc": "Master the fundamentals of Linux, networking, and core cloud services (Compute, Storage, IAM).",
      "benefits": [
        "Manage Linux servers, virtual networks, and identity access (IAM)",
        "Provision and scale EC2 instances, S3 buckets, and RDS databases",
        "Monitor cloud health using CloudWatch and basic cost optimization"
      ],
      "quote": "I want to transition from IT support to managing cloud infrastructure.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "Cloud Engineers & DevOps Integration Specialists",
      "desc": "Transition into deploying serverless architectures and containerized microservices.",
      "benefits": [
        "Architect serverless applications using AWS Lambda and API Gateway",
        "Deploy containerized applications on EKS (Kubernetes) and ECS",
        "Implement Infrastructure as Code (IaC) using Terraform"
      ],
      "quote": "I need to build highly available, auto-scaling architectures and automate provisioning.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Enterprise Cloud Architects",
      "desc": "Design hybrid and multi-cloud strategies for large enterprises.",
      "benefits": [
        "Design secure multi-region disaster recovery and high availability plans",
        "Migrate monolithic legacy applications to microservices architecture",
        "Lead cloud governance, security compliance, and enterprise FinOps"
      ],
      "quote": "My focus is on enterprise cloud strategy, migration, and architecture design.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Linux & Cloud Fundamentals",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Linux Server Administration & Bash Scripting",
        "Cloud Networking (VPCs, Subnets, Route Tables)",
        "Identity & Access Management (IAM) and Security Groups",
        "Virtual Machines (EC2) and Block Storage (EBS)"
      ],
      "application": "Deploying a Secure Web Server in a Custom VPC"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "Core AWS Architecture",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Object Storage (S3) and Content Delivery (CloudFront)",
        "Relational Databases (RDS) and NoSQL (DynamoDB)",
        "High Availability: Load Balancers (ALB) and Auto Scaling Groups",
        "Monitoring & Auditing (CloudWatch, CloudTrail)"
      ],
      "application": "Architecting a Highly Available 3-Tier Application"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "Serverless & Application Integration",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Serverless Compute with AWS Lambda",
        "API Gateway and Microservices Routing",
        "Message Queues & Pub/Sub (SQS, SNS, EventBridge)",
        "State Machines using AWS Step Functions"
      ],
      "application": "Building an Event-Driven Serverless Data Processing Pipeline"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–16",
      "title": "Containers & Kubernetes (EKS)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Docker Containerization fundamentals",
        "Elastic Container Service (ECS) & Fargate",
        "Kubernetes (K8s) Architecture and Pod Management",
        "Deploying and managing clusters on Amazon EKS"
      ],
      "application": "Migrating a Monolith to Containerized Microservices"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 17–20",
      "title": "Infrastructure as Code & Automation",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Terraform Fundamentals (State, Modules, Providers)",
        "Provisioning multi-tier cloud environments with Terraform",
        "Configuration Management with Ansible",
        "CloudFormation and AWS CDK basics"
      ],
      "application": "Automated Deployment of a Cloud Environment using Terraform"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 21–24",
      "title": "Azure/GCP & Certification Prep",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Multi-Cloud concepts: Azure Virtual Machines & GCP Compute Engine",
        "Azure Active Directory and Google Cloud IAM",
        "Cloud Migration Strategies (Rehost, Refactor, Rearchitect)",
        "Preparation for AWS Certified Solutions Architect (SAA-C03)"
      ],
      "application": "Capstone Project & Multi-Cloud Architecture Review"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "Layers",
      "title": "Highly Available 3-Tier Web Architecture",
      "desc": "Design and deploy a scalable web app across multiple Availability Zones using EC2 Auto Scaling, ALBs, and a Multi-AZ RDS database.",
      "tools": [
        "AWS",
        "Linux",
        "RDS"
      ]
    },
    {
      "icon": "Server",
      "title": "Serverless Image Processing Pipeline",
      "desc": "Build an event-driven application where uploading an image to S3 triggers a Lambda function via EventBridge to resize and store the image.",
      "tools": [
        "AWS Lambda",
        "S3",
        "Python"
      ]
    },
    {
      "icon": "Workflow",
      "title": "Infrastructure as Code Provisioning",
      "desc": "Write Terraform modules to spin up a complete, secure VPC with public/private subnets, NAT Gateways, and Bastion Hosts from scratch.",
      "tools": [
        "Terraform",
        "AWS",
        "Bash"
      ]
    },
    {
      "icon": "Network",
      "title": "Kubernetes Microservices Deployment",
      "desc": "Containerize a Node.js/MongoDB application using Docker and deploy it to a managed Amazon EKS cluster with LoadBalancer services.",
      "tools": [
        "Kubernetes",
        "Docker",
        "EKS"
      ]
    }
  ],
  "faqData": [
    {
      "q": "What is Cloud Computing?",
      "a": "Cloud computing is the delivery of computing services—including servers, storage, databases, networking, and software—over the Internet."
    },
    {
      "q": "Do I need to know how to code?",
      "a": "Extensive software development experience is not required, but you will need to learn scripting (Bash, Python) and markup languages (YAML/JSON) for configuration."
    },
    {
      "q": "Does this program prepare me for certifications?",
      "a": "Yes, the curriculum is heavily aligned with the AWS Certified Solutions Architect - Associate (SAA-C03) certification exam."
    },
    {
      "q": "Why focus on AWS primarily?",
      "a": "AWS currently holds the largest market share in cloud computing. The architectural concepts you learn on AWS transfer directly to Azure and GCP."
    },
    {
      "q": "Will we learn about Serverless?",
      "a": "Absolutely. We have a dedicated phase covering AWS Lambda, API Gateway, and event-driven architecture."
    },
    {
      "q": "How are the labs conducted?",
      "a": "You will perform hands-on labs directly inside the AWS Management Console and via the AWS CLI on your local terminal."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default CloudComputing;
