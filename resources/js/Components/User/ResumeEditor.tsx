import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ResumeEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    personalInfo?: {
        name: string;
        email: string;
        phone: string;
        github?: string;
    };
}

export default function ResumeEditor({ content, onChange, placeholder, personalInfo }: ResumeEditorProps) {
    const defaultContent = `
        <h1 style="text-align: center;">${personalInfo?.name || 'Your Name'}</h1>
        <p style="text-align: center;">
            ${personalInfo?.email || 'email@example.com'} | 
            ${personalInfo?.phone || 'Phone Number'} 
            ${personalInfo?.github ? `| <a href="${personalInfo.github}">GitHub</a>` : ''}
        </p>
    `;

    useEffect(() => {
        if (!content) {
            onChange(defaultContent);
        }
    }, []);
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4,5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link'
    ];

    return (
        <div className="resume-editor">
            <ReactQuill
               theme="snow"
               value={content || defaultContent}
               onChange={onChange}
               modules={modules}
               formats={formats}
               placeholder={placeholder}
               className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <style jsx global>{`
                .resume-editor .ql-container {
                    min-height: 200px;
                    font-size: 16px;
                }
                .resume-editor .ql-editor {
                    padding: 20px;
                }
                .resume-editor .ql-toolbar {
                    border-radius: 4px 4px 0 0;
                    background-color: #f3f4f6;
                }
                .dark .resume-editor .ql-toolbar {
                    background-color: #374151;
                    border-color: #4b5563;
                }
                .dark .resume-editor .ql-container {
                    border-color: #4b5563;
                }
                .dark .resume-editor .ql-stroke {
                    stroke: #9ca3af;
                }
                .dark .resume-editor .ql-fill {
                    fill: #9ca3af;
                }
                .dark .resume-editor .ql-picker {
                    color: #9ca3af;
                }
                .resume-editor .ql-container {
                    border-radius: 0 0 4px 4px;
                }
            `}</style>
        </div>
    );
}