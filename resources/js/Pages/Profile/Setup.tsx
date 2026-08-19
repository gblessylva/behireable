import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import BasicInformation from '@/Pages/Profile/Steps/BasicInformation';
import ProfessionalDetails from '@/Pages/Profile/Steps/ProfessionalDetails';
import Skills from '@/Pages/Profile/Steps/Skills';
import Preferences from '@/Pages/Profile/Steps/Preferences';
import Education from '@/Pages/Profile/Steps/Education';
import SocialProfiles from '@/Pages/Profile/Steps/SocialProfiles';

interface Profile {
    id?: number;
    user_id?: number;

    basic_information?: Record<string, unknown>;
    experience?: Record<string, unknown>;
    skills?: Record<string, unknown>;
    preferences?: Record<string, unknown>;
    education?: Record<string, unknown>;
    social_profiles?: Record<string, unknown>;

    completed?: boolean;
}

interface SetupStep {
    id: string;
    title: string;
    description: string;
    required: boolean;
}

interface SetupProps {
    profile: Profile | null;
}
const emptyProfile: Profile = {
    basic_information: {},
    experience: {},
    skills: {},
    preferences: {},
    education: {},
    social_profiles: {},
    completed: false,
};
const steps: SetupStep[] = [
    {
        id: 'basic-information',
        title: 'About You',
        description: 'Tell us a little about yourself.',
        required: true,
    },
    {
        id: 'professional-details',
        title: 'Experience',
        description: 'Tell us about your professional experience.',
        required: true,
    },
    {
        id: 'skills',
        title: 'Skills',
        description: 'Add the skills you want employers to find.',
        required: true,
    },
    {
        id: 'preferences',
        title: 'Job Preferences',
        description: 'Tell us what kind of opportunities you want.',
        required: true,
    },
    {
        id: 'education',
        title: 'Education',
        description: 'Add your educational background.',
        required: false,
    },
    {
        id: 'social-profiles',
        title: 'Social Profiles',
        description: 'Add your professional social profiles.',
        required: false,
    },
];

export default function Setup({ profile }: SetupProps) {
    const profileData = profile ?? emptyProfile;
    const [currentStep, setCurrentStep] = useState(0);
    const [processing, setProcessing] = useState(false);

    const step = steps[currentStep];

    /**
     * Move to the next step.
     */
    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((previous) => previous + 1);
            return;
        }

        completeSetup();
    };

    /**
     * Move to the previous step.
     */
    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep((previous) => previous - 1);
        }
    };

    /**
     * Skip an optional step.
     */
    const skipStep = () => {
        if (step.required) {
            return;
        }

        nextStep();
    };

    /**
     * Save the current profile step.
     */
    const saveStep = (data: Record<string, unknown>) => {
        setProcessing(true);

        router.post(
            route('profile.setup.saveStep', {
                step: step.id,
            }),
            {
                data,
            },
            {
                preserveScroll: true,
                preserveState: true,

                onFinish: () => {
                    setProcessing(false);
                },

                onSuccess: () => {
                    nextStep();
                },
            }
        );
    };

    /**
     * Complete profile setup.
     */
    const completeSetup = () => {
        setProcessing(true);

        router.post(
            route('profile.setup.complete'),
            {},
            {
                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    /**
     * Render the current step.
     */
    const renderStep = () => {
        switch (step.id) {
            case 'basic-information':
                return (
                    <BasicInformation
                        profile={profileData}
                        onNext={saveStep}
                        currentStep={step.id}
                    />
                );

            case 'professional-details':
                return (
                    <ProfessionalDetails
                        profile={profileData}
                        onNext={saveStep}
                        processing={processing}
                    />
                );

            case 'skills':
                return (
                    <Skills
                        profile={profileData}
                        onNext={saveStep}
                        processing={processing}
                    />
                );

            case 'preferences':
                return (
                    <Preferences
                        profile={profileData}
                        onNext={saveStep}
                        processing={processing}
                    />
                );

            case 'education':
                return (
                    <Education
                        profile={profileData}
                        onNext={saveStep}
                        processing={processing}
                    />
                );

            case 'social-profiles':
                return (
                    <SocialProfiles
                        profile={profileData}
                        onNext={saveStep}
                        processing={processing}
                    />
                );

            default:
                return null;
        }
    };

    const progress = Math.round(
        ((currentStep + 1) / steps.length) * 100
    );

    return (
    <>
            <Head title="Complete Your Profile" />

            <div className="min-h-screen bg-gray-50 py-10 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-8">
                        <p className="text-sm font-medium text-lime-700 dark:text-lime-500">
                            Build your career profile
                        </p>

                        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                            {step.title}
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {step.description}
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="mb-8">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Step {currentStep + 1} of {steps.length}
                            </span>

                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {progress}%
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                            <div
                                className="h-full rounded-full bg-lime-700 transition-all duration-300"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Step navigation */}
                    <div className="mb-8 hidden gap-2 overflow-x-auto pb-2 md:flex">
                        {steps.map((item, index) => {
                            const active = index === currentStep;
                            const completed = index < currentStep;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        if (index <= currentStep) {
                                            setCurrentStep(index);
                                        }
                                    }}
                                    disabled={index > currentStep}
                                    className={`flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                                        active
                                            ? 'bg-lime-700 text-white'
                                            : completed
                                                ? 'bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-400'
                                                : 'bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-600'
                                    } ${
                                        index > currentStep
                                            ? 'cursor-not-allowed'
                                            : 'cursor-pointer'
                                    }`}
                                >
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs">
                                        {completed ? '✓' : index + 1}
                                    </span>

                                    {item.title}
                                </button>
                            );
                        })}
                    </div>

                    {/* Form */}
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="p-6 sm:p-8">
                            {renderStep()}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800 sm:px-8">

                            <button
                                type="button"
                                onClick={previousStep}
                                disabled={currentStep === 0 || processing}
                                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Back
                            </button>

                            <div className="flex items-center gap-3">

                                {!step.required && (
                                    <button
                                        type="button"
                                        onClick={skipStep}
                                        disabled={processing}
                                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-800"
                                    >
                                        Skip for now
                                    </button>
                                )}

                                {/* 
                                 * The individual step components are responsible
                                 * for displaying their Continue/Save button.
                                 *
                                 * This button area is intentionally kept for
                                 * navigation only.
                                 */}
                            </div>
                        </div>
                    </div>

                    {/* Help text */}
                    <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
                        You can update your profile at any time from Settings.
                    </p>

                </div>
            </div>
            </>
    );
}