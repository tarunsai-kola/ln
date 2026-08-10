import { BsLaptop, BsLaptopFill } from "react-icons/bs";
import {
  FaBook,
  FaFacebook,
  FaFacebookMessenger,
  FaFontAwesomeFlag,
  FaGraduationCap,
  FaIdCard,
  FaIndustry,
  FaInstagram,
  FaLinkedin,
  FaMailBulk,
  FaMapMarkedAlt,
  FaNetworkWired,
  FaPhone,
  FaTwitter,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiCarKey, GiNetworkBars, GiTrophyCup } from "react-icons/gi";
import { IoBagRemove } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { PiBagSimpleBold, PiBagSimpleFill, PiStudentBold } from "react-icons/pi";
import { TbWorldPin } from "react-icons/tb";
import { IMAGE_HELPER } from "./ImageHelper";

export const CONTACT_INFO = [
  {
    id: 1,
    icon: FaPhone,
    type: "phone",
    value: "+91 9344322482",
  },
  {
    id: 2,
    icon: FaMailBulk,
    type: "email",
    value: "accenlearn@gmail.com",
  },
];

export const NAV_ITEMS = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "About",
    link: "/about",
  },
  {
    id: 3,
    name: "Our Team",
    link: "/mentor",
    children: [
      {
        id: 1,
        name: "Mentor",
        link: "/mentor",
      },
      {
        id: 2,
        name: "Leadership",
        link: "/leadership",
      },
      {
        id: 3,
        name: "Collaboration",
        link: "/collaboration",
      },
    ],
  },
  {
    id: 4,
    name: "Contact",
    link: "/contact",
  },
  {
    id: 6,
    name: "Resources",
    link: "/resources/blogs",
    children: [
      {
        id: 1,
        name: "Blogs",
        link: "/resources/blogs",
      },
      {
        id: 2,
        name: "FAQ",
        link: "/resources/faq",
      },
      {
        id: 3,
        name: "Resume Templates",
        link: "/resources/resume-templates",
      },
    ],
  },
  {
    id: 7,
    name: "Portals",
    link: "#",
    children: [
      {
        id: 1,
        name: "Student Portal",
        link: `${import.meta.env.VITE_PORTAL_URL || "http://localhost:5174"}/login`,
      },
      {
        id: 2,
        name: "Admin Portal",
        link: `${import.meta.env.VITE_PORTAL_URL || "http://localhost:5174"}/AdminLogin`,
      },
      {
        id: 3,
        name: "HR Portal",
        link: `${import.meta.env.VITE_PORTAL_URL || "http://localhost:5174"}/hrlogin`,
      },
      {
        id: 4,
        name: "Operations Portal",
        link: `${import.meta.env.VITE_PORTAL_URL || "http://localhost:5174"}/OperationLogin`,
      },
      {
        id: 5,
        name: "Marketing Portal",
        link: `${import.meta.env.VITE_PORTAL_URL || "http://localhost:5174"}/marketing/login`,
      }
    ]
  },
  {
    id: 5,
    name: "Programs",
      link: "/programs/tech/artificial-intelligence",
      children: [
        {
          id: 1,
          name: "Tech/IT Programs",
          link: "/programs/tech/artificial-intelligence",
          children: [
            {
              id: 1,
              name: "Artificial Intelligence",
              link: "/programs/tech/artificial-intelligence",
            
            },
            {
              id: 2,
              name:"Data Structures and Algorithms",
              link: "/programs/tech/data-structures-and-algorithms",
            },
            {
              id: 3,
              name: "Full Stack Software Development",
              link: "/programs/tech/full-stack-software-development",
            }, {
              id: 4,
              name:"Machine Learning",
              link: "/programs/tech/machine-learning",
            },
            {
              id: 5,
              name:"Data Science",
              link: "/programs/tech/data-science",
            },
            {
              id: 7,
              name:"Cloud Computing",
              link: "/programs/tech/cloud-computing",
            },
            {
              id: 8,
              name:"Cyber Security",
              link: "/programs/tech/cyber-security",
            },
            {
              id: 9,
              name: "Data Analytics",
              link: "/programs/tech/data-analytics",
            },
            {
              id: 10,
              name: "DevOps",
              link: "/programs/tech/devops",
            },
            {
              id: 11,
              name: "SQL",
              link: "/programs/tech/sql",
            }
          ]
        },
        {
          id: 2,
          name: "Management Programs",
          link: "/programs/management/digital-marketing",
          children: [
            {
              id: 1,
              name:"Digital Marketing",
              link: "/programs/management/digital-marketing",
            },
            {
              id: 2,
              name:"Human Resource",
              link: "/programs/management/human-resource",
            },
            {
              id: 3,
              name:"Finance",
              link: "/programs/management/finance",
            },
            {
              id: 4,
              name:"Business Analytics",
              link: "/programs/management/business-analytics",
            },
            {
              id: 5,
              name:"Stock Market",
              link: "/programs/management/stock-market",
            },
            {
              id: 6,
              name: "Graphics Designing",
              link: "/programs/management/graphics-designing",
            }
          ]
        },
        {
          id: 3,
          name: "Medical Programs",
          link: "/programs/medical/psychology",
          children: [
            {
              id: 1,
              name:"Psychology",
              link: "/programs/medical/psychology",
            },
            {
              id: 2,
              name:"Medical Coding",
              link: "/programs/medical/medical-coding",
            }
          ]
        }
    ]
  },
];

