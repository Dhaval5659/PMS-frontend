import { Navigate, useParams } from "react-router-dom";
import ResourceDetailCard from "../../components/resources/ResourceDetailCard";
import { members } from "../../data/resourceData";

export default function MemberDetails() {
  const { memberId } = useParams();
  const member = members.find(({ id }) => id === memberId);

  if (!member) {
    return <Navigate to="/members" replace />;
  }

  return (
    <ResourceDetailCard
      title={member.name}
      subtitle="Member Details"
      backTo="/members"
      backLabel="Back to Members"
      fields={[
        { label: "Member ID", value: member.id },
        { label: "Role", value: member.role },
        { label: "Email", value: member.email },
        { label: "Status", value: member.status },
      ]}
    />
  );
}
