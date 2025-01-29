import { useForm } from "@inertiajs/react";

interface Opportunity {
    id: string;
    title: string;
    description: string;
    location_id: string;
    type: string;
    location_type: string;
    industry_id: string;
    company_id: string;
    salary: string;
    urgency: string;
    experience: string;
}

export default function Edit({ opportunity }: { opportunity: Opportunity }) {
    const { data, setData, put, processing, errors } = useForm<Opportunity>({
        ...opportunity,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("opportunities.update", opportunity.id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Opportunity</h1>
            <form onSubmit={submit} className="bg-white shadow rounded-lg p-6">
                <div>
                    <label className="block">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>

                <div className="mt-4">
                    <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded">
                        {processing ? "Saving..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
}
