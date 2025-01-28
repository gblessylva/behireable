import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ResumeUpload from '@/Components/ResumeUpload';
import SidebarLayout from '@/Layouts/SidebarLayout';
import ResumePreview from '@/Components/ResumePreview';
// import ResumeUpload from '@/Components/User/ResumeUpload';

export default function Dashboard() {
    return (
        // <SidebarLayout></SidebarLayout>
        <SidebarLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Get Started
                </h2>
            }
        >
            <Head title="Upload Resume" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <ResumeUpload />
                           
                             {/* <ResumePreview 
                             data={undefined}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
