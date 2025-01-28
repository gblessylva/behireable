import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface SkillsPreferencesProps {
    data: {
        skills: string[];
        preferred_work_type: string;
        salary_expectation: string;
    };
    errors: {
        skills?: string;
        preferred_work_type?: string;
        salary_expectation?: string;
    };
    setData: (field: string, value: any) => void;
}

const SkillsPreferences: React.FC<SkillsPreferencesProps> = ({ data, errors, setData }) => {
    return (
        <div className="space-y-6">
            <div>
                <InputLabel htmlFor="skills" value="Skills" />
                <div className="mt-1 flex flex-wrap gap-2">
                    {/* Add skill input and tags implementation */}
                </div>
                <InputError message={errors.skills} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="preferred_work_type" value="Preferred Work Type" />
                <select
                    id="preferred_work_type"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#355E3B] focus:ring-[#355E3B]"
                    value={data.preferred_work_type}
                    onChange={(e) => setData('preferred_work_type', e.target.value)}
                >
                    <option value="">Select Work Type</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                </select>
                <InputError message={errors.preferred_work_type} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="salary_expectation" value="Salary Expectation" />
                <TextInput
                    id="salary_expectation"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.salary_expectation}
                    onChange={(e) => setData('salary_expectation', e.target.value)}
                />
                <InputError message={errors.salary_expectation} className="mt-2" />
            </div>
        </div>
    );
};

export default SkillsPreferences;