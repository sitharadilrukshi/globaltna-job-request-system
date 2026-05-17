"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "../../../services/api";
import Link from "next/link";
import { Pencil, Trash2, X, Save } from "lucide-react";

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

const ictCategories = [
  "Plumbing",
  "Electrical",
  "Painting",
  "Joinery",
  "Software Engineering",
  "Data Science & Analytics",
  "Cloud Computing",
  "Cybersecurity",
  "Networking",
  "IT Support",
  "Web Development",
  "Mobile App Development",
  "AI & Machine Learning",
  "DevOps",
  "Database Administration",
  "UI/UX Design",
  "QA & Testing",
  "IT Management",
];

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Job>>({});

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

  const updateStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    if (!confirm("Are you sure you want to delete this job request?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        category: job.category,
        location: job.location,
        contactName: job.contactName,
        contactEmail: job.contactEmail,
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.patch(`/jobs/${id}`, formData);
      setJob(response.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return <p className="p-10 text-slate-500">Loading job details...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl pt-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-md">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-semibold text-slate-800">Edit Job Request</h2>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
                <input
                  list="categories-list"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Select or type..."
                />
                <datalist id="categories-list">
                  {ictCategories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                  <option value="Other" />
                </datalist>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Contact Name</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold text-slate-800">{job.title}</h1>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm ${job.status === "Open" ? "bg-green-100 text-green-800 border border-green-200" : job.status === "In Progress" ? "bg-yellow-100 text-yellow-800 border border-yellow-200" : "bg-gray-100 text-gray-800 border border-gray-200"}`}>
                {job.status}
              </span>
            </div>
            
            <p className="mt-4 whitespace-pre-wrap leading-relaxed text-slate-700">
              {job.description}
            </p>

            <div className="mt-8 rounded-lg bg-slate-50 p-4 border border-slate-100">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</dt>
                  <dd className="mt-1 font-medium text-slate-900">{job.category || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</dt>
                  <dd className="mt-1 font-medium text-slate-900">{job.location || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contact</dt>
                  <dd className="mt-1 font-medium text-slate-900">{job.contactName || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
                  <dd className="mt-1 font-medium text-slate-900">{job.contactEmail || "—"}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t pt-5">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-slate-600">Status</label>
                <select
                  value={job.status}
                  onChange={updateStatus}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={deleteJob}
                  className="flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}