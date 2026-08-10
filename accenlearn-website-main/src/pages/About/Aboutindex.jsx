import React from 'react'
import SharedBreadcrumb from '../../components/SharedBreadcrumb'
import About from '../Home/About'
import Objective from '../Home/Objective'
import TitleText from '../../components/TitleText'

const Aboutindex = () => {
    const stats = [
        { label: "Active Learners", value: "3400+" },
        { label: "Skill Courses", value: "370+" },
        { label: "Certified Programs", value: "280+" },
        { label: "Mentors & Trainers", value: "320+" },
    ];
    return (
        <div className='min-h-screen w-full pt-4 sm:pt-6'>
            <SharedBreadcrumb to="/about" title="About" />
            <TitleText title={<h1 className='title_text text-center'>Smart learning solutions, <br />
                Knowledge to career</h1>} description={`At AccenLearn, learning is not just about gaining information—it’s about
                    creating impact. We empower learners to turn education into opportunity,
                    skills into confidence, and ambition into achievement.`} />


            <div className=''>
                <Objective />
            </div>

            <div>
                <section className="w-full pb-20">
                    <div className="max-w-6xl mx-auto grid ">


                        {/* Milestones */}
                        <div>
                          
                            <TitleText title=" Our Milestones & Achievements" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100/80 hover:shadow-lg transition-all"
                                    >
                                        <div className="text-3xl sm:text-4xl font-extrabold text-secondary mb-2">
                                            {item.value}
                                        </div>
                                        <div className="global_text text-sm sm:text-base">
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default Aboutindex