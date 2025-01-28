import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const BasicInformation = ({ onNext, formData, currentStep }: { onNext: (data: any) => void; formData: any; currentStep: string }) => {
    const user = usePage().props.auth.user;
    const profile = (user as any).profile;
    const { basic_information } = profile;

    const { data, setData, post, processing, errors } = useForm({
        phone: basic_information?.phone || '',
        location:basic_information?.location || '',
        bio:basic_information?.bio || '',
    });
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/profile/setup/${currentStep}`, {
            onSuccess: () => {
                onNext({ basic_information: data });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="phone" value="Phone Number" />
                <TextInput
                    id="phone"
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.phone} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="location" value="Location" />
                <TextInput
                    id="location"
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.location} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="bio" value="Professional Bio" />
                <textarea
                    id="bio"
                    name="bio"
                    value={data.bio || data.bio || ''}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-[#355E3B] focus:ring-[#355E3B] transition-colors"
                    placeholder="Tell us about your professional background..."
                />
                <InputError message={errors.bio} className="mt-2" />
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

export default BasicInformation;
