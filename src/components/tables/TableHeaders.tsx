import type { TableHeadersProps } from "../../types/Table.types";

export default function TableHeaders<T>({
  columns,
  hasActions = false,
}: TableHeadersProps<T>) {
  return (
    <thead className="bg-gray-100 text-left">
      <tr>
        {columns.map((col) => (
          <th key={String(col.key)} className="p-3 font-medium text-gray-700">
            {col.label}
          </th>
        ))}
        {hasActions && <th className="p-3">Actions</th>}
      </tr>
    </thead>
  );
}
