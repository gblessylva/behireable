import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface ProfessionalDetailsProps {
    data: {
        title: string;
        experience_years: string;
        industry: string;
    };
    errors: {
        title?: string;
        experience_years?: string;
        industry?: string;
    };
    setData: (field: string, value: string) => void;
}

const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({ data, errors, setData }) => {
    return (
        <div className="space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Job Title" />
                <TextInput
                    id="title"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="experience_years" value="Years of Experience" />
                <TextInput
                    id="experience_years"
                    type="number"
                    className="mt-1 block w-full"
                    value={data.experience_years}
                    onChange={(e) => setData('experience_years', e.target.value)}
                />
                <InputError message={errors.experience_years} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="industry" value="Industry" />
                <select
                    id="industry"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#355E3B] focus:ring-[#355E3B]"
                    value={data.industry}
                    onChange={(e) => setData('industry', e.target.value)}
                >
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                </select>
                <InputError message={errors.industry} className="mt-2" />
            </div>
        </div>
    );
};

export default ProfessionalDetails;