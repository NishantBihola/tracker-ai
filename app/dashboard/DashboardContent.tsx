"use client";

import { useEffect, useState } from "react";

type Budget = {
  id: string;
  category: string;
  limit: number;
};

export default function BudgetsSection({ expenses }: { expenses: any[] }) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [budgetCategory, setBudgetCategory] = useState("");
  const [budgetLimit, setBudgetLimit] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [editLimit, setEditLimit] = useState("");

  async function loadBudgets() {
    try {
      const res = await fetch("/api/budgets", { cache: "no-store" });
      if (res.ok) setBudgets(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBudgets();
  }, []);

  async function addBudget(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: budgetCategory, limit: budgetLimit }),
    });
    if (res.ok) {
      const newBudget = await res.json();
      setBudgets((prev) => [newBudget, ...prev]);
      setBudgetCategory("");
      setBudgetLimit("");
    }
  }

  async function deleteBudget(id: string) {
    await fetch(`/api/budgets/${id}`, { method: "DELETE" });
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  }

  async function saveEdit(id: string) {
    const res = await fetch(`/api/budgets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: editCategory, limit: editLimit }),
    });
    if (res.ok) {
      setBudgets((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, category: editCategory, limit: parseFloat(editLimit) } : b
        )
      );
      setEditingId(null);
    }
  }

  if (loading) return <p className="text-gray-400">Loading budgets...</p>;

  return (
    <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-4">Budgets</h2>

      {/* Add Form */}
      <form onSubmit={addBudget} className="grid gap-3 sm:grid-cols-2 mb-6">
        <input
          type="text"
          placeholder="Category"
          value={budgetCategory}
          onChange={(e) => setBudgetCategory(e.target.value)}
          className="rounded-lg bg-gray-800/60 border border-white/10 px-3 py-2"
        />
        <input
          type="number"
          placeholder="Limit"
          value={budgetLimit}
          onChange={(e) => setBudgetLimit(e.target.value)}
          className="rounded-lg bg-gray-800/60 border border-white/10 px-3 py-2"
        />
        <button
          type="submit"
          className="sm:col-span-2 mt-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 py-2 font-semibold hover:opacity-90 transition"
        >
          + Add Budget
        </button>
      </form>

      {/* Budgets List */}
      <div className="space-y-3">
        {budgets.length === 0 ? (
          <p className="text-gray-400 text-center">No budgets yet.</p>
        ) : (
          budgets.map((b) => {
            const spent = expenses
              .filter((e) => e.category === b.category)
              .reduce((sum, e) => sum + e.amount, 0);
            const over = spent > b.limit;

            return (
              <div
                key={b.id}
                className={`flex justify-between items-center rounded-xl border p-4 shadow-lg transition ${
                  over
                    ? "border-red-500/50 bg-red-900/30"
                    : "border-white/10 bg-gray-900/60"
                }`}
              >
                {editingId === b.id ? (
                  <div className="flex-1 flex gap-3">
                    <input
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="rounded bg-gray-800/70 px-2 py-1"
                    />
                    <input
                      type="number"
                      value={editLimit}
                      onChange={(e) => setEditLimit(e.target.value)}
                      className="rounded bg-gray-800/70 px-2 py-1"
                    />
                    <button
                      onClick={() => saveEdit(b.id)}
                      className="rounded bg-emerald-500 px-3 py-1 text-sm"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span>{b.category}</span>
                      <span className={over ? "text-red-400" : "text-emerald-400"}>
                        ${spent.toFixed(2)} / ${b.limit.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {editingId === b.id ? (
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded bg-gray-600 px-3 py-1 text-sm"
                    >
                      Cancel
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(b.id);
                          setEditCategory(b.category);
                          setEditLimit(String(b.limit));
                        }}
                        className="rounded bg-blue-500 px-3 py-1 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBudget(b.id)}
                        className="rounded bg-red-500 px-3 py-1 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
