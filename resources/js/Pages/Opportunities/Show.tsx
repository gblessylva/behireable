import { Link } from "@inertiajs/react";

interface Opportunity {
    id: string;
    title: string;
    description: string;
    type: string;
    location_type: string;
    company?: { name: string };
    salary: string;
    urgency: string;
    experience: string;
}

export default function Show({ opportunity }: { opportunity: Opportunity }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{opportunity.title}</h1>
            <p className="text-gray-600 mt-2">{opportunity.description}</p>

            <div className="mt-4">
                <p><strong>Company:</strong> {opportunity.company?.name ?? "N/A"}</p>
                <p><strong>Type:</strong> {opportunity.type}</p>
                <p><strong>Location Type:</strong> {opportunity.location_type}</p>
                <p><strong>Salary:</strong> ${opportunity.salary}</p>
                <p><strong>Urgency:</strong> {opportunity.urgency}</p>
                <p><strong>Experience Required:</strong> {opportunity.experience} years</p>
            </div>

            <div className="mt-6">
                <Link href={route("opportunities.index")} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Back to List
                </Link>
            </div>
        </div>
    );
}
