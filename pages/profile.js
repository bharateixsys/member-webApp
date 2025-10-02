import React from "react";

export default function ProfileHeader() {
  return (
    <div className="bg-white shadow rounded-2xl p-6 flex items-start justify-between">
      {/* Left Section */}
      <div className="flex items-start space-x-6">
        {/* Profile Image */}
        <img
          src="https://api.dicebear.com/9.x/micah/svg?seed=Eden"
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover"
        />

        {/* Profile Info */}
        <div>
          {/* Name + Status */}
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold">DANIEL FOWLER</h1>
           {/* <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
              M, 64 Years, (Active)
            </span> 
             <span className="bg-red-100 text-red-700 text-sm font-medium px-3 py-1">
              (Eligibility Begin : 1/1/2025 | End : 12/31/2025)
            </span>*/}
          </div>
          {/* Details Row */}
          <div className="flex flex-wrap gap-8 mt-3 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-800"></p>
              <p>242749470-01</p>
            </div>
           {/* <div>
              <p className="font-medium text-gray-800">Date Of Birth</p>
              <p>12/16/1960</p>
            </div> */}
            <div>
              <p className="font-medium text-gray-800">PCP Name</p>
              <p>ANTHONY SHALLIN</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Coverage</p>
              <p><span class="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-700">Active</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Buttons) */}
      <div className="flex items-start space-x-3">
        <div>
              <p className="font-medium text-gray-800">Address</p>
              <p><span class="inline-block py-1 text-xs  ">303 NORWOOD DR, GEORGETOWN , TX,78628</span></p>
              {/* <p>
                <p className="font-medium text-gray-800">Date Of Birth</p>
                <span class="inline-block py-1 text-xs">12/16/1960</span>
                </p> */}
            </div>
        {/* <button className="text-indigo-600 font-medium hover:underline">
          Edit
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow">
          Contact
        </button> */}
      </div>
    </div>
  );
}