export const PROGRAMS_DATA = [
  {
    id: 1,
    text: "LIVE & ONLINE CLASSES",
  },
  {
    id: 2,
    text: "EXPERT - LED TRAINING",
  },
  {
    id: 3,
    text: "PRACTICAL EXPERIENCE",
  },
  {
    id: 4,
    text: "CONNECT AND COLLABORATE",
  },
];

export const SOCIAL_ITEMS = [
  {
    id: 1,
    icon: FaInstagram,
    name: "Instagram",
    link: "https://www.instagram.com/accenlearn/",
  },
  {
    id: 2,
    icon: FaLinkedin,
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/accenlearn",
  },
  {
    id: 3,
    icon: FaFacebook,
    name: "Facebook",
    link: "https://www.facebook.com/share/1BWbrXqtvS/",
  },
  {
    id: 5,
    icon: FaXTwitter,
    name: "X (Twitter)",
    link: "https://x.com/Accenlearn",
  },
];

export const SKILL_SETS = [
  {
    id: 1,
    img: "https://lms.rocket-soft.org/store/landing_builder/landing_13/404/points_overlay_1_Eyv.png",
    name: "Students",
    value: 1427,
  },
  {
    id: 2,
    name: "Programs",
    img: "https://lms.rocket-soft.org/store/landing_builder/landing_13/411/testimonials_ksP.png",
    value: 16,
  },
  {
    id: 3,
    name: "Sessions",
    img: "https://lms.rocket-soft.org/store/landing_builder/landing_13/396/subscribe_ZlE.png",
    value: 200,
  },
  {
    id: 4,
    name: "Certified",
    img: "https://lms.rocket-soft.org/store/landing_builder/landing_13/396/subscribe_ZlE.png",
    value: 642,
  },
];

export const ABOUT_DATA = [
  {
    id: 1,
    title: "About ACCENLEARN",
    text: `Accenlearn is a dynamic ed-tech platform dedicated to
transforming education into careers. We bridge the gap
between classroom learning and real-world industry
needs by offering practical skills, internships, and
personalized career guidance. Education isn’t just about
gaining knowledge—it’s about building skills, gaining
experience, and turning aspirations into reality
      
        We are redefining the future of learning through
technology, innovation, and accessibility. Our careerfocused programs, online skill courses in India, and jobready programs combine expert-led training with realworld projects to prepare learners for successful careers.`,
    pic: "https://cdn3d.iconscout.com/3d/premium/thumb/coworkers-doing-office-work-3d-icon-png-download-4096745.png",
  },
  {
    id: 2,
    title: "WHY ACCENLEARN",
    text: `Accenlearn dedicated to making learning smarter, more engaging, and
        accessible for everyone. We combine innovation, technology, and
        creativity to transform the way students, educators, and institutions
        experience education. AccenLearn is committed to helping every
        learner achieve their full potential anytime, anywhere.`,
    pic: "https://img.freepik.com/free-photo/learning-education-ideas-insight-intelligence-study-concept_53876-120116.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    title: "OUR OBJECTIVE",
    text: `We reshape learning to meet the demands of a fast-changing
        professional world. Our goal is to equip students with practical
        skills, expert guidance, and a growth mindset that prepares them for
        real-world challenges. By focusing on hands-on experience and
        continuously updating our programs, we help learners stay ahead of
        industry trends and smoothly transition from education to career.`,
    pic: "https://img.freepik.com/premium-photo/university-students-are-studying-library-together_207634-4513.jpg",
  },
   {
    id: 4,
    title: "Our Vision",
    text: `To transform education into real-world impact through experiential and program-driven learning. We empower learners with future-ready skills by combining knowledge, hands-on programs, and practical application—preparing them to succeed in an ever-evolving digital and professional landscape.`,
    pic: IMAGE_HELPER.ABOUT_2,
  },
   {
    id: 5,
    title: "Our Mission",
    text: `Our mission is to deliver interactive, program-based education that bridges the gap between theory and practice. Through expert-led programs, industry-aligned curriculum, and technology-enabled learning, AccenLearn equips learners with practical skills, critical thinking abilities, and the confidence to apply what they learn in real-world scenarios.`,
    pic: IMAGE_HELPER.ABOUT_3,
  },
];

