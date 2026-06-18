import type { ReactNode } from "react";

type ResourcePageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function ResourcePageLayout({
  title,
  description,
  children,
}: ResourcePageLayoutProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
      {children}
    </section>
  );
}
