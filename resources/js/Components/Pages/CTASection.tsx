import React from 'react';
import { Link } from '@inertiajs/react';

const CTASection: React.FC = () => {
    return (
        <section className="relative py-0 px-0">
            {/* <div className="bg-[#2E2E2E] rounded-3xl mx-8"></div> */}
            
            <div className="relative max-w-7xl rounded-3xl mx-auto bg-[#2E2E2E] py-20 px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-2/3">
                        <span className="text-[#918D0D] font-medium">TRY IT NOW</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                            Ready to level up your<br />
                            career journey?
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl">
                            Join thousands of job seekers who have transformed their careers with our 
                            AI-powered platform, professional tools, and expert guidance.
                        </p>
                    </div>

                    <div className="md:w-1/3 flex flex-col md:flex-row gap-4">
                        <Link
                            href={route('register')}
                            className="px-6 py-3 bg-[#355E3B] text-white font-medium rounded-lg 
                                     hover:bg-[#918D0D] transition-colors text-center"
                        >
                            Get Started Now
                        </Link>
                        <Link
                            href={route('login')}
                            className="px-6 py-3 border border-white text-white font-medium 
                                     rounded-lg hover:bg-white hover:text-[#2E2E2E] transition-colors 
                                     flex items-center justify-center gap-2"
                        >
                            Learn More
                            <svg 
                                className="w-5 h-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;