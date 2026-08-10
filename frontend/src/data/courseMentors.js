import sd1 from "../assets/mentors/sd_mentor_1_1780417103631.png";
import sd2 from "../assets/mentors/sd_mentor_2_1780417118737.png";
import sd3 from "../assets/mentors/sd_mentor_3_1780417138952.png";
import dm1 from "../assets/mentors/dm_mentor_1_1780417153919.png";
import dm2 from "../assets/mentors/dm_mentor_2_1780417167633.png";
import dm3 from "../assets/mentors/dm_mentor_3_1780417182799.png";
import ds1 from "../assets/mentors/ds_mentor_1_1780417198181.png";
import ds2 from "../assets/mentors/ds_mentor_2_1780417226532.png";
import ds3 from "../assets/mentors/ds_mentor_3_1780417243217.png";
import da1 from "../assets/mentors/da_mentor_1_1780417257849.png";
import da2 from "../assets/mentors/da_mentor_2_1780417272835.png";
import da3 from "../assets/mentors/da_mentor_3_1780417289113.png";
import cs1 from "../assets/mentors/cs_mentor_1_1780417304267.png";
import cs2 from "../assets/mentors/cs_mentor_2_1780417325302.png";
import cs3 from "../assets/mentors/cs_mentor_3_1780417347928.png";
import aifs1 from "../assets/mentors/aifs_mentor_1_1780417363619.png";
import aifs2 from "../assets/mentors/aifs_mentor_2_1780417380519.png";

// Using Unsplash realistic placeholders for the remaining 4 due to API quota limits
const aifs3 = "/newimages/piece_90.png";
const genai1 = "/newimages/piece_91.png";
const genai2 = "/newimages/piece_92.png";
const genai3 = "/newimages/piece_93.png";