export const PROGRAM_DATAS = [
  {
    id: 1,
    title: "Beginner-Friendly Learning",
    content: `Courses include live and recorded sessions that cover foundational concepts, making them accessible even to beginners.`,
    icon: FaBook,
  },
  {
    id: 2,
    title: "Interactive Practice",
    content: `Engaging assignments and practical exercises help students strengthen their understanding and apply what they learn.`,
    icon: FaNetworkWired,
  },
  {
    id: 3,
    title: "Hands-On Programs",
    content: ` An immersive program allows learners to work on real-world projects and gain industryrelevant experience.`,
    icon: FaGraduationCap,
  },
  {
    id: 4,
    title: "Personalized Mentorship",
    content: `One-on-one guidance and constructive feedback help students overcome challenges and stay on track.`,
    icon: FaUserTie,
  },
  {
    id: 5,
    title: "Job-Ready Skills",
    content: `The program equips learners with practical skills, confidence, and industry-focused expertise to excel in their chosen careers`,
    icon: FaUserGraduate,
  },
  {
    id: 6,
    title: "Global Certification",
    content: `Earn industry-recognized certificates that validate your expertise and enhance your professional credibility across the global market.`,
    icon: FaIdCard,
  },
];

export const HIRING_DATA = [
  {
    id: 1,
    content: `Explore Industry-Leading Courses to Boost Skills`,
    icon:PiStudentBold,
  },
  {
    id: 2,
    content: "Learn from Experienced Industry Experts.",
 icon:PiBagSimpleBold,
  },
  {
    id: 3,
    content: "Gain Hands-On Experience with Real Projects.",
   icon:BsLaptop ,
  },
  {
    id: 4,
    content: "Get Personalized Placement Support for Dream Job.",
    icon:GiNetworkBars,
  },
];

export const HIRING_DATA2 = [
  {
    id: 1,
    content: `Courses for All Levels`,
   icon:MdLibraryBooks,
  },
  {
    id: 2,
    content: "Success Starts Here ",
  icon:FaFontAwesomeFlag,
  },
  {
    id: 3,
    content: "Flexible Learning",
  icon:TbWorldPin,
  },
  {
    id: 4,
    content: "Unlock Potential",
  icon:GiCarKey,
  },
];

export const SPONSERS_DATA = [
  {
    id: 1,
    pic: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ8-BUfDNLGh2mMg6jE0gVhe04nAAFx_Qnl-Ay2wQ5rDhqmcmY6",
  },
  {
    id: 2,
    pic: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRtvhHCM_JVC5L8MQxGZxA2UsjuzPkxOhXT1LxcYHyvQVc86aDt",
  },
  {
    id: 3,
    pic: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRLjOqEG3xWDga_T-lDe2hq83Svsw-scMB_ONmE4Y9svaJSOmed",
  },
  {
    id: 4,
    pic: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTCO2rHIyp_IJ0hWR0jPqk29XxvT9TiLrnHRdh84-TCfa02ROi_",
  },
];

export const ACCENLEARN_PROVIDES_DATA = [
  {
    id: 1,
    title: "Expert Mentorship",
    content: "Get mentored by top professionals in the field.",
  icon:FaGraduationCap,
  },
  {
    id: 2,
    title: "Customized Paths",
    content: "Programs customized to match your goals and ambitions.",
  icon:FaMapMarkedAlt,
  },
  {
    id: 3,
    title: "Industrial Training",
    content: "Skills designed to meet market and MNC standards.",
  icon:IoBagRemove,
  },
  {
    id: 4,
    title: "Proven Success",
    content: "Alumni excelling in leading global companies.",
  icon:GiTrophyCup,
  },
];

export const WHY_BETTER_DATA = [
  {
    id: 1,
    title: "Industry-Relevant Curriculum",
    content: `Our programs are designed by top industry leaders and experts, ensuring learners gain
practical, in-demand skills aligned with current market needs.`,
icon:FaIndustry,
  },
  {
    id: 2,
    title: "Career-Oriented Learning Approach",
    content: `We focus on job-ready skills, hands-on projects, and real-world applications that help
learners confidently transition from learning to employment.`,
icon:FaIdCard,
  },
  {
    id: 3,
    title: "Proven Placement Success",
    content: `With 300+ alumni successfully placed, AccenLearn has a strong track record of
transforming skills into careers through dedicated placement support.`,
icon:FaNetworkWired,
  },
  {
    id: 4,
    title: "Personalized & Flexible Learning",
    content: `Learn at your own pace with interactive digital content, assessments, and continuous
progress tracking — anytime, anywhere.`,
icon:FaBook,
  },
  {
    id: 5,
    title: "Expert Mentorship & Support",
    content: `Get guidance from experienced mentors, doubt-clearing sessions, and continuous academic
support throughout your learning journey.`,
icon:FaUserTie,
  },
  {
    id: 6,
    title: "Future-Ready Skills",
    content: `Our programs equip learners with technical expertise, problem-solving abilities, and
digital skills essential for today’s evolving professional world.`,
icon:FaUserGraduate,
  },
];



export const openFacebookForm = () => {
  window.location.href = "/internship";
};
