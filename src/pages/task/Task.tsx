import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResourcePageLayout from "../../components/resources/ResourcePageLayout";
import Table from "../../components/tables/Table";
import { tasks, type TaskRecord } from "../../data/resourceData";
import type { Column } from "../../types/Table.types";

const PAGE_SIZE = 4;

const priorityClasses: Record<TaskRecord["priority"], string> = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HIGH: "bg-rose-100 text-rose-700",
  CRITICAL: "bg-red-100 text-red-700",
};

export default function Task() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);
  const paginatedTasks = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns: Column<TaskRecord>[] = [
    { key: "title", label: "Task" },
    { key: "assignee", label: "Assignee" },
    {
      key: "priority",
      label: "Priority",
      render: ({ priority }) => (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClasses[priority]}`}>
          {priority}
        </span>
      ),
    },
    { key: "status", label: "Status" },
  ];

  return (
    <ResourcePageLayout
      title="Tasks"
      description="Stay on top of priorities and open detail pages directly from the task table."
    >
      <Table
        columns={columns}
        data={paginatedTasks}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        rowKey={(task) => task.id}
        actions={[
          { label: "View", onClick: (task) => navigate(`/tasks/${task.id}`) },
        ]}
      />
    </ResourcePageLayout>
  );
}
