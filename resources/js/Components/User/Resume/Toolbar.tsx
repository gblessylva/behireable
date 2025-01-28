import React from 'react';
import {
    BoldIcon,
    ItalicIcon,
    LinkIcon,
    ListBulletIcon,
    UnderlineIcon,
} from '@heroicons/react/24/outline';
import AlignLeftIcon from '@/Components/Icons/AlignLeftIcon';
import AlignCenterIcon from '@/Components/Icons/AlignCenterIcon';
import AlignRightIcon from '@/Components/Icons/AlignRightIcon';
import AlignJustifyIcon from '@/Components/Icons/AlignJustifyIcon';

interface ToolbarProps {
    onFormatClick: (format: string) => void;
    activeFormats: string[];
}

const Toolbar: React.FC<ToolbarProps> = ({ onFormatClick, activeFormats }) => {
    return (
        <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-white dark:bg-white dark:border-gray-200">
            {/* Undo/Redo */}
            <div className="flex items-center border-r border-gray-200 dark:border-gray-200 pr-2 mr-2">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 10h10a5 5 0 0 1 5 5v2" />
                        <path d="M3 10l6-6" />
                        <path d="M3 10l6 6" />
                    </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 10H11a5 5 0 0 0-5 5v2" />
                        <path d="M21 10l-6-6" />
                        <path d="M21 10l-6 6" />
                    </svg>
                </button>
            </div>
             {/* Heading Selector */}
             <select className="px-8 py-1 border border-gray-200 rounded dark:bg-gray-200 dark:border-gray-100">
                <option value="">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
                <option value="h6">Heading 6</option>
            </select>
            {/* Font Family */}
            <select className="px-4 py-1 border border-gray-200 rounded dark:bg-gray-200 dark:border-gray-100">
                <option>Times New Roman</option>
                <option>Arial</option>
                <option>Helvetica</option>
            </select>

            {/* Font Size */}
            <select className="w-16 px-4 mx-8 py-1 border border-gray-200 rounded dark:bg-gray-200 dark:border-gray-100">
                {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72].map(size => (
                    <option key={size}>{size}</option>
                ))}
            </select>

            {/* Text Formatting */}
            <div className="flex items-center border-l gap-2 border-r border-gray-200 dark:border-gray-400 px-2 mx-2">
                <button 
                    className={`p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded ${
                        activeFormats.includes('bold') ? 'bg-gray-200 dark:bg-gray-100' : ''
                    }`}
                    onClick={() => onFormatClick('bold')}
                >
                    <BoldIcon className="w-4 h-4" />
                </button>
                <button 
                    className={`p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded ${
                        activeFormats.includes('italic') ? 'bg-gray-200 dark:bg-gray-100' : ''
                    }`}
                    onClick={() => onFormatClick('italic')}
                >
                    <ItalicIcon className="w-4 h-4" />
                </button>
                <button 
                    className={`p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded ${
                        activeFormats.includes('underline') ? 'bg-gray-200 dark:bg-gray-100' : ''
                    }`}
                    onClick={() => onFormatClick('underline')}
                >
                    <UnderlineIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Alignment */}
            <div className="flex items-center">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                    <AlignLeftIcon className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                    <AlignCenterIcon className="w-4 h-4" />
        
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                    <AlignRightIcon className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                    <AlignJustifyIcon className="w-4 h-4" />
                    
                </button>
            </div>

            {/* Lists and Link */}
            <div className="flex items-center border-l border-gray-200 dark:border-gray-200 pl-2 ml-2">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                    <ListBulletIcon className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                    <LinkIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toolbar;