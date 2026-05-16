import Link from "next/link";
import { Plus, Wrench } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-900 hover:text-indigo-600"
        >
          <div className="rounded-md bg-indigo-600 p-1.5 text-white">
            <Wrench size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            TradeBoard
          </span>
        </Link>

        <Link
          href="/new"
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <Plus size={16} />
          <span>Post a request</span>
        </Link>
      </div>
    </nav>
  );
}