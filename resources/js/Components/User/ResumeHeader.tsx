import React from 'react';
import { LinkIcon, PhoneIcon, PencilIcon } from '@heroicons/react/24/outline';

interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    location: string;
    github?: string;
}

interface ResumeHeaderProps {
    personalInfo: PersonalInfo;
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
}

export default function ResumeHeader({ personalInfo, isEditing, onEdit, onSave }: ResumeHeaderProps) {
    return (
        <div className="relative">
            <button
                onClick={onEdit}
                className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700"
            >
                <PencilIcon className="h-5 w-5" />
            </button>
            {isEditing ? (
                <div>
                    <div id="header"></div>
                    <button
                        onClick={onSave}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {personalInfo.name}
                    </h1>
                    <div className="flex justify-center items-center space-x-4 text-gray-600 dark:text-gray-300">
                        <a href={`mailto:${personalInfo.email}`} className="flex items-center">
                            <span>{personalInfo.email}</span>
                        </a>
                        <span>|</span>
                        <a href={`tel:${personalInfo.phone}`} className="flex items-center">
                            <PhoneIcon className="h-4 w-4 mr-1" />
                            <span>{personalInfo.phone}</span>
                        </a>
                        {personalInfo.github && (
                            <>
                                <span>|</span>
                                <a href={personalInfo.github} className="flex items-center" target="_blank" rel="noopener noreferrer">
                                    <LinkIcon className="h-4 w-4 mr-1" />
                                    <span>GitHub</span>
                                </a>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}