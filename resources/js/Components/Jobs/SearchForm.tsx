import { useState } from "react";
import { router } from "@inertiajs/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchFormProps {
    initialSearch?: string;
    searchRoute: string;
}

export default function SearchForm({ initialSearch = "", searchRoute }: SearchFormProps) {
    const [search, setSearch] = useState(initialSearch);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        router.get(searchRoute, { search }, { preserveState: true });
    };

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for job title, company, or keywords..."
                    className="w-full px-4 py-3 pl-12 pr-20 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#355E3B] focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />
                <button
                    type="submit"
                    className="absolute right-2 bg-[#355E3B] text-white px-6 py-2 rounded-md hover:bg-[#2E2E2E] transition-colors duration-200"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
