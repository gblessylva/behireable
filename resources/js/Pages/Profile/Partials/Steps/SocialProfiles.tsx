import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface SocialProfilesProps {
    data: {
        linkedin_url: string;
        github_url: string;
        portfolio_url: string;
    };
    errors: {
        linkedin_url?: string;
        github_url?: string;
        portfolio_url?: string;
    };
    setData: (field: string, value: string) => void;
}

const SocialProfiles: React.FC<SocialProfilesProps> = ({ data, errors, setData }) => {
    return (
        <div className="space-y-6">
            <div>
                <InputLabel htmlFor="linkedin_url" value="LinkedIn Profile" />
                <TextInput
                    id="linkedin_url"
                    type="url"
                    className="mt-1 block w-full"
                    value={data.linkedin_url}
                    onChange={(e) => setData('linkedin_url', e.target.value)}
                />
                <InputError message={errors.linkedin_url} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="github_url" value="GitHub Profile" />
                <TextInput
                    id="github_url"
                    type="url"
                    className="mt-1 block w-full"
                    value={data.github_url}
                    onChange={(e) => setData('github_url', e.target.value)}
                />
                <InputError message={errors.github_url} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="portfolio_url" value="Portfolio Website" />
                <TextInput
                    id="portfolio_url"
                    type="url"
                    className="mt-1 block w-full"
                    value={data.portfolio_url}
                    onChange={(e) => setData('portfolio_url', e.target.value)}
                />
                <InputError message={errors.portfolio_url} className="mt-2" />
            </div>
        </div>
    );
};

export default SocialProfiles;