export const courseMentors = {
  SoftwareDeveloper: [
    { id: 1, name: "Arjun Rao", role: "Senior Software Engineer", company: "Tech Mahindra", bio: "Arjun brings over 10 years of experience building scalable systems. He has a passion for mentoring juniors in modern MERN stacks.", rating: "4.9", reviews: "Incredible guidance", image: sd1 },
    { id: 2, name: "Priya Desai", role: "Frontend Architect", company: "Infosys", bio: "Priya specializes in React and advanced frontend architectures. She helps students bridge the gap between academic theory and practical applications.", rating: "4.8", reviews: "Highly recommended", image: sd2 },
    { id: 3, name: "Kunal Sharma", role: "Tech Lead", company: "Wipro", bio: "Kunal is a tech lead who focuses on system design and clean code practices. He has mentored over 500 aspiring software developers.", rating: "5.0", reviews: "Top rated mentor", image: sd3 }
  ],
  DigitalMarketing: [
    { id: 4, name: "Ananya Singh", role: "Digital Marketing Strategist", company: "Ogilvy India", bio: "Ananya has led award-winning digital marketing campaigns. She teaches advanced SEO, SEM, and social media strategies.", rating: "4.9", reviews: "Industry expert", image: dm1 },
    { id: 5, name: "Vikram Mehta", role: "Marketing Manager", company: "Flipkart", bio: "Vikram specializes in growth hacking and data-driven marketing. He guides students on practical aspects of digital customer acquisition.", rating: "4.8", reviews: "Great insights", image: dm2 },
    { id: 6, name: "Neha Gupta", role: "SEO Specialist", company: "TCS Interactive", bio: "Neha is a core SEO expert focusing on organic growth and search engine analytics. She helps students master Google algorithms.", rating: "4.9", reviews: "Highly recommended", image: dm3 }
  ],
  DataScience: [
    { id: 7, name: "Siddharth Verma", role: "Lead Data Scientist", company: "Fractal Analytics", bio: "Siddharth has a decade of experience in predictive modeling and deep learning, making complex data structures accessible to students.", rating: "5.0", reviews: "Top rated mentor", image: ds1 },
    { id: 8, name: "Kavya Iyer", role: "Data Scientist", company: "Mu Sigma", bio: "Kavya specializes in statistical analysis and machine learning. She is passionate about teaching python-based data solutions.", rating: "4.8", reviews: "Very supportive", image: ds2 },
    { id: 9, name: "Rohan Kapoor", role: "Machine Learning Engineer", company: "Amazon India", bio: "Rohan builds robust ML pipelines and guides students on deploying their models to production using AWS.", rating: "4.9", reviews: "Excellent mentor", image: ds3 }
  ],
  DataAnalytics: [
    { id: 10, name: "Simran Kaur", role: "Data Analyst", company: "Deloitte", bio: "Simran is an expert in SQL, Tableau, and PowerBI. She mentors students on turning raw data into compelling business stories.", rating: "4.9", reviews: "Great teacher", image: da1 },
    { id: 11, name: "Aditya Nair", role: "Business Intelligence Analyst", company: "Accenture", bio: "Aditya specializes in enterprise business intelligence solutions, providing hands-on projects and career advice to analytics students.", rating: "4.8", reviews: "Highly recommended", image: da2 },
    { id: 12, name: "Nidhi Patel", role: "Analytics Manager", company: "Genpact", bio: "Nidhi leads data teams and teaches advanced Excel and Python for data analytics, focusing on real-world datasets.", rating: "5.0", reviews: "Top rated mentor", image: da3 }
  ],
  Cybersecurity: [
    { id: 13, name: "Varun Reddy", role: "Security Architect", company: "IBM Security", bio: "Varun has 12 years of experience in network security and cryptography. He guides students through complex penetration testing labs.", rating: "4.9", reviews: "Industry expert", image: cs1 },
    { id: 14, name: "Meera Joshi", role: "Ethical Hacker", company: "Cisco Systems", bio: "Meera is an expert in ethical hacking and vulnerability assessments. She provides practical, hands-on mentorship in cybersecurity.", rating: "4.8", reviews: "Very supportive", image: cs2 },
    { id: 15, name: "Rahul Chauhan", role: "Cybersecurity Analyst", company: "Palo Alto Networks", bio: "Rahul focuses on threat intelligence and incident response, teaching students how to defend against modern cyber attacks.", rating: "4.9", reviews: "Highly recommended", image: cs3 }
  ],
  AIFullStack: [
    { id: 16, name: "Divya Krishnan", role: "AI Full Stack Developer", company: "Accenlearn", bio: "Divya integrates generative AI into modern web applications. She mentors students on building full-stack platforms with AI APIs.", rating: "5.0", reviews: "Top rated mentor", image: aifs1 },
    { id: 17, name: "Anil Kumar", role: "AI Engineer", company: "Google India", bio: "Anil specializes in deploying scalable AI solutions. He guides students on backend architecture and ML model integration.", rating: "4.9", reviews: "Excellent mentor", image: aifs2 },
    { id: 18, name: "Riya Sharma", role: "Cloud Architect", company: "Microsoft India", bio: "Riya is a cloud expert who helps students deploy AI applications effectively on Azure and AWS.", rating: "4.8", reviews: "Highly recommended", image: aifs3 }
  ],
  AgenticAndGenAI: [
    { id: 19, name: "Karan Singhania", role: "Generative AI Expert", company: "OpenAI Labs (India)", bio: "Karan leads cutting-edge research in generative AI and mentors students on creating complex agentic workflows.", rating: "5.0", reviews: "Industry expert", image: genai1 },
    { id: 20, name: "Shruti Agarwal", role: "AI Researcher", company: "TCS Research", bio: "Shruti focuses on fine-tuning LLMs and NLP applications. She provides deep technical guidance on state-of-the-art AI.", rating: "4.9", reviews: "Incredible guidance", image: genai2 },
    { id: 21, name: "Manish Tiwari", role: "LLM Engineer", company: "Hugging Face", bio: "Manish is heavily involved in the open-source AI community and teaches students how to build robust GenAI tools.", rating: "4.9", reviews: "Highly recommended", image: genai3 }
  ]
};
