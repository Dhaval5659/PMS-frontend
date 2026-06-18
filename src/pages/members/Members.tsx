import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResourcePageLayout from "../../components/resources/ResourcePageLayout";
import Table from "../../components/tables/Table";
import { members, type MemberRecord } from "../../data/resourceData";
import type { Column } from "../../types/Table.types";

const PAGE_SIZE = 4;

const statusClasses: Record<MemberRecord["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Invited: "bg-amber-100 text-amber-700",
  Offline: "bg-gray-200 text-gray-700",
};

export default function Members() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(members.length / PAGE_SIZE);
  const paginatedMembers = members.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns: Column<MemberRecord>[] = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "email", label: "Email" },
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
      title="Members"
      description="Manage teammates, roles, and invitation status from one place."
    >
      <Table
        columns={columns}
        data={paginatedMembers}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        rowKey={(member) => member.id}
        actions={[
          { label: "View", onClick: (member) => navigate(`/members/${member.id}`) },
        ]}
      />
    </ResourcePageLayout>
  );
}
