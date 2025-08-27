"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

type Expense = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
};

// ✅ define CSV row type instead of using `any`
type CSVRow = {
  date: string;
  description: string;
  category: string;
  amount: string;
};

export default function DashboardContent() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [monthFilter, setMonthFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Form state
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  async function loadExpenses() {
    try {
      const res = await fetch("/api/expenses", { cache: "no-store" });
      if (!res.ok) return setLoading(false);
      setExpenses(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({ date, description, category, amount }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const newExpense = await res.json();
      setExpenses((prev) => [newExpense, ...prev]);
      setDate("");
      setDescription("");
      setCategory("");
      setAmount("");
    }
  }

  async function deleteExpense(id: string) {
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  // ---------- Filters ----------
  const filteredExpenses = expenses.filter((e) => {
    const matchesMonth =
      monthFilter === "all" ||
      new Date(e.date).getMonth() + 1 === parseInt(monthFilter);
    const matchesCategory =
      categoryFilter === "all" || e.category === categoryFilter;
    return matchesMonth && matchesCategory;
  });

  // ---------- Stats ----------
  const totalSpent = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const topCategory =
    filteredExpenses.length > 0
      ? filteredExpenses.reduce((acc: Record<string, number>, e) => {
          acc[e.category] = (acc[e.category] || 0) + e.amount;
          return acc;
        }, {})
      : {};
  const topCategoryName =
    Object.keys(topCategory).length > 0
      ? Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0][0]
      : "N/A";

  // ---------- Charts ----------
  const categoryData = Object.entries(topCategory).map(([cat, amt]) => ({
    category: cat,
    amount: amt,
  }));

  const lineData = filteredExpenses.map((e) => ({
    date:
      typeof window !== "undefined"
        ? new Date(e.date).toLocaleDateString()
        : "",
    amount: e.amount,
  }));

  // ---------- CSV Export ----------
  function exportCSV() {
    const csv = Papa.unparse(filteredExpenses);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ---------- CSV Import ----------
  function importCSV(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<CSVRow>(file, {
      header: true,
      complete: async (results) => {
        for (const row of results.data) {
          if (row.date && row.description && row.category && row.amount) {
            await fetch("/api/expenses", {
              method: "POST",
              body: JSON.stringify({
                date: row.date,
                description: row.description,
                category: row.category,
                amount: parseFloat(row.amount),
              }),
              headers: { "Content-Type": "application/json" },
            });
          }
        }
        loadExpenses();
      },
    });
  }

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* ---------- Filters & Actions ---------- */}
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex gap-4">
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="rounded bg-gray-800/70 px-3 py-2"
            >
              <option value="all">All Months</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded bg-gray-800/70 px-3 py-2"
            >
              <option value="all">All Categories</option>
              {[...new Set(expenses.map((e) => e.category))].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700"
            >
              Export CSV
            </button>
            <label className="cursor-pointer rounded bg-teal-600 px-4 py-2 text-sm font-semibold hover:bg-teal-700">
              Import CSV
              <input type="file" accept=".csv" hidden onChange={importCSV} />
            </label>
          </div>
        </div>

        {/* ---------- Stats Cards ---------- */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 text-center shadow-lg">
            <h3 className="text-sm text-gray-400">Total Spent</h3>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              ${totalSpent.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 text-center shadow-lg">
            <h3 className="text-sm text-gray-400"># of Expenses</h3>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {filteredExpenses.length}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 text-center shadow-lg">
            <h3 className="text-sm text-gray-400">Top Category</h3>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {topCategoryName}
            </p>
          </div>
        </div>

        {/* ---------- Charts ---------- */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Bar Chart */}
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <XAxis dataKey="category" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="amount" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="rounded-xl border border-white/10 bg-gray-900/60 p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Expenses Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ---------- Add Expense Form ---------- */}
        <form
          onSubmit={addExpense}
          className="rounded-2xl border border-white/10 bg-gray-900/60 p-6 shadow-xl"
        >
          <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg bg-gray-800/60 border border-white/10 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg bg-gray-800/60 border border-white/10 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg bg-gray-800/60 border border-white/10 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-lg bg-gray-800/60 border border-white/10 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 py-2 font-semibold hover:opacity-90 transition"
          >
            + Add Expense
          </button>
        </form>

        {/* ---------- Expense List ---------- */}
        <div className="space-y-3">
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-400 text-center">No expenses yet.</p>
          ) : (
            filteredExpenses.map((e) => (
              <div
                key={e.id}
                className="flex justify-between items-center rounded-xl border border-white/10 bg-gray-900/60 p-4 shadow-lg hover:border-emerald-400/40 transition"
              >
                <div>
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">{e.description}</span>
                    <span className="text-emerald-400">${e.amount}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {e.category} •{" "}
                    {typeof window !== "undefined"
                      ? new Date(e.date).toLocaleDateString()
                      : ""}
                  </div>
                </div>
                <button
                  onClick={() => deleteExpense(e.id)}
                  className="rounded bg-red-500/90 px-3 py-1 text-sm font-medium hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
