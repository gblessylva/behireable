import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Combobox } from '@headlessui/react';

const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Marketing',
    'Construction',
    'Entertainment',
    'Hospitality',
    'Automotive',
    'Agriculture',
    'Energy',
    'Real Estate',
    'Transportation',
];

const ProfessionalDetails = ({ onNext, formData, currentStep }: { onNext: (data: any) => void; formData: any; currentStep: string }) => {
    const [query, setQuery] = useState('');
    const user = usePage().props.auth.user;
    const profile = (user as any).profile;
    const { experience } = profile || {};

    const { data, setData, post, processing, errors } = useForm({
        title: experience?.title || '',
        experience_years: experience?.experience_years || '',
        industry: experience?.industry || '',
    });

    const filteredIndustries = query === ''
        ? industries
        : industries.filter((industry) =>
            industry.toLowerCase().includes(query.toLowerCase())
        );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/profile/setup/${currentStep}`, {
            onSuccess: (response) => {
                onNext({ experience: data });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Job Title" />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1 block w-full"
                    placeholder="e.g. Senior Software Engineer"
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="experience_years" value="Years of Experience" />
                <TextInput
                    id="experience_years"
                    type="number"
                    name="experience_years"
                    value={data.experience_years}
                    onChange={(e) => setData('experience_years', e.target.value)}
                    className="mt-1 block w-full"
                    min="0"
                    max="50"
                />
                <InputError message={errors.experience_years} className="mt-2" />
            </div>

            <div className="relative">
                <InputLabel htmlFor="industry" value="Industry" />
                <Combobox
                    value={data.industry}
                    onChange={(value) => setData('industry', value)}
                >
                    <div className="relative mt-1">
                        <Combobox.Input
                            className="w-full rounded-md border-gray-300 shadow-sm 
                                     focus:border-[#355E3B] focus:ring-[#355E3B] transition-colors"
                            onChange={(e) => setQuery(e.target.value)}
                            displayValue={(industry: string) => industry}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {filteredIndustries.map((industry) => (
                            <Combobox.Option
                                key={industry}
                                value={industry}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                                        active ? 'bg-[#355E3B] text-white' : 'text-gray-900'
                                    }`
                                }
                            >
                                {industry}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox>
                <InputError message={errors.industry} className="mt-2" />
            </div>

            <div className="flex justify-end">
                <PrimaryButton
                    type="submit"
                    className="bg-[#355E3B] hover:bg-[#918D0D] transition-colors"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Next Step'}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default ProfessionalDetails;
