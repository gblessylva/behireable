import React from 'react';
import FeaturesSection from './FeaturesSection';

const HeroSection: React.FC = () => {
    return (
        <section className="text-white h-screen pb-[100px] py-16 px-8 flex flex-col justify-center items-center bg-[#F5F1E0]"
            style={{
                background: 'url(assets/images/backgrounds/hero-bg-2.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',

            }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                {/* Left Section */}
                 <div className="md:w-1/2 flex flex-col justify-between h-full text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#C4B800] to-[#355E3B] bg-clip-text text-transparent">
                        Be the Candidate Every Employer Wants
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-[#2E2E2E]">
                        Optimize your resume, match with remote opportunities, and beat the ATS—all in one platform.
                    </p>
                    <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                        <button className="px-6 py-3 bg-gradient-to-r from-[#355E3B] to-[#355E3B] text-white font-medium rounded-md shadow-lg hover:opacity-90">
                            Get Started for Free
                        </button>
                        <button className="px-6 py-3 border-2 border-[#355E3B] text-[#355E3B] font-medium rounded-md hover:bg-[#355E3B] hover:text-white transition">
                            How It Works
                        </button>
                    </div>
                </div> 

                {/* Right Section */}
                <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
                    {/* Mockup Image Placeholder */}
                    <img
                        src="assets/images/mockups/mockup-1-large.png"
                        alt="Mockup Image"
                        className="w-full max-w-md"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
