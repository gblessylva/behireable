import React from 'react';

const FeaturesSection: React.FC = () => {
    return (
        <section className="px-20  flex justify-center items-center min-h-screen bg-white relative">
            <div className="py-8 sm:py-16 px-4 sm:px-20 mx-auto bg-red-900"
                style={{
                    maxWidth: '80%',
                    background: 'rgba(255, 255, 255, 0.39)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(19px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    top: '-60px',
                    position: 'absolute',
                }}
            >
                <div className="text-left flex flex-col mb-16">
                    <span className="text-[#918D0D] font-medium">FUTURE OF JOB SEARCH</span>
                    <div className="text-left flex flex-wrap items-center ">
                        <div className='w-full sm:w-1/2'>
                            <h2 className="text-2xl sm:text-4xl text-[#2E2E2E] font-bold mt-4 mb-6">
                                Experience that grows<br />
                                with your career goals.
                            </h2>
                        </div>
                        <div className='w-full sm:w-1/2'>
                            <p className="text-[#2E2E2E] text-lg max-w-2xl mx-auto">
                                Design your professional journey with an intelligent job matching system
                                that evolves with your career progression
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Resume Optimization */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6">
                            <svg className="w-12 h-12 text-[#B59F3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Resume Optimization</h3>
                        <p className="text-[#2E2E2E]">
                            Upload your resume and get AI-powered suggestions to improve your profile.
                            Our system helps you match ATS requirements and industry standards.
                        </p>
                    </div>

                    {/* Smart Matching */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6">
                            <svg className="w-12 h-12 text-[#B59F3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Smart Job Matching</h3>
                        <p className="text-[#2E2E2E]">
                            Our intelligent system matches your skills and experience with the perfect job opportunities.
                            Get personalized job recommendations that align with your career goals.
                        </p>
                    </div>

                    {/* Application Management */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6">
                            <svg className="w-12 h-12 text-[#B59F3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Application Tracking</h3>
                        <p className="text-[#2E2E2E]">
                            Manage all your job applications in one place. Track status updates,
                            interview schedules, and follow-ups with our comprehensive dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;