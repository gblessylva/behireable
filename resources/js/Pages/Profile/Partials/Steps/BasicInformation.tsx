import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface BasicInformationProps {
    data: {
        phone: string;
        location: string;
        bio: string;
    };
    setData: (key: string, value: string) => void;
    errors: Record<string, string | undefined>;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ data, setData, errors }) => {
    return (
        <div className="space-y-6">
            {/* Phone Number */}
            <div>
                <InputLabel htmlFor="phone" value="Phone Number" />
                <TextInput
                    id="phone"
                    type="tel"
                    className="mt-1 block w-full"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                />
                <InputError message={errors.phone} className="mt-2" />
            </div>

            {/* Location */}
            <div>
                <InputLabel htmlFor="location" value="Location" />
                <TextInput
                    id="location"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                />
                <InputError message={errors.location} className="mt-2" />
            </div>

            {/* Bio */}
            <div>
                <InputLabel htmlFor="bio" value="Professional Bio" />
                <textarea
                    id="bio"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#355E3B] focus:ring-[#355E3B]"
                    rows={4}
                    value={data.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                />
                <InputError message={errors.bio} className="mt-2" />
            </div>
        </div>
    );
};

export default BasicInformation;
