import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import BasicInformation from './Steps/BasicInformation';
import ProfessionalDetails from './Steps/ProfessionalDetails';
import SocialProfiles from './Steps/SocialProfiles';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Skills from './Steps/Skills';
import Preferences from './Steps/Preferences';
import Education from './Steps/Education';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import toast from 'react-hot-toast';

const steps = [
    { id: 'basic-information', title: 'Basic Information' },
    { id: 'professional-details', title: 'Professional Details' },
    { id: 'skills', title: 'Skills' },
    { id:'preferences', title: 'Prefered Work type and Job Location'},
    {id: 'education', title: 'Education'},
    { id: 'social-profiles', title: 'Social Profiles' },
];
// Add new success component
const SetupComplete = () => (
    <div className="text-center py-12">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-[#355E3B]" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Profile Setup Complete!</h2>
        <p className="mt-2 text-gray-600">
            Your professional profile has been successfully created.
        </p>
        <div className="mt-8 space-x-4">
            <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 bg-[#355E3B] hover:bg-[#918D0D] text-white rounded-md transition-colors"
            >
                Go to Dashboard
            </Link>
            <Link
                href="/profile"
                className="inline-flex items-center px-4 py-2 border border-[#355E3B] text-[#355E3B] hover:bg-[#355E3B] hover:text-white rounded-md transition-colors"
            >
                View Profile
            </Link>
        </div>
    </div>
);

const Setup = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    
    // Move useForm to component level
    const { post } = useForm({
        completed: true,
        steps: completedSteps,
    });

    const handleNext = (data: any) => {
        setFormData((prev) => ({ ...prev, ...data }));
        // Add current step to completed steps
        setCompletedSteps(prev => [...prev, steps[currentStep].id]);
        
        if (currentStep < steps.length) {
            setCurrentStep((prev) => prev + 1);
            
            // If this was the last step, send final completion request
            if (currentStep === steps.length - 1) {
                post('/profile/setup/completed', {
                    onSuccess: () => {
                        toast.success('Profile setup completed successfully');
                    },
                    onError: () => {
                        toast.error('Failed to save profile. Please try again.');
                    },
                });
            }
        }
    };

    // Update step indicator to show completion status
    const getStepStatus = (index: number) => {
        if (completedSteps.includes(steps[index].id)) {
            return 'completed';
        }
        if (index === currentStep) {
            return 'current';
        }
        return 'upcoming';
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const StepComponent = () => {
        switch (steps[currentStep].id) {
            case 'basic-information':
                return (
                    <BasicInformation
                        onNext={handleNext}
                        formData={formData}
                        currentStep={'basic-information'}
                    />
                );
            case 'professional-details':
                return (
                    <ProfessionalDetails
                        currentStep='experience'
                        onNext={handleNext}
                        formData={formData}
                    />
                );
            case 'skills':
                return (
                    <Skills
                        onNext={handleNext}
                        formData={formData}
                        currentStep='skills'
                    />
                );
            case 'preferences':
                return (
                    <Preferences
                        onNext={handleNext}
                        formData={formData}
                        currentStep='preferences'
                    />
                );
            case 'education':
                return (
                   <Education
                        onNext={handleNext}
                        formData={formData}
                        currentStep='education'
                    />
                );
            case 'social-profiles':
                return (
                    <SocialProfiles
                        onNext={handleNext}
                        formData={formData}
                        currentStep='social_profiles'
                    />
                );
            default:
                return null;
        }
    };

    return (

        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Complete Your Profile</h2>}
        >
            <Head title="Profile Setup" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                    
                            {currentStep < steps.length ? (
                                <>
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between px-2">
                                            {steps.map((step, index) => (
                                                <div key={step.id} className="flex flex-col items-center flex-1">
                                                    <div className="flex items-center w-full">
                                                        <div
                                                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors
                                                                ${index <= currentStep ? 'bg-[#355E3B] text-white' : 'bg-gray-200'}`}
                                                        >
                                                            {index + 1}
                                                           
                                                        </div>
                                                        {index < steps.length - 1 && (
                                                            <div
                                                                className={`h-1 flex-1 mx-2 transition-colors
                                                                    ${index < currentStep ? 'bg-[#355E3B]' : 'bg-gray-200'}`}
                                                            />
                                                        )}
                                                    </div>
                                                    <span className="mt-2 text-xs text-gray-600">{step.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <h3 className="mt-6 text-center text-xl font-medium text-gray-900">
                                            {steps[currentStep].title}
                                        </h3>
                                    </div>
                                    <StepComponent />
                                    <div className="mt-6 flex justify-between">
                                        {currentStep > 0 && (
                                            <button
                                                className="px-4 py-2 text-[#355E3B] border border-[#355E3B] rounded-md hover:bg-[#355E3B] hover:text-white transition-colors"
                                                onClick={handlePrevious}
                                            >
                                                Previous
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <SetupComplete />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Setup;


