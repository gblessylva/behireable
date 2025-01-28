import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { toast } from 'react-hot-toast';

const SocialProfiles = ({ onNext, formData, currentStep }: { onNext: (data: any) => void; formData: any; currentStep: string }) => {
    const user = usePage().props.auth.user;
    const profile = (user as any).profile;
    const existingSocials = profile?.social_profiles || {};


    const { data, setData, post, processing, errors } = useForm({
        linkedin: existingSocials.linkedin || '',
        github: existingSocials.github || '',
        twitter: existingSocials.twitter || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/profile/setup/${currentStep}`, {
            onSuccess: (response) => {
                if (response?.props?.flash?.success) {
                    toast.success(response.props.flash.success);
                    
                }
                onNext({ social_profiles: data });
            },
            onError: () => {
                toast.error('Failed to save social profiles. Please try again.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="linkedin" value="LinkedIn Profile" />
                <div className="mt-2 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        linkedin.com/in/
                    </span>
                    <TextInput
                        id="linkedin"
                        type="text"
                        name="linkedin"
                        value={data.linkedin}
                        onChange={(e) => setData('linkedin', e.target.value)}
                        className="rounded-none rounded-r-md"
                        placeholder="username"
                    />
                </div>
                <InputError message={errors.linkedin} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="github" value="GitHub Profile" />
                <div className="mt-2 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        github.com/
                    </span>
                    <TextInput
                        id="github"
                        type="text"
                        name="github"
                        value={data.github}
                        onChange={(e) => setData('github', e.target.value)}
                        className="rounded-none rounded-r-md"
                        placeholder="username"
                    />
                </div>
                <InputError message={errors.github} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="twitter" value="Twitter Profile" />
                <div className="mt-2 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        twitter.com/
                    </span>
                    <TextInput
                        id="twitter"
                        type="text"
                        name="twitter"
                        value={data.twitter}
                        onChange={(e) => setData('twitter', e.target.value)}
                        className="rounded-none rounded-r-md"
                        placeholder="username"
                    />
                </div>
                <InputError message={errors.twitter} className="mt-2" />
            </div>

            <div className="flex justify-end">
                <PrimaryButton
                    type="submit"
                    className="bg-[#355E3B] hover:bg-[#918D0D] transition-colors"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Complete Profile'}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default SocialProfiles;
