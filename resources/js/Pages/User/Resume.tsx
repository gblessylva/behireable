import { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link } from '@inertiajs/react';
import {
    DocumentTextIcon,
    ChartBarIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';

export default function Resume() {
    const [activeTab, setActiveTab] = useState('current');

    // Dummy data for demonstration
    const resumeScore = {
        overall: 85,
        skills: 90,
        experience: 82,
        education: 88,
        formatting: 80,
    };

    const mockResume = {
        title: "Software Engineer Resume",
        lastUpdated: "2024-01-15",
        status: "Active",
    };

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
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Resumes</p>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">2</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <ChartBarIcon className="h-8 w-8 text-green-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Score</p>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">85%</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <DocumentArrowUpIcon className="h-8 w-8 text-purple-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Today</h3>
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
                                <div className="flex justify-between items-start p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mockResume.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {mockResume.lastUpdated}</p>
                                        <span className="inline-flex items-center px-2.5 py-0.5 mt-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {mockResume.status}
                                        </span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button className="text-gray-400 hover:text-gray-500">
                                            <PencilSquareIcon className="h-5 w-5" />
                                        </button>
                                        <button className="text-gray-400 hover:text-gray-500">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'analysis' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Overall Score */}
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overall Score</h3>
                                        <div className="flex items-center">
                                            <div className="relative h-32 w-32">
                                                <svg className="h-full w-full" viewBox="0 0 36 36">
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        stroke="#E5E7EB"
                                                        strokeWidth="3"
                                                    />
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        stroke="#3B82F6"
                                                        strokeWidth="3"
                                                        strokeDasharray={`${resumeScore.overall}, 100`}
                                                    />
                                                </svg>
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">
                                                    {resumeScore.overall}%
                                                </div>
                                            </div>
                                            <div className="ml-6 space-y-2">
                                                {Object.entries(resumeScore).map(([key, value]) => (
                                                    key !== 'overall' && (
                                                        <div key={key} className="flex items-center">
                                                            <span className="text-sm text-gray-500 dark:text-gray-400 w-24">
                                                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                                                            </span>
                                                            <div className="w-48 h-2 bg-gray-200 rounded-full">
                                                                <div
                                                                    className="h-2 bg-blue-600 rounded-full"
                                                                    style={{ width: `${value}%` }}
                                                                />
                                                            </div>
                                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{value}%</span>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Improvement Suggestions */}
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Suggestions</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">✓</span>
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Add more specific achievements</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">✓</span>
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Include relevant certifications</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">✓</span>
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Optimize keywords for ATS</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-4">
                                <div className="border-l-4 border-blue-500 pl-4 py-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
                                    <p className="text-base text-gray-900 dark:text-white">Updated work experience section</p>
                                </div>
                                <div className="border-l-4 border-gray-300 pl-4 py-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Yesterday</p>
                                    <p className="text-base text-gray-900 dark:text-white">Added new skills</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}