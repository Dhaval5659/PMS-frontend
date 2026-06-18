import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResourcePageLayout from "../../components/resources/ResourcePageLayout";
import Table from "../../components/tables/Table";
import { organizations, type OrganizationRecord } from "../../data/resourceData";
import type { Column } from "../../types/Table.types";

const PAGE_SIZE = 3;

export default function Organization() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(organizations.length / PAGE_SIZE);
  const paginatedOrganizations = organizations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns: Column<OrganizationRecord>[] = [
    { key: "name", label: "Organization" },
    { key: "owner", label: "Owner" },
    { key: "members", label: "Members" },
    {
      key: "plan",
      label: "Plan",
      render: ({ plan }) => <span className="font-medium text-gray-900">{plan}</span>,
    },
  ];

  return (
    <ResourcePageLayout
      title="Organizations"
      description="Review active workspaces and keep track of subscription plans."
    >
      <Table
        columns={columns}
        data={paginatedOrganizations}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        rowKey={(organization) => organization.id}
        actions={[
          {
            label: "Open",
            onClick: (organization) => navigate(`/organizations/${organization.id}`),
          },
        ]}
      />
    </ResourcePageLayout>
  );
}
