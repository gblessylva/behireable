import { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head } from '@inertiajs/react';
import {
    UserIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    WrenchIcon,
    LanguageIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

interface FormSection {
    title: string;
    icon: any;
    isOpen: boolean;
}

export default function BuildResume() {
    const [sections, setSections] = useState<FormSection[]>([
        { title: 'Personal Information', icon: UserIcon, isOpen: true },
        { title: 'Work Experience', icon: BriefcaseIcon, isOpen: false },
        { title: 'Education', icon: AcademicCapIcon, isOpen: false },
        { title: 'Skills', icon: WrenchIcon, isOpen: false },
        { title: 'Languages', icon: LanguageIcon, isOpen: false },
    ]);

    const [experiences, setExperiences] = useState([{ id: 1 }]);
    const [education, setEducation] = useState([{ id: 1 }]);

    const toggleSection = (index: number) => {
        setSections(sections.map((section, i) => ({
            ...section,
            isOpen: i === index ? !section.isOpen : section.isOpen
        })));
    };

    return (
        <SidebarLayout>
            <Head title="Build Resume" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Build Your Resume</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Fill in your details to create a professional resume</p>
                </div>

                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <div key={section.title} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                            <button
                                onClick={() => toggleSection(index)}
                                className="w-full px-6 py-4 flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <section.icon className="h-6 w-6 text-blue-500 mr-3" />
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                        {section.title}
                                    </h2>
                                </div>
                                <svg
                                    className={`h-5 w-5 transform transition-transform ${section.isOpen ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {section.isOpen && (
                                <div className="px-6 pb-6">
                                    {section.title === 'Personal Information' && (
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {section.title === 'Work Experience' && (
                                        <div className="space-y-6">
                                            {experiences.map((exp, index) => (
                                                <div key={exp.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Company Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Position
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-6">
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            rows={4}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => setExperiences([...experiences, { id: experiences.length + 1 }])}
                                                className="flex items-center text-blue-600 hover:text-blue-700"
                                            >
                                                <PlusIcon className="h-5 w-5 mr-2" />
                                                Add Experience
                                            </button>
                                        </div>
                                    )}

                                    {section.title === 'Education' && (
                                        <div className="space-y-6">
                                            {education.map((edu, index) => (
                                                <div key={edu.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Institution
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Degree
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => setEducation([...education, { id: education.length + 1 }])}
                                                className="flex items-center text-blue-600 hover:text-blue-700"
                                            >
                                                <PlusIcon className="h-5 w-5 mr-2" />
                                                Add Education
                                            </button>
                                        </div>
                                    )}

                                    {section.title === 'Skills' && (
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Add a skill"
                                                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {['React', 'TypeScript', 'Node.js'].map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                                    >
                                                        {skill}
                                                        <button className="ml-2 text-blue-600 hover:text-blue-700">
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {section.title === 'Languages' && (
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Language
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Proficiency
                                                </label>
                                                <select
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                                >
                                                    <option>Basic</option>
                                                    <option>Intermediate</option>
                                                    <option>Advanced</option>
                                                    <option>Native</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        >
                            Preview
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Resume
                        </button>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}