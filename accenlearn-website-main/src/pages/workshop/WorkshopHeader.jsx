import React from 'react'
import { FaMicrochip, FaDatabase, FaCode, FaShieldAlt, FaServer, FaBrain, FaCloud, FaUser, FaMoneyBill, FaChartLine, FaFileMedical } from 'react-icons/fa'   
import { FaChartBar, FaBriefcase } from 'react-icons/fa6'    

const WorkshopHeader = ({ title }) => {

    const WORKSHOP_CATEGORIES = [
        {
            title: "AI Engineering",
            icon: FaMicrochip,
        },
        {
            title: "Data Science",
            icon: FaDatabase,
        },
        {
            title: "Data Analytics",
            icon: FaChartLine,
        },
        {
            title: "Full Stack Software Developer",
            icon: FaCode,
        },
        {
            title: "Data Structures and Algorithms (DSA)",
            icon: FaCode,
        },
        {
            title: "Cybersecurity",
            icon: FaShieldAlt,
        },
        {
            title: "DevOps",
            icon: FaServer,
        },
        {
            title: "Machine Learning",
            icon: FaBrain,
        },
        {
            title: "SQL",
            icon: FaDatabase,
        },
        {
            title: "Cloud Fundamentals",
            icon: FaCloud,
        },
        {
            title: "Digital Marketing",
            icon: FaBriefcase,
        },
        {
            title: "Psychology",
            icon: FaBrain,
        },
        {
            title: "Medical Coding",
            icon: FaFileMedical,
        },
        {
            title: "Human Resource",
            icon: FaUser,
        },
        {
            title: "Business Analytics",
            icon: FaChartBar,
        },
        {
            title: "Finance",
            icon: FaMoneyBill,
        },
        {
            title: "Stock Market",
            icon: FaMoneyBill,
        },
        {
            title: "Graphics Designing",
            icon: FaCode,
        },
    ]
    return (
        <div>
            <div className='flex flex-col items-center justify-center gap-2 min-h-[220px] sm:min-h-[300px] bg-gradient-to-tl from-primary to-secondary mt-10 rounded-2xl sm:rounded-3xl p-6 sm:p-10'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center px-2 sm:px-4 leading-tight break-words'>{title}</h1>
            </div>
            <div className='py-5 '>
                <div className="marquee marquee-left">
                    <div className="marquee-track mx-10">
                            {WORKSHOP_CATEGORIES.map((category) => (
                            <div key={category.title} className='px-4 my-4 py-2 bg-white rounded-full shadow-md flex items-center gap-2'>
                                <category.icon size={20} className='inline-block mr-2 text-secondary' />
                                    <p className='text-sm font-bold text-gray-800 text-center'>{category.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkshopHeader