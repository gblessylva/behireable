import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { router, useForm } from '@inertiajs/react';

const ResumeUpload: React.FC = () => {
    const [dragActive, setDragActive] = useState(false);
    const { data, setData, post, progress, processing, reset, errors } = useForm({
        resume: null as File | null,
    });

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type === 'application/pdf' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setData('resume', file);
        } else {
            toast.error('Please upload a PDF or Word document');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('resume.upload'), {
            onSuccess: () => {
                reset('resume');
                toast.success('Resume uploaded successfully!');
                router.visit(route('resumes'));
            },
            onError: () => {
                toast.error('Failed to upload resume. Please try again.');
            },
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#F5F1E0] mb-4">Upload Your Resume</h2>
                <p className="text-[#F5F1E0]">
                    Let's start by analyzing your resume to match you with the best opportunities
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center
                        ${dragActive ? 'border-[#355E3B] bg-[#355E3B]/5' : 'border-gray-300'}
                        ${data.resume ? 'bg-green-50' : ''}
                        transition-all duration-200 ease-in-out`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="hidden"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                    />

                    <label
                        htmlFor="resume-upload"
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <svg
                            className={`w-12 h-12 mb-4 ${data.resume ? 'text-[#355E3B]' : 'text-gray-400'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        {data.resume ? (
                            <span className="text-[#355E3B] font-medium">
                                {data.resume.name}
                            </span>
                        ) : (
                            <>
                                <span className="text-gray-600 font-medium">
                                    Drag and drop your resume here, or click to browse
                                </span>
                                <span className="text-sm text-gray-500 mt-2">
                                    Supports PDF, DOC, DOCX (max 2MB)
                                </span>
                            </>
                        )}
                    </label>
                </div>

                {progress && typeof progress.percentage === 'number' && (
                    <div className="mt-4">
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                Uploading...
                            </span>

                            <span className="font-medium text-gray-900 dark:text-white">
                                {Math.round(progress.percentage)}%
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                className="h-full rounded-full bg-lime-600 transition-all duration-300"
                                style={{
                                    width: `${progress.percentage}%`,
                                }}
                            />
                        </div>
                    </div>
                )}

                {errors.resume && (
                    <p className="mt-2 text-red-600 text-sm">{errors.resume}</p>
                )}

                <button
                    type="submit"
                    disabled={!data.resume || processing}
                    className={`w-full mt-6 px-6 py-3 rounded-lg font-medium text-white
                        ${data.resume && !processing
                            ? 'bg-[#355E3B] hover:bg-[#918D0D] transition-colors'
                            : 'bg-gray-300 cursor-not-allowed'}
                    `}
                >
                    {processing ? 'Uploading...' : 'Upload Resume'}
                </button>
            </form>
        </div>
    );
};

export default ResumeUpload;