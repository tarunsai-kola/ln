import React, { useEffect } from "react";
import PremiumCourseLayout from "../Components/PremiumCourseLayout";
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";
import heroDsGraphic from "../assets/ds_hero_gold_1.png";
import heroDsGraphic2 from "../assets/ds_hero_gold_2.png";
import heroDsGraphic3 from "../assets/ds_hero_gold_3.png";

const DevOps = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courseData = {
  "heroTitle": "DevOps & Cloud Engineering",
  "heroSubtitle": "Automate CI/CD pipelines, orchestrate Kubernetes clusters, and manage scalable cloud operations in this rigorous 26-week program.",
  "toolsSubtitle": "Master the modern DevOps & Platform stack",
  "trackSubtitle": "A dedicated Platform Engineering track tailored to your current experience level.",
  "trackButtonLabel": "Start Your DevOps Career →",
  "projectLabel": "Infrastructure Project",
  "careerOutcomesDomain": "SoftwareDeveloper",
  "trustStats": [
    {
      "value": "26 Weeks",
      "label": "Duration"
    },
    {
      "value": "100% Online",
      "label": "Format"
    },
    {
      "value": "12+ Pipelines",
      "label": "Hands-on Practice"
    },
    {
      "value": "4 Capstones",
      "label": "Real Projects"
    },
    {
      "value": "Automation",
      "label": "Core Focus"
    }
  ],
  "toolsList": [
    {
      "name": "Docker",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
    },
    {
      "name": "Kubernetes",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg"
    },
    {
      "name": "Jenkins",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg"
    },
    {
      "name": "Git",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
    },
    {
      "name": "Terraform",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg"
    },
    {
      "name": "Ansible",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg"
    },
    {
      "name": "Prometheus",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg"
    },
    {
      "name": "AWS",
      "img": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      "invert": true
    }
  ],
  "careerPaths": [
    {
      "exp": "0–2 Years",
      "title": "Release Engineers & Cloud Admins",
      "desc": "Master the fundamentals of Linux, Git, and automated software delivery.",
      "benefits": [
        "Manage version control workflows and branch strategies in Git",
        "Write Bash/Python scripts to automate daily operational tasks",
        "Build, test, and deploy code using Jenkins and GitHub Actions"
      ],
      "quote": "I want to eliminate manual deployments and start automating software delivery.",
      "image": "careerPath0"
    },
    {
      "exp": "2–6 Years",
      "title": "DevOps & SRE Engineers",
      "desc": "Manage highly available microservices and scalable cloud infrastructure.",
      "benefits": [
        "Containerize legacy applications using Docker and Docker Compose",
        "Deploy and orchestrate fault-tolerant clusters using Kubernetes",
        "Implement Infrastructure as Code (IaC) using Terraform and Ansible"
      ],
      "quote": "I need to manage complex, multi-container clusters and ensure zero-downtime deployments.",
      "image": "careerPath1"
    },
    {
      "exp": "6–10+ Years",
      "title": "Platform Architects & Cloud Leads",
      "desc": "Design enterprise-wide DevOps platforms, security policies, and observability stacks.",
      "benefits": [
        "Design secure DevSecOps pipelines with automated vulnerability scanning",
        "Architect multi-region, highly available cloud infrastructures on AWS/GCP",
        "Implement advanced observability using Prometheus, Grafana, and ELK stack"
      ],
      "quote": "My focus is on platform reliability, cost optimization, and enterprise observability.",
      "image": "careerPath2"
    }
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "PHASE 1",
      "duration": "WEEKS 1–4",
      "title": "Linux Administration & Scripting",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Advanced Linux OS Architecture, File Systems, and Permissions",
        "Shell Scripting (Bash) for task automation",
        "Networking essentials (DNS, Load Balancing, Firewalls)",
        "Python for Systems Administration"
      ],
      "application": "Automated System Backup & Log Rotation Scripts"
    },
    {
      "id": "phase-2",
      "phase": "PHASE 2",
      "duration": "WEEKS 5–8",
      "title": "Version Control & CI/CD",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Advanced Git (Rebase, Cherry-Pick, Workflows)",
        "Continuous Integration Concepts and Artifact Management",
        "Building Pipelines with Jenkins (Declarative & Scripted)",
        "Modern CI/CD with GitHub Actions & GitLab CI"
      ],
      "application": "Automated Build, Test, and Release Pipeline"
    },
    {
      "id": "phase-3",
      "phase": "PHASE 3",
      "duration": "WEEKS 9–12",
      "title": "Containerization with Docker",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Docker Architecture, Images, and Containers",
        "Writing Optimized Dockerfiles & Multi-stage builds",
        "Docker Compose for local multi-container development",
        "Container Registries (DockerHub, AWS ECR)"
      ],
      "application": "Containerizing a Full-Stack MERN Application"
    },
    {
      "id": "phase-4",
      "phase": "PHASE 4",
      "duration": "WEEKS 13–17",
      "title": "Container Orchestration (Kubernetes)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Kubernetes Architecture (Control Plane, Nodes, Pods)",
        "Deployments, Services, Ingress, and ConfigMaps",
        "StatefulSets, Persistent Volumes, and DaemonSets",
        "Package Management with Helm Charts"
      ],
      "application": "Deploying a Fault-Tolerant Microservices Architecture on K8s"
    },
    {
      "id": "phase-5",
      "phase": "PHASE 5",
      "duration": "WEEKS 18–22",
      "title": "Infrastructure as Code (IaC)",
      "focusLabel": "CURRICULUM",
      "focus": [
        "AWS Cloud Fundamentals (EC2, VPC, S3, RDS)",
        "Provisioning Cloud Infrastructure using Terraform",
        "Configuration Management with Ansible",
        "Managing Terraform State and Modules securely"
      ],
      "application": "Automated Multi-Tier AWS Infrastructure Provisioning"
    },
    {
      "id": "phase-6",
      "phase": "PHASE 6",
      "duration": "WEEKS 23–26",
      "title": "Observability & DevSecOps",
      "focusLabel": "CURRICULUM",
      "focus": [
        "Monitoring Metrics with Prometheus & Grafana",
        "Centralized Logging with the ELK Stack (Elasticsearch, Logstash, Kibana)",
        "Integrating Security Scans (Trivy, SonarQube) into Pipelines",
        "SRE Best Practices, Interview Prep, & Placement"
      ],
      "application": "Enterprise Observability Dashboard & DevSecOps Pipeline"
    }
  ],
  "capstoneProjects": [
    {
      "icon": "Workflow",
      "title": "End-to-End Microservices CI/CD",
      "desc": "Build a fully automated Jenkins pipeline that builds Docker images, runs unit tests, and deploys a microservices application to a Kubernetes cluster.",
      "tools": [
        "Jenkins",
        "Docker",
        "Kubernetes"
      ]
    },
    {
      "icon": "Server",
      "title": "AWS Cloud Automation via IaC",
      "desc": "Use Terraform and Ansible to automatically provision a secure Virtual Private Cloud (VPC), configure EC2 instances, and deploy a web server array behind a Load Balancer.",
      "tools": [
        "Terraform",
        "Ansible",
        "AWS"
      ]
    },
    {
      "icon": "ShieldCheck",
      "title": "DevSecOps Security Pipeline",
      "desc": "Implement a GitHub Actions workflow that performs Static Application Security Testing (SAST) and container vulnerability scanning before pushing to production.",
      "tools": [
        "GitHub Actions",
        "Trivy",
        "SonarQube"
      ]
    },
    {
      "icon": "BrainCircuit",
      "title": "SRE Observability Stack",
      "desc": "Deploy Prometheus and Grafana onto a Kubernetes cluster to monitor pod health, resource utilization, and set up automated Slack alerts for system degradation.",
      "tools": [
        "Prometheus",
        "Grafana",
        "Slack API"
      ]
    }
  ],
  "faqData": [
    {
      "q": "What is DevOps?",
      "a": "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle and provide continuous delivery with high software quality."
    },
    {
      "q": "Do I need coding experience?",
      "a": "While DevOps isn't primarily about software engineering, a basic understanding of scripting (Bash, Python) and how code is structured is required. We will teach you the necessary scripting."
    },
    {
      "q": "Is this program focused on AWS?",
      "a": "Yes, our cloud infrastructure modules primarily focus on AWS as it is the industry leader, but the tools we teach (Terraform, Kubernetes, Docker) are cloud-agnostic."
    },
    {
      "q": "What is the difference between DevOps and Full Stack?",
      "a": "Full Stack developers write the application code. DevOps engineers build the automated highways that test, secure, and deploy that code to the cloud."
    },
    {
      "q": "Are there any certifications associated with this?",
      "a": "The curriculum perfectly aligns with the knowledge required for the AWS Certified Solutions Architect and Certified Kubernetes Administrator (CKA) exams."
    },
    {
      "q": "Will you help me get a job?",
      "a": "Yes, our career services team will help you optimize your resume, prepare for technical system design interviews, and connect you with hiring partners."
    }
  ]
};

  courseData.heroImages = [heroDsGraphic, heroDsGraphic2, heroDsGraphic3];
  courseData.careerPaths[0].image = careerPath0;
  courseData.careerPaths[1].image = careerPath1;
  courseData.careerPaths[2].image = careerPath2;

  return <PremiumCourseLayout data={courseData} />;
};

export default DevOps;
