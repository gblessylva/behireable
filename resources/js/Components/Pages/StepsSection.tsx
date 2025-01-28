import { Link } from '@inertiajs/react';
import React from 'react';

const StepsSection: React.FC = () => {
    return (
        <section className="py-20 px-8 bg-[#2E2E2E] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <span className="text-[#918D0D] font-medium">STEPS</span>
                    <div className="mt-6">
                        <h2 className="text-4xl font-bold mb-4">
                            Maximize your career potential<br />
                            with three simple steps.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Step 1 */}
                    <div className="relative bg-[#232222ab] py-6 px-8 rounded-lg">
                        <div className="flex  flex-col items-start gap-0">
                            <h2 className="text-8xl font-bold bg-gradient-to-t from-[#232222] to-[#838996] bg-clip-text  text-transparent p-0 m-0">
                                1
                            </h2>
                            <div className='py-0 -mt-4'>
                                <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
                                <p className="text-gray-300">
                                    Sign up and upload your resume to create your professional profile. 
                                    Our AI will analyze and optimize it for better visibility.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative bg-[#232222ab] py-6 px-8 rounded-lg">
                    <div className="flex  flex-col items-start gap-0">
                        <h2 className="text-8xl font-bold bg-gradient-to-t from-[#232222] to-[#838996] bg-clip-text  text-transparent p-0 m-0">
                                2
                            </h2>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Get Matched</h3>
                                <p className="text-gray-300">
                                    Our system automatically matches your profile with relevant job opportunities 
                                    and provides personalized recommendations.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative bg-[#232222ab] py-6 px-8 rounded-lg">
                    <div className="flex  flex-col items-start gap-0">
                        <h2 className="text-8xl font-bold bg-gradient-to-t from-[#232222] to-[#838996] bg-clip-text  text-transparent p-0 m-0">
                                3
                            </h2>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Track Progress</h3>
                                <p className="text-gray-300">
                                    Monitor your applications, schedule interviews, and manage your entire 
                                    job search journey from one dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* URL Display Box */}
                <div className="mt-16 bg-[#1a1a1a] p-4 rounded-lg max-w-md mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#ff6b6b]"></div>
                            <div className="w-2 h-2 rounded-full bg-[#ffd93d]"></div>
                            <div className="w-2 h-2 rounded-full bg-[#6bff84]"></div>
                        </div>
                        <Link className="text-gray-400 text-sm" href={'/register'}>behireable.com/get-started</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StepsSection;