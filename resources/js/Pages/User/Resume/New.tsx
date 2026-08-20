import SidebarLayout from '@/Layouts/SidebarLayout';
import ResumeUpload from '@/Components/ResumeUpload';
import { Head } from '@inertiajs/react';

export default function NewResume() {
    return (
        <SidebarLayout>
            <Head title="Upload Resume" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Add New Resume
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Upload your latest resume to get started with
                        BeHirable's resume analysis and job matching.
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <ResumeUpload />
                </div>
            </div>
        </SidebarLayout>
    );
}