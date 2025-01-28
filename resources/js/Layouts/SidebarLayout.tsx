import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import {
    HomeIcon,
    BriefcaseIcon,
    BellIcon,
    UserGroupIcon,
    DocumentTextIcon,
    ClipboardIcon,
    BookOpenIcon,
    UsersIcon,
    CogIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';

interface SidebarLayoutProps {
    header?: ReactNode;
    children: ReactNode;
}

const navigation = [
    { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon },
    { name: 'Resume Analysis', href: route('resumes'), icon: DocumentTextIcon },
    { name: 'Job Matches', href: route('dashboard'), icon: BriefcaseIcon },
    { name: 'Application Tracker', href: route('dashboard'), icon: ClipboardIcon },
    { name: 'Reources', href: route('dashboard'), icon: BookOpenIcon },
    { name: 'Notifications', href: route('dashboard'), icon: BellIcon },
    { name: 'Community', href: route('dashboard'), icon: UserGroupIcon },
    { name: 'Settings', href: route('dashboard'), icon: CogIcon },
    { name: 'Profile', href: route('dashboard'), icon: UsersIcon },
];

export default function SidebarLayout({ header, children }: PropsWithChildren<SidebarLayoutProps>) {
    const user = usePage().props.auth.user;
    console.log(route());
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Toaster position="top-right" />

            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                {/* Logo */}
                <div className="flex h-16 items-center px-6">
                    <Link href="/">
                        <img
                            src='/assets/images/logos/beHirable.png'
                            className="h-8 w-auto"
                            alt="BeHirable"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="mt-6 px-3">
                    <div className="space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    group flex items-center px-3 py-2 text-sm font-medium rounded-md
                                    ${route().current(item.href)
                                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }
                                `}
                            >
                                <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* User Profile */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center px-4 py-3">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                                alt={user.name}
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="pl-64">
                {header && (
                    <header className="bg-white shadow dark:bg-gray-800">
                        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="py-6">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}