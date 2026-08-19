import { Head } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import OnboardingProgress from '@/Components/Dashboard/OnboardingProgress';

export default function Dashboard() {
    const onboardingSteps = [
        {
            label: 'Create your account',
            completed: true,
        },
        {
            label: 'Complete your profile',
            completed: false,
        },
        {
            label: 'Upload your resume',
            completed: false,
        },
        {
            label: 'Analyze your resume',
            completed: false,
        },
        {
            label: 'Explore job matches',
            completed: false,
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

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Welcome back, Sylvanus
                        </h1>

                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Let's get your career profile ready.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">

                        <div className="lg:col-span-2">
                            <OnboardingProgress
                                steps={onboardingSteps}
                            />
                        </div>

                        <div>
                            {/* Resume card */}
                        </div>

                    </div>

                </div>
            </div>
        </SidebarLayout>
    );
}