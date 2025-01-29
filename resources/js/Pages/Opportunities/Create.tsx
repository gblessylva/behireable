import { useForm } from "@inertiajs/react";

interface FormData {
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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: "",
        description: "",
        location_id: "",
        type: "full-time",
        location_type: "remote",
        industry_id: "",
        company_id: "",
        salary: "",
        urgency: "flexible",
        experience: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("opportunities.store"));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create Opportunity</h1>
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

                <div>
                    <label className="block">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mt-4">
                    <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">
                        {processing ? "Saving..." : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}
