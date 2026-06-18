import type { TableRowProps } from "../../types/Table.types";

export default function TableRow<T>({
  row,
  columns,
  actions,
}: TableRowProps<T>) {
  const hasActions = Boolean(actions?.length);

  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50">
      {columns.map((col) => (
        <td key={String(col.key)} className="p-3 text-gray-700">
          {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "-")}
        </td>
      ))}

      {hasActions && actions && (
        <td className="space-x-2 p-3">
          {actions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={() => action.onClick(row)}
              className={
                action.className ??
                "text-sm font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
              }
            >
              {action.label}
            </button>
          ))}
        </td>
      )}
    </tr>
  );
}
