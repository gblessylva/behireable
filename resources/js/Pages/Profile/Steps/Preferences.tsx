import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { toast } from 'react-hot-toast';

const workTypes = [
    { id: 'full-time', label: 'Full Time' },
    { id: 'part-time', label: 'Part Time' },
    { id: 'contract', label: 'Contract' },
    { id: 'freelance', label: 'Freelance' },
];

const workLocations = [
    { id: 'remote', label: 'Remote' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'onsite', label: 'On-site' },
];

const Preferences = ({ onNext, formData, currentStep }: { onNext: (data: any) => void; formData: any; currentStep: string }) => {
    const user = usePage().props.auth.user;
    const profile = (user as any).profile;
    const existingPreferences = profile?.preferences.preferences || [];
    const { data, setData, post, processing, errors } = useForm({
        preferences: existingPreferences.length > 0 ? existingPreferences : [],
        salary_expectation: profile?.preferences?.salary_expectation || '',
    });

    const isSelected = (type: string, category: 'work_type' | 'work_location') => {
        return data.preferences.some(pref => pref.type === type && pref.category === category);
    };

    const handlePreferenceToggle = (type: string, label: string, category: 'work_type' | 'work_location') => {
        const newPreferences = [...data.preferences];
        const existingIndex = newPreferences.findIndex(
            pref => pref.type === type && pref.category === category
        );

        if (existingIndex >= 0) {
            newPreferences.splice(existingIndex, 1);
        } else {
            newPreferences.push({
                type,
                label,
                category,
            });
        }

        setData('preferences', newPreferences);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.preferences.length === 0) {
            toast.error('Please select at least one preference');
            return;
        }

        post(`/profile/setup/${currentStep}`, {
            onSuccess: (response) => {
                if (response?.props?.flash?.success) {
                    toast.success(response.props.flash.success);
                    
                }
                onNext({ preferences: data });
            },
            onError: (error) => {
                toast.error('Failed to save preferences. Please try again.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel value="Preferred Work Type (Select all that apply)" />
                <div className="mt-2 grid grid-cols-2 gap-4">
                    {workTypes.map(type => (
                        <label
                            key={type.id}
                            className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors
                                ${isSelected(type.id, 'work_type')
                                    ? 'border-[#355E3B] bg-[#355E3B]/10 text-[#355E3B]' 
                                    : 'border-gray-200 hover:border-[#355E3B]'}`}
                        >
                            <input
                                type="checkbox"
                                checked={isSelected(type.id, 'work_type')}
                                onChange={() => handlePreferenceToggle(type.id, type.label, 'work_type')}
                                className="hidden"
                            />
                            {type.label}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <InputLabel value="Work Location Preference (Select all that apply)" />
                <div className="mt-2 grid grid-cols-3 gap-4">
                    {workLocations.map(location => (
                        <label
                            key={location.id}
                            className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors
                                ${isSelected(location.id, 'work_location')
                                    ? 'border-[#355E3B] bg-[#355E3B]/10 text-[#355E3B]' 
                                    : 'border-gray-200 hover:border-[#355E3B]'}`}
                        >
                            <input
                                type="checkbox"
                                checked={isSelected(location.id, 'work_location')}
                                onChange={() => handlePreferenceToggle(location.id, location.label, 'work_location')}
                                className="hidden"
                            />
                            {location.label}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <InputLabel htmlFor="salary_expectation" value="Salary Expectation (Annual)" />
                <input
                    type="number"
                    id="salary_expectation"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-[#355E3B] focus:ring-[#355E3B] transition-colors"
                    value={data.salary_expectation}
                    onChange={e => setData('salary_expectation', e.target.value)}
                    placeholder="Enter expected annual salary"
                />
                <InputError message={errors.salary_expectation} className="mt-2" />
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

export default Preferences;