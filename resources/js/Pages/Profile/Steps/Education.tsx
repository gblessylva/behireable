import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { toast } from 'react-hot-toast';

interface Education {
    school: string;
    degree: string;
    field: string;
    start_date: string;
    end_date: string;
    current: boolean;
}

const Education = ({ onNext, formData, currentStep }: { onNext: (data: any) => void; formData: any; currentStep: string }) => {
    const user = usePage().props.auth.user;
    const profile = (user as any).profile;
    // Fix the data retrieval and ensure it's always an array
    const existingEducation = Array.isArray(profile?.education) 
        ? profile.education 
        : (profile?.education?.education || []);

    const [educationList, setEducationList] = useState<Education[]>(existingEducation);

    const { data, setData, post, processing, errors } = useForm({
        education: educationList
    });

    // Update the form data whenever educationList changes
    React.useEffect(() => {
        setData('education', educationList);
    }, [educationList]);

    const addEducation = () => {
        if (educationList.length >= 5) {
            toast.error('Maximum 5 education entries allowed');
            return;
        }

        setEducationList([...educationList, {
            school: '',
            degree: '',
            field: '',
            start_date: '',
            end_date: '',
            current: false
        }]);
    };

    const removeEducation = (index: number) => {
        const newList = educationList.filter((_, i) => i !== index);
        setEducationList(newList);
        setData('education', newList);
    };

    const updateEducation = (index: number, field: keyof Education, value: string | boolean) => {
        const newList = [...educationList];
        newList[index] = { ...newList[index], [field]: value };
        setEducationList(newList);
        setData('education', newList);
    };

    const handleSubmit = (e: React.FormEvent) => {
        
        e.preventDefault();
        if (educationList.length === 0) {
            toast.error('Please add at least one education entry');
            return;
        }

        post(`/profile/setup/${currentStep}`, {
            onSuccess: (response) => {
                if (response?.props?.flash?.success) {
                    toast.success(response.props.flash.success);
                } 
                onNext({ education: data });
            },
            onError: () => {
                toast.error('Failed to save education details. Please try again.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {educationList.map((edu, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Education #{index + 1}</h3>
                        <button
                            type="button"
                            onClick={() => removeEducation(index)}
                            className="text-red-600 hover:text-red-800"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor={`school-${index}`} value="School/University" />
                            <TextInput
                                id={`school-${index}`}
                                type="text"
                                value={edu.school}
                                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors[`education.${index}.school`]} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor={`degree-${index}`} value="Degree" />
                            <TextInput
                                id={`degree-${index}`}
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors[`education.${index}.degree`]} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor={`field-${index}`} value="Field of Study" />
                            <TextInput
                                id={`field-${index}`}
                                type="text"
                                value={edu.field}
                                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors[`education.${index}.field`]} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor={`start-date-${index}`} value="Start Date" />
                            <TextInput
                                id={`start-date-${index}`}
                                type="month"
                                value={edu.start_date}
                                onChange={(e) => updateEducation(index, 'start_date', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors[`education.${index}.start_date`]} className="mt-2" />
                        </div>

                        {!edu.current && (
                            <div>
                                <InputLabel htmlFor={`end-date-${index}`} value="End Date" />
                                <TextInput
                                    id={`end-date-${index}`}
                                    type="month"
                                    value={edu.end_date}
                                    onChange={(e) => updateEducation(index, 'end_date', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors[`education.${index}.end_date`]} className="mt-2" />
                            </div>
                        )}

                        <div className="col-span-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={edu.current}
                                    onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                                    className="rounded border-gray-300 text-[#355E3B] shadow-sm focus:border-[#355E3B] focus:ring-[#355E3B]"
                                />
                                <span className="ml-2">I currently study here</span>
                            </label>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-center">
                <SecondaryButton
                    type="button"
                    onClick={addEducation}
                    className="border-[#355E3B] text-[#355E3B] hover:bg-[#355E3B] hover:text-white"
                    disabled={educationList.length >= 5}
                >
                    Add Education
                </SecondaryButton>
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

export default Education;