import type { TableProps } from "../../types/Table.types";
import Pagination from "./Pagination";
import TableHeaders from "./TableHeaders";
import TableRow from "./TableRow";

export default function Table<T>({
  columns,
  data,
  loading,
  actions,
  page = 1,
  totalPages = 1,
  onPageChange,
  rowKey,
}: TableProps<T>) {
  const hasActions = Boolean(actions?.length);
  const columnSpan = columns.length + (hasActions ? 1 : 0);

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <TableHeaders columns={columns} hasActions={hasActions} />

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columnSpan} className="p-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columnSpan} className="p-6 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={rowKey ? rowKey(row, index) : index}
                  row={row}
                  columns={columns}
                  actions={actions}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
