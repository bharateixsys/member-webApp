import React, { useState } from "react";

const claimsData = [
  {
    memberId: "M123456",
    claimId: "123",
    serviceDate: "08/08/2025",
    billAmount: 700,
    planPaid: 500,
    yourResp: 200,
    diagnosis: "Flu",
    provider: "Alex Clinic",
    status: "Approved",
  },
  {
    memberId: "M654321",
    claimId: "456",
    serviceDate: "08/09/2025",
    billAmount: 750,
    planPaid: 600,
    yourResp: 150,
    diagnosis: "Diabetes",
    provider: "John Health",
    status: "Denied",
  },
  {
    memberId: "M789012",
    claimId: "789",
    serviceDate: "08/10/2025",
    billAmount: 500,
    planPaid: 400,
    yourResp: 100,
    diagnosis: "Checkup",
    provider: "Simi Care",
    status: "Pending",
  },
];

const statusColors = {
  Approved: "bg-green-600",
  Denied: "bg-red-500",
  Pending: "bg-gray-500",
};

export default function ClaimsList() {
  const [memberId, setMemberId] = useState("");
  const [provider, setProvider] = useState("All");

  // filter logic
  const filteredClaims = claimsData.filter((claim) => {
    const matchesMember =
      memberId === "" ||
      claim.memberId.toLowerCase().includes(memberId.toLowerCase());
    const matchesProvider =
      provider === "All" || claim.provider === provider;
    return matchesMember && matchesProvider;
  });

  const resetFilters = () => {
    setMemberId("");
    setProvider("All");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-red-500 text-sm font-medium"
            >
              Reset
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Search Member ID
            </label>
            <input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter Member ID..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>Alex Clinic</option>
              <option>John Health</option>
              <option>Simi Care</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="md:col-span-3">
          <h2 className="font-semibold text-gray-800 mb-4">
            Results ({filteredClaims.length} items)
          </h2>

          {filteredClaims.length === 0 ? (
            <p className="text-gray-500">No results found.</p>
          ) : (
            <div className="space-y-4">
              {filteredClaims.map((claim, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded-2xl p-4 flex flex-col space-y-2"
                >
                  {/* Top Section with Member ID + Status */}
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Member ID: {claim.memberId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Claim #: {claim.claimId}
                      </p>
                    </div>
                    <span
                      className={`text-white text-sm font-medium px-3 py-1 rounded-full ${statusColors[claim.status]}`}
                    >
                      {claim.status}
                    </span>
                  </div>

                  {/* Middle Section */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    <p>
                      <span className="font-semibold">Service Date: </span>
                      {claim.serviceDate}
                    </p>
                    <p>
                      <span className="font-semibold">Bill Amount: </span>$
                      {claim.billAmount}
                    </p>
                    <p>
                      <span className="font-semibold">Plan Paid: </span>$
                      {claim.planPaid}
                    </p>
                    <p>
                      <span className="font-semibold">Your Resp: </span>$
                      {claim.yourResp}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                      <span className="font-semibold">Diagnosis: </span>
                      {claim.diagnosis}
                    </p>
                    <p>
                      <span className="font-semibold">Provider: </span>
                      {claim.provider}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
