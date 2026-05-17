"use client";

import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import API from "../services/api";

type Job = {
  _id: string;
  title: string;
  category: string;
  location: string;
  status: string;
  description?: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const urlParams = new URLSearchParams();
      if (category) urlParams.append("category", category);
      if (q) urlParams.append("q", q);

      const response = await API.get(`/jobs?${urlParams.toString()}`);

      setJobs(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600">Category</label>
          <input
            list="category-list"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            placeholder="All Categories"
          />
          <datalist id="category-list">
            <option value="Plumbing" />
            <option value="Electrical" />
            <option value="Painting" />
            <option value="Joinery" />
            <option value="Web Development" />
            <option value="Mobile App Development" />
            <option value="Software Engineering" />
            <option value="Network Administration" />
            <option value="IT Support" />
            <option value="UI/UX Design" />
            <option value="Data Science" />
          </datalist>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); fetchJobs(); }} className="flex gap-2">
          <div>
            <label className="block text-xs font-medium text-slate-600">Search</label>
            <input
              list="title-suggestions"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title..."
              className="mt-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            <datalist id="title-suggestions">
              {Array.from(new Set(jobs.map((job) => job.title))).map((title) => (
                <option key={title} value={title} />
              ))}
            </datalist>
          </div>
          <button type="submit" className="self-end rounded-md border bg-white px-3 py-2 text-sm hover:bg-slate-100">
            Search
          </button>
        </form>
      </div>

      {loading && <p className="text-slate-500">Loading…</p>}
      {!loading && jobs.length === 0 && (
        <p className="text-slate-500">No jobs yet. <a href="/new" className="underline">Create one</a>.</p>
      )}

      {!loading && jobs.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              _id={job._id}
              title={job.title}
              category={job.category}
              location={job.location}
              status={job.status}
              description={job.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}