import { Head } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import OnboardingProgress from '@/Components/Dashboard/OnboardingProgress';
import OnboardingCard from '@/Components/Dashboard/OnboardingCard';

interface User {
    name: string;
}

interface Profile {
    completed: boolean;
}

interface Resume {
    id: number;
    original_file_name: string;
    created_at: string | null;
}

interface Onboarding {
    profileCompleted: boolean;
    resumeUploaded: boolean;
    resumeAnalyzed: boolean;
    jobMatchesAvailable: boolean;
}

interface DashboardProps {
    user: User;
    profile: Profile;
    resume: Resume | null;
    onboarding: Onboarding;
}

export default function Dashboard({
    user,
    profile,
    resume,
    onboarding,
}: DashboardProps) {
    const onboardingSteps = [
        {
            label: 'Complete your profile',
            completed: onboarding.profileCompleted,
        },
        {
            label: 'Upload your resume',
            completed: onboarding.resumeUploaded,
        },
        {
            label: 'Analyze your resume',
            completed: onboarding.resumeAnalyzed,
        },
        {
            label: 'Explore job matches',
            completed: onboarding.jobMatchesAvailable,
        },
    ];

    return (
        <SidebarLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Dashboard
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Your career journey starts here.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Welcome */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Welcome back, {user.name}
                        </h1>

                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Let's get your career profile ready.
                        </p>
                    </div>

                    {/* Dashboard content */}
                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* Onboarding */}
                        <div className="lg:col-span-2">
                            <OnboardingProgress
                                steps={onboardingSteps}
                            />
                        </div>

                        {/* Resume */}
                        <div>
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Todo
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Complete these steps to get the most out of BeHirable.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <OnboardingCard
                                        title="Complete your profile"
                                        description="Tell us about your experience, skills and career preferences so we can personalize your BeHirable experience."
                                        completed={onboarding.profileCompleted}
                                        href={route('profile.setup')}
                                        actionLabel="Complete Profile"
                                        icon="👤"
                                    />

                                    <OnboardingCard
                                        title="Upload your resume"
                                        description="Upload your latest resume so we can analyze it and help you discover better job opportunities."
                                        completed={onboarding.resumeUploaded}
                                        href={route('resume.new')}
                                        actionLabel="Upload Resume"
                                        icon="📄"
                                    />
                                </div>
                            </div>
                            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">

                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Your Resume
                                </h3>

                                {resume ? (
                                    <div className="mt-5">

                                        <div className="flex items-start gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                                <span className="text-sm">
                                                    📄
                                                </span>
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                    {resume.original_file_name}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    Uploaded resume
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                type="button"
                                                className="w-full rounded-lg bg-lime-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-lime-800"
                                            >
                                                View Resume
                                            </button>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="mt-5">

                                        <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center dark:border-gray-700">

                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                                                <span className="text-lg">
                                                    📄
                                                </span>
                                            </div>

                                            <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                                                No resume uploaded
                                            </h4>

                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                Upload your resume to get started with your career analysis.
                                            </p>

                                            <a
                                                href={route('resume.new')}
                                                className="mt-5 inline-flex items-center justify-center rounded-lg bg-lime-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-lime-800"
                                            >
                                                Upload Resume
                                            </a>

                                        </div>

                                    </div>
                                )}

                            </div>
                            
                        </div>

                    </div>

                </div>
            </div>
        </SidebarLayout>
    );
}