"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "../../../services/api";
import Link from "next/link";

type Job = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: string;
};

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [id]);

  const updateStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const response = await API.patch(`/jobs/${id}`, {
        status: e.target.value,
      });

      setJob(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async () => {
    try {
      await API.delete(`/jobs/${id}`);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/" className="text-sm text-slate-600 hover:underline">← Back</Link>
      <div className="mt-3 rounded-lg border bg-white p-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-semibold">{job.title}</h1>
          <span className="rounded bg-slate-100 px-2 py-1 text-xs">{job.status}</span>
        </div>
        <p className="mt-3 whitespace-pre-wrap text-slate-700">{job.description}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div><dt className="text-slate-500">Category</dt><dd>{job.category || '—'}</dd></div>
          <div><dt className="text-slate-500">Location</dt><dd>{job.location || '—'}</dd></div>
          <div><dt className="text-slate-500">Contact</dt><dd>{job.contactName || '—'}</dd></div>
          <div><dt className="text-slate-500">Email</dt><dd>{job.contactEmail || '—'}</dd></div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-4">
          <label className="text-sm font-medium">Status</label>
          <select
            value={job.status}
            onChange={updateStatus}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
          <button
            onClick={deleteJob}
            className="ml-auto rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}