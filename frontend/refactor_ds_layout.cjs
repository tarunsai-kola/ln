const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'DataScience_Git.jsx');
const destPath = path.join(__dirname, 'src', 'Components', 'PremiumCourseLayout.jsx');

let content = fs.readFileSync(srcPath, 'utf8');

// 1. Remove the static data arrays entirely
content = content.replace(/\/\* ─── Static Data ─── \*\/[\s\S]*?(?=const DataScience = \(\) => {)/, '');

// 2. Change Component Signature
content = content.replace(/const DataScience = \(\) => {/, 'const PremiumCourseLayout = ({ data }) => {');
content = content.replace(/export default DataScience;/, 'export default PremiumCourseLayout;');

// 3. Replace Data References
content = content.replace(/careerPaths/g, 'data.careerPaths');
content = content.replace(/heroImages/g, 'data.heroImages'); 
content = content.replace(/dsPhases/g, 'data.phases');
content = content.replace(/capstoneProjects/g, 'data.capstoneProjects');
content = content.replace(/faqData/g, 'data.faqData');
content = content.replace(/trustStats/g, 'data.trustStats');
content = content.replace(/toolsList/g, 'data.toolsList');

// 4. Replace hardcoded text with props
content = content.replace(/Advanced Data Science \& AI/g, '{data.heroTitle}');
content = content.replace(/Build job-ready skills in Machine Learning, Deep Learning, and AI infrastructure in this intensive 20-week program\./g, '{data.heroSubtitle}');
content = content.replace(/Master the modern Data Science \& AI stack/g, '{data.toolsSubtitle}');
content = content.replace(/A dedicated data science track for every stage of your career\./g, '{data.trackSubtitle}');
content = content.replace(/Start Your Data Career →/g, '{data.trackButtonLabel}');
content = content.replace(/Data Project/g, '{data.projectLabel || "Advanced Project"}');
content = content.replace(/<CareerOutcomes domain="DataScience" \/>/, '{data.careerOutcomesDomain && <CareerOutcomes domain={data.careerOutcomesDomain} />}');

// 5. Fix imports
content = content.replace(/import Certification.*/g, 'import Certification from "../page/AdvanceCourse/Components/Certification";');
content = content.replace(/import ApplyNowButton.*/g, 'import ApplyNowButton from "../page/AdvanceCourse/Components/ApplyNowButton";');
content = content.replace(/import PaymentPlanWidget.*/g, 'import PaymentPlanWidget from "./PaymentPlanWidget";');
content = content.replace(/import AdvancedApplyPopup.*/g, 'import AdvancedApplyPopup from "./AdvancedApplyPopup";');
content = content.replace(/import PremiumCurriculum.*/g, 'import PremiumCurriculum from "./PremiumCurriculum";');
content = content.replace(/import ProgramStatsBar.*/g, 'import ProgramStatsBar from "./ProgramStatsBar";');
content = content.replace(/import TopOnePercent.*/g, 'import TopOnePercent from "./TopOnePercent";');
content = content.replace(/import SalaryGrowth.*/g, 'import SalaryGrowth from "./SalaryGrowth";');
content = content.replace(/import CareerOutcomes.*/g, 'import CareerOutcomes from "./CareerOutcomes";');
content = content.replace(/import MarketLeaders.*/g, 'import MarketLeaders from "./MarketLeaders";');
content = content.replace(/import MeetYourMentors.*/g, 'import MeetYourMentors from "./MeetYourMentors";');
content = content.replace(/import FloatingNav.*/g, 'import FloatingNav from "./FloatingNav";');
content = content.replace(/import AuthorityMarquee.*/g, 'import AuthorityMarquee from "./AuthorityMarquee";');
content = content.replace(/import "\.\/DataScience\.css";/, 'import "../page/VLSI.css";'); // Reusing VLSI.css or similar if it's there

// Remove data.heroImages array and specific imports
content = content.replace(/const data\.heroImages = \[.*?\];/, '');
content = content.replace(/import heroDsGraphic.*?;\n/g, '');
content = content.replace(/import careerPath.*?;\n/g, '');

// 6. Fix the icon map!
const iconMapString = `
  // Map string icon names to actual Lucide components
  const iconMap = {
    ChevronDown, CheckCircle2, TerminalSquare, Network, BrainCircuit,
    ShieldCheck, Workflow, Layers, ArrowRight,
    Briefcase, TrendingUp, Landmark, BarChart3, UserCheck, Code,
    Cpu, Server, MonitorPlay, MessageSquare, Target
  };
`;

content = content.replace(/const \[showPopup, setShowPopup\] = useState\(false\);/, 'const [showPopup, setShowPopup] = useState(false);\n' + iconMapString);

content = content.replace(/\{React\.createElement\(project\.icon, \{/g, '{React.createElement(iconMap[project.icon] || Layers, {');

fs.writeFileSync(destPath, content, 'utf8');
console.log('PremiumCourseLayout.jsx successfully rebuilt from DataScience_Git!');
