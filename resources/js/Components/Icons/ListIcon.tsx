import React from 'react';

interface ListIconProps {
    className?: string;
}

const ListIcon: React.FC<ListIconProps> = ({ className = "w-6 h-6" }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <circle cx="3" cy="6" r="1" />
            <circle cx="3" cy="12" r="1" />
            <circle cx="3" cy="18" r="1" />
        </svg>
    );
};

export default ListIcon;