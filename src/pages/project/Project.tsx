import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResourcePageLayout from "../../components/resources/ResourcePageLayout";
import Table from "../../components/tables/Table";
import { projects, type ProjectRecord } from "../../data/resourceData";
import type { Column } from "../../types/Table.types";

const PAGE_SIZE = 3;

const statusClasses: Record<ProjectRecord["status"], string> = {
  "On Track": "bg-emerald-100 text-emerald-700",
  "At Risk": "bg-rose-100 text-rose-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function Project() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const paginatedProjects = projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns: Column<ProjectRecord>[] = [
    { key: "name", label: "Project" },
    { key: "lead", label: "Lead" },
    { key: "progress", label: "Progress" },
    {
      key: "status",
      label: "Status",
      render: ({ status }) => (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[status]}`}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <ResourcePageLayout
      title="Projects"
      description="Track delivery progress and quickly drill into active project records."
    >
      <Table
        columns={columns}
        data={paginatedProjects}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        rowKey={(project) => project.id}
        actions={[
          { label: "View", onClick: (project) => navigate(`/projects/${project.id}`) },
        ]}
      />
    </ResourcePageLayout>
  );
}
