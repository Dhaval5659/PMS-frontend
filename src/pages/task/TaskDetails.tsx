import { Navigate, useParams } from "react-router-dom";
import ResourceDetailCard from "../../components/resources/ResourceDetailCard";
import { tasks } from "../../data/resourceData";

export default function TaskDetails() {
  const { taskId } = useParams();
  const task = tasks.find(({ id }) => id === taskId);

  if (!task) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <ResourceDetailCard
      title={task.title}
      subtitle="Task Details"
      backTo="/tasks"
      backLabel="Back to Tasks"
      fields={[
        { label: "Task ID", value: task.id },
        { label: "Assignee", value: task.assignee },
        { label: "Priority", value: task.priority },
        { label: "Status", value: task.status },
      ]}
    />
  );
}
