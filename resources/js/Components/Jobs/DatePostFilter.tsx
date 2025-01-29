import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

interface DatePostFilterProps {
    value: string;
    onChange: (value: string) => void;
}

const DatePostFilter: React.FC<DatePostFilterProps> = ({ value, onChange }) => {
    const [selectedDate, setSelectedDate] = useState(value || "");

    useEffect(() => {
        if (selectedDate) {
            router.get(route("opportunities.index"), { datePost: selectedDate }, { preserveState: true, replace: true });
        }
    }, [selectedDate]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedDate(newValue);
        onChange(newValue);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date Posted</label>
            <select
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#355E3B] focus:ring-[#355E3B]"
                value={selectedDate}
                onChange={handleChange}
            >
                <option value="">All</option>
                <option value="today">Today</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
            </select>
        </div>
    );
};

export default DatePostFilter;
