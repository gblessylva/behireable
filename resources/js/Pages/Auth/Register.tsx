import AuthSidebar from '@/Components/AuthSidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="flex min-h-screen bg-[#fffbeb]">
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold mb-2 text-[#918D0D]">Sign Up to get Started</h1>
                        </div>
                        {/* Social Login Buttons */}
                        <div className="flex gap-4 mb-6">
                            <button className="flex-1 flex items-center justify-center gap-2 p-2 border border-[#B59F3B] rounded-lg hover:bg-[#F5F1E0] bg-white">
                                <img src="assets/images/logos/google.png" alt="Google" className="w-5 h-5" />
                                <span className="text-[#2E2E2E]">Google</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 p-2 border border-[#B59F3B] rounded-lg hover:bg-[#F5F1E0] bg-white">
                                <img src="assets/images/logos/x.webp" alt="Facebook" className="w-5 h-5" />
                                <span className="text-[#2E2E2E]">X</span>
                            </button>
                        </div>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#B59F3B]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#F5F1E0] text-[#2E2E2E]">or continue with email</span>
                            </div>
                        </div>
                        <form onSubmit={submit}>
                            <div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    placeholder='Name'
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    placeholder='Email'
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Confirm Password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-center flex-col">

                                <PrimaryButton className="w-full mb-8" disabled={processing}>
                                    REGISTER
                                </PrimaryButton>

                                <Link
                                    href={route('login')}
                                    className="rounded-md 
                                    text-sm text-[#918D0D] 
                                    underline hover:text-green-300 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-indigo-500 
                                    focus:ring-offset-2 
                                    dark:text-[#355E3B] 
                                    dark:hover:text-[#918D0D] 
                                    dark:focus:ring-offset-gray-800"
                                >
                                    Already registered?s
                                </Link>
                            </div>
                        </form>

                    </div>
                </div>
                <AuthSidebar />
            </div>
        </GuestLayout>
    );
}
