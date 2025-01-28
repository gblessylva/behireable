import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Combobox } from '@headlessui/react';
import { toast } from 'react-hot-toast';

const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL',
    'Project Management', 'Data Analysis', 'Marketing', 'Sales',
    'Customer Service', 'Leadership', 'Communication', 'Problem Solving',
];

const Skills = ({ onNext, formData, currentStep }: { onNext: (data: any) => void; formData: any; currentStep: string }) => {
    const user = usePage().props.auth.user;
    const profile = (user as any).profile;
    const existingSkills = profile?.skills?.skills || [];
    const [query, setQuery] = useState('');
    const [selectedSkills, setSelectedSkills] = useState<string[]>(existingSkills);
    
    const { data, setData, post, processing, errors } = useForm({
        skills: existingSkills,
    });

    const filteredSkills = query === ''
        ? commonSkills.filter(skill => !selectedSkills.includes(skill))
        : commonSkills.filter(skill => 
            skill.toLowerCase().includes(query.toLowerCase()) && 
            !selectedSkills.includes(skill)
        );

    const handleSkillSelect = (skill: string) => {
        if (selectedSkills.length >= 10) {
            toast.error('Maximum 10 skills allowed');
            return;
        }
        
        if (!selectedSkills.includes(skill)) {
            const newSkills = [...selectedSkills, skill];
            setSelectedSkills(newSkills);
            setData('skills', newSkills);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
        setSelectedSkills(newSkills);
        setData('skills', newSkills);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/profile/setup/${currentStep}`, {
            
            onSuccess: (response) => {
                if (response?.props?.flash?.success) {
                    toast.success(response.props.flash.success);
                    
                }
                onNext( { skills: data });
            },
            onError: () => {
                toast.error('Failed to save skills. Please try again.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
                <InputLabel htmlFor="skills" value={`Skills (${selectedSkills.length}/10)`} />
                {selectedSkills.length < 10 ? (
                    <Combobox value={null} onChange={handleSkillSelect}>
                        <div className="relative mt-1">
                            <Combobox.Input
                                className="w-full rounded-md border-gray-300 shadow-sm 
                                         focus:border-[#355E3B] focus:ring-[#355E3B] transition-colors"
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search or add skills..."
                            />
                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {filteredSkills.map((skill) => (
                                    <Combobox.Option
                                        key={skill}
                                        value={skill}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                                                active ? 'bg-[#355E3B] text-white' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {skill}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </div>
                    </Combobox>
                ) : (
                    <p className="text-sm text-gray-500 mt-2">
                        Maximum number of skills reached
                    </p>
                )}

                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center gap-1 rounded-full bg-[#355E3B] px-3 py-1 text-sm text-white"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-1 text-white hover:text-red-200"
                                aria-label={`Remove ${skill}`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <InputError message={errors.skills} className="mt-2" />
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

export default Skills;