import React from 'react';
import SmartDashboard from './SmartDashboard';

const WhyUsSection: React.FC = () => {
    return (
        <section className="pt-20 px-8 bg-[#fff] pb-20 sm:-mt-[80px] relative">
            <div className="max-w-7xl flex justify-center flex-col items-center mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#918D0D] font-medium">WHY US</span>
                    <div className="flex flex-col mt-6 gap-12">
                        <h2 className="text-4xl font-bold text-[#2E2E2E]">
                            Why Users Prefer Behireable
                        </h2>

                    </div>
                </div>
                <div className='flex flex-row gap-12 flex-wrap w-[95%] sm:w-[90%] '>
                    {/* Create Two Cards with #F5F1E0 as Background */}
                    <div className="flex flex-col sm:flex-row gap:2 sm:gap-10 w-full ">
                        {/* AI-Powered Analysis */}
                        <div className="flex flex-col  w-full sm:w-1/2 bg-[#F5F1E0] p-8 rounded-xl">
                            <div className="w-12 h-12 bg-[#355E3B] rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-[#2E2E2E]">AI-Powered Analysis</h3>
                            <p className="text-[#2E2E2E]">
                                Advanced algorithms analyze your resume and match you with the most relevant job opportunities in real-time.
                            </p>

                        </div>

                        {/* Expert Support */}
                        <div className="flex flex-col w-full mt-4 sm:mt-0 sm:w-1/2 bg-[#F5F1E0] p-8 rounded-xl">
                            <div className="w-12 h-12 bg-[#355E3B] rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-[#2E2E2E]">Expert Support</h3>
                            <p className="text-[#2E2E2E]">
                                Get personalized guidance from career experts who understand your industry and career goals.
                            </p>
                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row items-center  gap-8 justify-between w-full bg-[#F5F1E0] p-8 rounded-xl">
                        <div className="w-full sm:w-1/4">
                            <h3 className="text-xl font-bold text-center sm:text-left mb-4 text-[#2E2E2E]">Smart Dashboard</h3>
                            <p className="text-[#2E2E2E] text-center sm:text-left">
                                Track your application progress, manage interviews, and optimize your job search strategy all in one place.
                            </p>
                        </div>
                        <div className='w-full sm:w-3/4'>
                            <img
                                src="assets/images/mockups/mockup-why-us.png"
                                alt="Smart Dashboard"
                                srcSet="
                                        assets/images/mockups/mockup-why-us-mobile.png 400w,
                                        assets/images/mockups/mockup-why-us-mobile.png 800w,
                                        assets/images/mockups/mockup-why-us.png 1200w
                                    "
                                sizes="
                                        (max-width: 640px) 400px,
                                        (max-width: 1024px) 800px,
                                        1200px
                                    "
                                className="w-full h-[200px] sm:h-full object-contain rounded-xl"
                            />
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default WhyUsSection;