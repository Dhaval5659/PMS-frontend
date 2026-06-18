import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
};

export type Action<T> = {
  label: string;
  onClick: (row: T) => void;
  className?: string;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  actions?: Action<T>[];
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  rowKey?: (row: T, index: number) => string | number;
};

export type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type TableRowProps<T> = {
  row: T;
  columns: Column<T>[];
  actions?: Action<T>[];
};

export type TableHeadersProps<T> = {
  columns: Column<T>[];
  hasActions?: boolean;
};
