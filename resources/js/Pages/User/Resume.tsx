import { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, router } from '@inertiajs/react';
import ConfirmDialog from '@/Components/ConfirmDialog';
import {
    DocumentTextIcon,
    ChartBarIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';

interface Resume {
    id: number;
    original_file_name: string;
    file_path: string;
    created_at: string;
    updated_at: string;
}

interface ResumePageProps {
    resumes: Resume[];
}

export default function Resume({ resumes }: ResumePageProps) {
    const [activeTab, setActiveTab] = useState('current');

    const latestResume = resumes.length > 0
        ? resumes[0]
        : null;

    const [resumeToDelete, setResumeToDelete] =
        useState<ResumeItem | null>(null);

    return (
        <SidebarLayout>
            <Head title="Resume Management" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resume Management</h1>
                    <Link
                        href='/dashboard/resume/add-new'
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add New Resume
                    </Link>
                </div>

                {/* Quick Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <DocumentTextIcon className="h-8 w-8 text-blue-500" />

                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Uploaded Resumes
                                </p>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {resumes.length}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <ChartBarIcon className="h-8 w-8 text-green-500" />

                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Resume Analysis
                                </p>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Not analyzed
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <DocumentArrowUpIcon className="h-8 w-8 text-purple-500" />

                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Last Uploaded
                                </p>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {latestResume
                                        ? new Date(latestResume.created_at).toLocaleDateString()
                                        : 'None'}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">

                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex space-x-8 px-6" aria-label="Tabs">
                            {['current', 'analysis', 'history'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                                        py-4 px-1 border-b-2 font-medium text-sm
                                        ${activeTab === tab
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
                                        }
                                    `}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'current' && (
                            <div className="space-y-6">
                                {resumes.length > 0 ? (
                                    resumes.map((resume) => (
                                        <div
                                            key={resume.id}
                                            className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6 dark:bg-gray-700 md:flex-row md:items-start md:justify-between"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                                                    <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {resume.original_file_name}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                        Uploaded{' '}
                                                        {new Date(
                                                            resume.created_at
                                                        ).toLocaleDateString()}
                                                    </p>

                                                    <span className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                        Uploaded
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <a
                                                    href={`/storage/${resume.file_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white dark:text-gray-200 dark:hover:bg-gray-800"
                                                >
                                                    <DocumentTextIcon className="h-5 w-5" />
                                                    View
                                                </a>

                                                <button
                                                    type="button"
                                                    onClick={() => setResumeToDelete(resume)}
                                                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-white dark:hover:bg-gray-800"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-lg bg-gray-50 px-6 py-12 text-center dark:bg-gray-700">
                                        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />

                                        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                            No resume uploaded
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Upload your resume to start analyzing your experience and
                                            improving your job matches.
                                        </p>

                                        <Link
                                            href={route('resume.new')}
                                            className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                        >
                                            <PlusIcon className="h-5 w-5" />
                                            Upload Resume
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === 'analysis' && (
                            <div className="rounded-lg bg-gray-50 px-6 py-12 text-center dark:bg-gray-700">
                                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />

                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Resume analysis coming next
                                </h3>

                                <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500 dark:text-gray-400">
                                    Once your resume is uploaded, BeHirable will analyze your
                                    experience, skills, formatting and ATS compatibility.
                                </p>

                                {/* {latestResume && (
                                    <Link
                                        href={route('resume.analysis')}
                                        className="mt-6 inline-flex items-center rounded-md bg-gray-400 px-4 py-2 text-sm font-medium text-white"
                                    >
                                        Analysis will be available soon
                                    </Link>
                                )} */}
                            </div>
                        )}

                        {/* History Panenl */}
                        {activeTab === 'history' && (
                            <div className="rounded-lg bg-gray-50 px-6 py-12 text-center dark:bg-gray-700">
                                <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />

                                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Resume history
                                </h3>

                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Resume versions and analysis history will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmDialog
                open={resumeToDelete !== null}
                title="Delete resume?"
                message={
                    resumeToDelete
                        ? `Are you sure you want to delete "${resumeToDelete.original_file_name}"? This action cannot be undone.`
                        : ''
                }
                confirmLabel="Delete Resume"
                cancelLabel="Cancel"
                onCancel={() => setResumeToDelete(null)}
                onConfirm={() => {
                    if (!resumeToDelete) {
                        return;
                    }

                    router.delete(
                        route('resume.destroy', resumeToDelete.id),
                        {
                            onFinish: () => {
                                setResumeToDelete(null);
                            },
                        }
                    );
                }}
            />
        </SidebarLayout>
    );
}