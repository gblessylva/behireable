import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const ResumeEditor: React.FC = memo(() => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    const defaultContent = {
        ops: [
            {
                insert: "Sylvanus Godbless\n",
                attributes: { bold: true, align: "center", header: 1 },
            },
            {
                insert: "E: gblessylva@gmail.com | P: +2348165414941 | G: github.com/gblessylva\n",
                attributes: { align: "center" }
            },
            { insert: "------------",  },
            { insert: "\n\n" }
        ]
    };

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['link'],
                        ['clean']
                    ],
                },
            });
            
            quillRef.current.setContents(defaultContent);
            setIsMounted(true);
        }

        return () => {
            if (quillRef.current) {
                // Clean up Quill instance
                quillRef.current = null; 
            }
        };
    }, []);

    const handleSave = useCallback(() => {
        if (quillRef.current) {
            const content = quillRef.current.root.innerHTML;
            console.log("Saved Content:", content);
            // API call here
        }
    }, []);

    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    useEffect(() => {
        if (quillRef.current) {
            const debouncedContentChange = debounce((delta: any, oldDelta: any, source: string) => {
                if (source === 'user') {
                    // Handle content change
                    console.log('Content changed');
                }
            }, 500);

            quillRef.current.on('text-change', debouncedContentChange);

            return () => {
                quillRef.current?.off('text-change', debouncedContentChange);
            };
        }
    }, [isMounted]);

    return (
        <div className="p-4 bg-[#f1f1f2]">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Resume Editor</h1>
            <div
                ref={editorRef}
                className="border rounded-md shadow-md p-2 min-h-[300px] bg-white"
            ></div>
            <button
                onClick={handleSave}
                className="mt-4 bg-[#355E3B] text-white px-4 py-2 rounded-md hover:bg-[#2E2E2E] transition-colors"
            >
                Save
            </button>
        </div>
    );
});

ResumeEditor.displayName = 'ResumeEditor';

export default ResumeEditor;
