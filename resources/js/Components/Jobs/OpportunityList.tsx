import JobFilter from "./JobFilter";
import OpportunityCard from "./OpportunityCard";
import { Opportunity } from "./OpportunityTypes";

interface Props {
    opportunities: Opportunity[];
}

export default function OpportunityList({ opportunities }: Props) {
    return (
        <div className="space-y-4">
                {opportunities.map((opportunity) => (
                    <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
        
        </div>
    );
}
