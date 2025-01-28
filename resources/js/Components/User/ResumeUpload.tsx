import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ResumeEditor from './ResumeEditor';

const ResumeUpload: React.FC = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const { data, setData, post, progress } = useForm({
        resume: null as File | null,
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setData('resume', event.target.files[0]);
            setFileName(event.target.files[0].name);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/resume/upload');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Your Resume</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Choose File</label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    />
                    {fileName && <p className="text-sm text-gray-600 mt-2">Selected: {fileName}</p>}
                </div>

                {progress && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${progress.percentage}%` }}
                        ></div>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-[#355E3B] text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                    Upload
                </button>
            </form>
           
        </div>
    );
};

export default ResumeUpload;
