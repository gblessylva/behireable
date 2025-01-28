import React, { useState } from 'react';

const MissionSection: React.FC = () => {
    const [expandedCard, setExpandedCard] = useState<'plus' | 'premium' | null>(null);

    const plusFeatures = [
        "Resume optimization suggestions",
        "Up to 10 job applications per month",
        "Basic job matching",
        "Email support"
    ];

    const premiumFeatures = [
        "Advanced AI resume optimization",
        "Unlimited job applications",
        "Priority job matching",
        "24/7 priority support",
        "Interview preparation tools",
        "Salary negotiation tips",
        "Career progression tracking"
    ];

    const handleCardClick = (cardType: 'plus' | 'premium') => {
        console.log(cardType);
        setExpandedCard(expandedCard === cardType ? null : cardType);
    };

    return (
        <section className="py-20 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#918D0D] font-medium">OUR MISSION</span>
                    <h2 className="text-4xl font-bold mt-6 mb-4">
                        We've helped thousands<br />
                        secure their dream jobs
                    </h2>
                    <p className="text-[#2E2E2E] text-lg max-w-2xl mx-auto">
                        Job seekers across all industries and experience levels
                        have transformed their careers with our platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                    <div className="flex flex-col items-center">
                        <span className="text-6xl font-bold text-[#355E3B] mb-4">85%</span>
                        <p className="text-[#2E2E2E] text-lg">Success rate</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-6xl font-bold text-[#918D0D] mb-4">50K+</span>
                        <p className="text-[#2E2E2E] text-lg">Job matches made</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-6xl font-bold text-[#B59F3B] mb-4">2X</span>
                        <p className="text-[#2E2E2E] text-lg">Average salary increase</p>
                    </div>
                </div>

                <div className="mt-20">
                    <h3 className="text-center text-lg font-medium text-[#2E2E2E] mb-8">CHOOSE PLAN:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Basic Plan */}
                        <div className={`bg-[#F5F1E0] p-8 rounded-2xl hover:shadow-lg transition-all ${expandedCard === 'plus' ? 'h-auto' : 'h-[160px]'}`}>
                            <div 
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => handleCardClick('plus')}
                            >
                                <h4 className="text-2xl font-bold text-[#2E2E2E]">Plus</h4>
                                <svg 
                                    className={`w-6 h-6 text-[#355E3B] transform transition-transform duration-300 ${expandedCard === 'plus' ? 'rotate-90' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div className="mt-4">
                                <span className="text-3xl font-bold text-[#2E2E2E]">£2.99</span>
                                <span className="text-[#2E2E2E]">/month</span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 'plus' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="mt-6 space-y-3 border-t border-[#2E2E2E]/20 pt-4">
                                    {plusFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#355E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-[#2E2E2E]">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className={`bg-[#355E3B] p-8 rounded-2xl hover:shadow-lg transition-all ${expandedCard === 'premium' ? 'h-auto' : 'h-[160px]'}`}>
                            <div 
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => handleCardClick('premium')}
                            >
                                <h4 className="text-2xl font-bold text-white">Premium</h4>
                                <svg 
                                    className={`w-6 h-6 text-white transform transition-transform duration-300 ${expandedCard === 'premium' ? 'rotate-90' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <div className="mt-4">
                                <span className="text-3xl font-bold text-white">£6.99</span>
                                <span className="text-white">/month</span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 'premium' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="mt-6 space-y-3 border-t border-white/20 pt-4">
                                    {premiumFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-white">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;