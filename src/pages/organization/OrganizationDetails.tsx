import { Navigate, useParams } from "react-router-dom";
import ResourceDetailCard from "../../components/resources/ResourceDetailCard";
import { organizations } from "../../data/resourceData";

export default function OrganizationDetails() {
  const { organizationId } = useParams();
  const organization = organizations.find(({ id }) => id === organizationId);

  if (!organization) {
    return <Navigate to="/organizations" replace />;
  }

  return (
    <ResourceDetailCard
      title={organization.name}
      subtitle="Organization Details"
      backTo="/organizations"
      backLabel="Back to Organizations"
      fields={[
        { label: "Organization ID", value: organization.id },
        { label: "Owner", value: organization.owner },
        { label: "Members", value: organization.members },
        { label: "Plan", value: organization.plan },
      ]}
    />
  );
}
