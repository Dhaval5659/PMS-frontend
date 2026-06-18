import { Navigate, useParams } from "react-router-dom";
import ResourceDetailCard from "../../components/resources/ResourceDetailCard";
import { projects } from "../../data/resourceData";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find(({ id }) => id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <ResourceDetailCard
      title={project.name}
      subtitle="Project Details"
      backTo="/projects"
      backLabel="Back to Projects"
      fields={[
        { label: "Project ID", value: project.id },
        { label: "Lead", value: project.lead },
        { label: "Progress", value: project.progress },
        { label: "Status", value: project.status },
      ]}
    />
  );
}
