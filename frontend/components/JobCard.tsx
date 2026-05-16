import Link from "next/link";

const statusColor: Record<string, string> = {
  Open: 'bg-green-100 text-green-800',
  'In Progress': 'bg-amber-100 text-amber-800',
  Closed: 'bg-slate-200 text-slate-700',
};

type JobCardProps = {
  _id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  description?: string;
};

export default function JobCard({
  _id,
  title,
  category,
  location,
  status,
  description,
}: JobCardProps) {
  return (
    <Link
      href={`/jobs/${_id}`}
      className="block rounded-lg border bg-white p-4 hover:shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold">{title}</h2>
        <span className={`rounded px-2 py-0.5 text-xs ${statusColor[status] || 'bg-slate-200 text-slate-700'}`}>
          {status}
        </span>
      </div>
      {description && (
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{description}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
        {category && <span className="rounded bg-slate-100 px-2 py-0.5">{category}</span>}
        {location && <span className="rounded bg-slate-100 px-2 py-0.5">{location}</span>}
      </div>
    </Link>
  );
}