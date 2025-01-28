import AuthSidebar from '@/Components/AuthSidebar';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Behireable Login Page" />
        <div className="flex min-h-screen bg-[#fffbeb]">
            {/* Left side - Login Form */}
            <div className="w-1/2 p-8 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-2 text-[#918D0D]">Log in to your Account</h1>
                        <p className="text-[#2E2E2E]">Welcome back! Select method to log in:</p>
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
                        <div className="space-y-4">
                            <div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Email"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-[#B59F3B] hover:text-[#B59F3B]"
                                    >
                                        Forgot Password?
                                    </Link>
                                )}
                            </div>
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#355E3B] hover:bg-[#918D0D] transition-colors"
                            >
                               LOG IN
                            </PrimaryButton>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="text-[#B59F3B] hover:text-[#918D0D]">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right side - Blue illustration area */}
            <AuthSidebar />
        </div>  
        </GuestLayout>
    );
}
