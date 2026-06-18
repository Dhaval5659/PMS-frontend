import { Link } from "react-router-dom";

type ResourceDetailCardProps = {
  title: string;
  subtitle: string;
  fields: Array<{ label: string; value: string | number }>;
  backTo: string;
  backLabel: string;
};

export default function ResourceDetailCard({
  title,
  subtitle,
  fields,
  backTo,
  backLabel,
}: ResourceDetailCardProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">{subtitle}</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label} className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {field.label}
              </p>
              <p className="mt-2 text-base text-gray-900">{field.value}</p>
            </div>
          ))}
        </div>

        <Link
          to={backTo}
          className="mt-6 inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          {backLabel}
        </Link>
      </div>
    </section>
  );
}
