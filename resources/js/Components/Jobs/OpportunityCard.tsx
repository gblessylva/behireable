import { Link } from "@inertiajs/react";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Opportunity } from "./OpportunityTypes";
import { formatRelativeTime } from "@/Helpers/helper";

interface Props {
    opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: Props) {
    console.log(opportunity);
    const toUpperCase = (str: string) => {
        return str.toUpperCase();
    };
    // Check urgency
    const checkUrgency = (str: string) => {
        // case 
        switch (str) {
            case "immediate":
                // Return a div with bg-red-100 text-red-800
                return <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                    Urgent
                </span>
                break;
            case "soon":
                // Return a div with bg-yellow-100 text-yellow-800
                return <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    Medium
                </span>
                break;
            case "flexible":
                // Return a div with bg-green-100 text-green-800
                return <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Low
                </span>
                break;
            default:
                // Return a div with bg-gray-100 text-gray-800
                return <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                    {str}
                </span>
                break;

        }
    }


    return (
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-start gap-4">
                {/* Opportuinity Header */}
                <div className="flex flex-col md:flex-row w-full justify-between">

                    {/* Left */}
                    <div className="flex flex-wrap w-2/3 gap-4 ">
                        {/* Company Logo */}
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {opportunity.company?.logo ? (
                                <img
                                    src={"/assets/images/logos/logo-health.png"}
                                    alt={opportunity.company.name}
                                    className="w-8 h-8 object-contain"
                                />
                            ) : (
                                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                            )}
                        </div>
                        <div>
                            <Link href={`opportunities/${opportunity.id}`} className="text-xl font-semibold text-gray-900">{opportunity.title}</Link>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-gray-600">{opportunity.company?.name}</span>
                                <span className="text-gray-400">•</span>
                                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                                    {toUpperCase(opportunity.type)}
                                </span>
                                <span className="text-gray-400">•</span>
                                {checkUrgency(opportunity.urgency)}
                                <span className="text-gray-400">•</span>

                            </div>
                        </div>
                        {/* Job Type & Description */}
                        <div className="mt-4 flex flex-wrap  gap-2 ">
                            {opportunity.description && (
                                <p className="text-gray-600 mt-2 text-sm">
                                    {opportunity.description.slice(0, 500)}...
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Right */}
                    <div className="flex flex-col w-1/3 align-right items-end">
                        <div className="flex gap-2 flex-col">
                            <span className="inline-flex items-center gap-1">
                                <MapPinIcon className="w-4 h-4" />
                                {opportunity.location?.city}
                            </span>
                            <span className="inline-flex items-center gap-1">
                                {toUpperCase(opportunity.location_type)}
                            </span>
                        </div>

                        <div className="flex flex-col items-left text-sm text-gray-500">
                            <div className="flex"><ClockIcon className="w-4 h-4 mr-1" /> Posted {formatRelativeTime(opportunity.created_at)}</div>
                            <p>Salary: USD {opportunity.salary}</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
