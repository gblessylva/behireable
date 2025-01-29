export interface Company {
    name: string;
    logo?: string;
}

export interface Opportunity {
    id: string;
    title: string;
    type: string;
    urgency: string;
    location: string;
    location_type: string;
    salary?: string;
    company?: Company;
    created_at: string;
    description?: string;
}

export interface PageProps {
    opportunities: { data: Opportunity[] };
}
