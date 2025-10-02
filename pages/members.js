// pages/members.js
import React from "react";

const members = [
  { id: 1, name: "John Doe", status: "Active", type: "Premium", plan: "Gold" },
  { id: 2, name: "Jane Smith", status: "Inactive", type: "Basic", plan: "Silver" },
  { id: 3, name: "Mike Johnson", status: "Active", type: "Enterprise", plan: "Platinum" },
  { id: 4, name: "Emily Davis", status: "Active", type: "Premium", plan: "Gold" },
];

export default function MembersPage() {
  const total = members.length;
  const active = members.filter((m) => m.status === "Active").length;
  const inactive = total - active;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Member Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Total Members</h2>
          <p className="text-2xl font-bold text-blue-600">{total}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Active Members</h2>
          <p className="text-2xl font-bold text-green-600">{active}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Inactive Members</h2>
          <p className="text-2xl font-bold text-red-600">{inactive}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-sm text-gray-500">Plans Available</h2>
          <p className="text-2xl font-bold text-purple-600">3</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Plan</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-mono text-sm">{m.id}</td>
                <td className="px-6 py-3 font-semibold">{m.name}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      m.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm">{m.type}</td>
                <td className="px-6 py-3 text-sm">{m.plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
