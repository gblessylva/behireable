import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import DatePostFilter from "./DatePostFilter";
import JobTypeFilter from "./JobTypeFilter";
import SalaryRangeFilter from "./SalaryRangeFilter";
import LocationTypeFilter from "./LocationTypeFilter";
import JobFunctionFilter from "./JobFunctionFilter";

export default function JobFilter() {
    const { filters = {} } = usePage().props as { filters?: any };

    const [filterState, setFilterState] = useState({
        datePost: filters.datePost || "", // Empty string instead of "anytime"
        jobTypes: filters.jobTypes || [],
        salaryRange: { min: filters.salaryMin || null, max: filters.salaryMax || null }, // Null instead of default
        locationType: filters.locationType || [],
        jobFunctions: filters.jobFunctions || []
    });

    useEffect(() => {
        // Ensure we only send non-empty filters to the server
        const activeFilters: any = {};

        if (filterState.datePost) activeFilters.datePost = filterState.datePost;
        if (filterState.jobTypes.length) activeFilters.jobTypes = filterState.jobTypes;
        if (filterState.salaryRange.min !== null && filterState.salaryRange.max !== null) {
            activeFilters.salaryRange = { min: filterState.salaryRange.min, max: filterState.salaryRange.max };
        }
        if (filterState.locationType.length) activeFilters.locationType = filterState.locationType;
        if (filterState.jobFunctions.length) activeFilters.jobFunctions = filterState.jobFunctions;

        if (Object.keys(activeFilters).length > 0) {
            const timer = setTimeout(() => {
                router.get(route("opportunities.index"), activeFilters, { preserveState: true, replace: true });
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [filterState]);

    const handleClearAll = () => {
        setFilterState({
            datePost: "",
            jobTypes: [],
            salaryRange: { min: null, max: null },
            locationType: [],
            jobFunctions: []
        });
    };

    return (
        <div className="bg-white rounded-lg w-1/4 shadow-sm p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filter</h2>
                <button onClick={handleClearAll} className="text-red-500 text-sm hover:text-red-600">
                    Clear all
                </button>
            </div>
            <DatePostFilter value={filterState.datePost} onChange={(val) => setFilterState({...filterState, datePost: val })} />
            {/* <DatePostFilter value={filterState.datePost} onChange={(val) => setFilterState({ ...filterState, datePost: val })} />
            <JobTypeFilter value={filterState.jobTypes} onChange={(val) => setFilterState({ ...filterState, jobTypes: val })} />
            <SalaryRangeFilter value={filterState.salaryRange} onChange={(val) => setFilterState({ ...filterState, salaryRange: val })} />
            <LocationTypeFilter value={filterState.locationType} onChange={(val) => setFilterState({ ...filterState, locationType: val })} />
            <JobFunctionFilter value={filterState.jobFunctions} onChange={(val) => setFilterState({ ...filterState, jobFunctions: val })} /> */}
        </div>
    );
}
