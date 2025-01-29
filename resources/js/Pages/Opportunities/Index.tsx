import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import SidebarLayout from "@/Layouts/SidebarLayout";
import OpportunityList from "@/Components/Jobs/OpportunityList";
import { PageProps } from "@/Components/Jobs/OpportunityTypes";
import JobFilter from "@/Components/Jobs/JobFilter";
import SearchForm from "@/Components/Jobs/SearchForm";

export default function Index() {
    const { opportunities, filters, jobTypes, locationTypes, jobFunctions } = usePage().props;

    return (
        <SidebarLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">
                        {opportunities.data.length} Jobs results
                    </h1>
                    <Link
                        href={route("opportunities.create")}
                        className="bg-[#355E3B] hover:bg-[#2E2E2E] text-white px-4 py-2 rounded-md transition-colors"
                    >
                        + Add Opportunity
                    </Link>
                </div>
                <div className="flex justify-left items-start mb-6">
                <SearchForm 
                            initialSearch={''}
                            searchRoute={route("opportunities.index")} />
                </div>

                {/* Opportunity List Component */}
                
                <div className="flex gap-4 justify-space-between ">
                    <OpportunityList opportunities={opportunities.data} />
                    <JobFilter 
                        jobTypes={jobTypes as string[]} 
                        locationTypes={locationTypes as string[]} 
                        jobFunctions={jobFunctions as string[]} 
                    />

                </div>
            </div>
        </SidebarLayout>
    );
}
