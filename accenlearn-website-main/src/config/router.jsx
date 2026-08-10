import { createBrowserRouter, Navigate, useParams } from "react-router-dom";

const RedirectToPrograms = () => {
  const { category, slug } = useParams();
  return <Navigate to={`/programs/${category}/${slug}`} replace />;
};


import Layout from "../layout/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import Aboutindex from "../pages/About/Aboutindex.jsx";
import Mentor from "../pages/Mentor/Mentor.jsx";
import Workshopindex from "../pages/workshop/Workshop.jsx";
import Workshop2 from "../pages/workshop/Workshop2.jsx";
import Contact from "../pages/contact/Contact.jsx";
import Leadership from "../pages/Leadership/Leadership.jsx";
import Collaboration from "../pages/Collaboration/Collaboration.jsx";
import Internship from "../pages/Internship/Internship.jsx";
import DocumentPreview from "../pages/Home/DocumentPreview.jsx";
import Blogs from "../pages/Resources/Blogs/Blogs.jsx"
import BlogDetails from "../pages/Resources/BlogDetails/BlogDetails.jsx";
import FAQ from "../pages/Resources/FAQ/FAQ.jsx";
import ResumeTemplates from "../pages/Resources/ResumeTemplates/ResumeTemplates.jsx";
import ServicesPage from "../pages/Services/ServicesPage";
import CoursesPage from "../pages/Courses/CoursesPage.jsx";
import CourseDetailsPage from "../pages/Courses/CourseDetailsPage.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/preview",
        element: <DocumentPreview />,
      },
      {
        path: "/about",
        element: <Aboutindex />,
      },
      {
        path: "/mentor",
        element: <Mentor />,
      },
      {
        path: "/workshops/:category/:slug",
        element: <RedirectToPrograms />,
      },
      {
        path: "/workshops/:category",
        element: <Navigate to="/programs" replace />,
      },
      {
        path: "/workshops",
        element: <Navigate to="/programs" replace />,
      },
      {
        path: "/programs/tech/artificial-intelligence",
        element: <Workshop2 title="Artificial Intelligence" />
      },
      {
        path: "/programs/tech/data-structures-and-algorithms",
        element: <Workshop2 title="Data Structures and Algorithms" />
      }, {
        path: "/programs/tech/full-stack-software-development",
        element: <Workshop2 title="Full Stack Software Development" />
      }, {
        path: "/programs/tech/machine-learning",
        element: <Workshop2 title="Machine Learning" />
      }, {
        path: "/programs/tech/data-science",
        element: <Workshop2 title="Data Science" />
      }, {
        path: "/programs/tech/cloud-computing",
        element: <Workshop2 title="Cloud Computing" />
      }, {
        path: "/programs/tech/cyber-security",
        element: <Workshop2 title="Cyber Security" />
      }, {
        path: "/programs/tech/data-analytics",
        element: <Workshop2 title="Data Analytics" />
      }, {
        path: "/programs/tech/devops",
        element: <Workshop2 title="DevOps" />
      }, {
        path: "/programs/tech/sql",
        element: <Workshop2 title="SQL" />
      }, {
        path: "/programs/management/digital-marketing",
        element: <Workshopindex title="Digital Marketing" />
      }, {
        path: "/programs/management/human-resource",
        element: <Workshopindex title="Human Resource" />
      }, {
        path: "/programs/management/finance",
        element: <Workshopindex title="Finance" />
      }, {
        path: "/programs/management/business-analytics",
        element: <Workshopindex title="Business Analytics" />
      }, {
        path: "/programs/management/stock-market",
        element: <Workshopindex title="Stock Market" />
      }, {
        path: "/programs/management/graphics-designing",
        element: <Workshopindex title="Graphics Designing" />
      }, {
        path: "/programs/medical/psychology",
        element: <Workshopindex title="Psychology" />
      }, {
        path: "/programs/medical/medical-coding",
        element: <Workshopindex title="Medical Coding" />
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
         path: "/leadership",
         element: <Leadership />,
       },
       {
         path: "/collaboration",
         element: <Collaboration />,
       },
       {
         path: "/internship",
         element: <Internship />,
       },{
        path:"/resources/blogs",
        element:<Blogs />
       },{
        path:"/resources/blog/:slug",
        element:<BlogDetails />
       },{
        path:"/resources/faq",
        element:<FAQ />
       },{
        path:"/resources/resume-templates",
        element:<ResumeTemplates />
       },
       {
  path: "/services",
  element: <ServicesPage />,
},
{
  path: "/courses",
  element: <CoursesPage />,
},
{
  path: "/courses/:slug",
  element: <CourseDetailsPage />,
}
     ],
  },
]);
