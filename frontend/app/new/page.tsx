"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "../../services/api";

export default function NewJobPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/jobs", formData);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const field = 'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm';

  return (
    <div className="mx-auto max-w-xl">
      <Link href="/" className="mb-4 inline-block text-sm text-slate-600 hover:underline">← Back</Link>
      <h1 className="mb-6 text-2xl font-semibold">New service request</h1>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
        <div>
          <label className="text-sm font-medium">Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={field}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Description *</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={field}
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              name="category"
              list="category-list"
              value={formData.category}
              onChange={handleChange}
              className={field}
              placeholder="Select or type a category"
            />
            <datalist id="category-list">
              <option value="Web Development" />
              <option value="Mobile App Development" />
              <option value="Software Engineering" />
              <option value="Network Administration" />
              <option value="IT Support" />
              <option value="UI/UX Design" />
              <option value="Data Science" />
            </datalist>
          </div>
          <div>
            <label className="text-sm font-medium">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={field}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Contact name</label>
            <input
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className={field}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Contact email</label>
            <input
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              className={field}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-60"
        >
          Create request
        </button>
      </form>
    </div>
  );
}