import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaLock, FaBell, FaShieldAlt } from "react-icons/fa";

export default function EditProfile() {
  const [lookingForWork, setLookingForWork] = useState(false);
  const [form, setForm] = useState({
    name: "Daniel Fowler",
    email: "daniel.fowler@email.com",
    location: "Austin, TX",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data:", { ...form, lookingForWork });
    alert("Profile saved successfully!");
  };

  const handleCancel = () => {
    setForm({
      name: "Daniel Fowler",
      email: "daniel.fowler@email.com",
      location: "Austin, TX",
    });
    setLookingForWork(false);
    alert("Changes discarded!");
  };

  const handlePasswordSave = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Password Updated:", passwords);
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <main className="font-sans bg-slate-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6  lg:grid-cols-4 gap-8">
        {/* Main Profile Form */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow-md rounded-2xl p-8">
            {/* ================= User Information ================= */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              User Information
            </h2>
            <hr className="mb-6 border-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  name="UserName"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="LastName"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="Phone"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* ================= Address Information ================= */}
            <h2 className="text-xl font-bold text-gray-800 mt-10 mb-4">
              Address Information
            </h2>
            <hr className="mb-6 border-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="Address"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="City"
                  value={form.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="State"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Zip
                </label>
                <input
                  type="text"
                  name="Zip"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Toggle 2FA */}
              <div className="md:col-span-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-semibold text-gray-700">
                    Enable 2 Factor Authentication
                  </span>
                  <div
                    onClick={() => setLookingForWork(!lookingForWork)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                      lookingForWork ? "bg-indigo-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                        lookingForWork ? "translate-x-6" : ""
                      }`}
                    ></div>
                  </div>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {lookingForWork
                    ? "Enable 2 Factor Authentication"
                    : "Disable 2 Factor Authentication"}
                </p>
              </div>
            </div>

            {/* ================= Save / Cancel ================= */}
            <hr className="my-6 border-gray-200" />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Settings with Icons */}
        {/* <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Settings</h3>
            <hr className="my-4 border-gray-200" />

            <div className="py-3 flex items-start space-x-3">
              <FaLock className="text-indigo-600 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Change Password</p>
                <p className="text-sm text-gray-600">
                  Update your account password
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-3">
              <input
                type="password"
                name="current"
                placeholder="Current Password"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                name="new"
                placeholder="New Password"
                value={passwords.new}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handlePasswordSave}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Update Password
              </button>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="py-3 flex items-start space-x-3">
              <FaBell className="text-green-600 mt-1" />
              <div>
                <p className="font-medium text-gray-800">Notifications</p>
                <p className="text-sm text-gray-600">
                  Manage your notification preferences
                </p>
                <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                  Manage Notifications
                </button>
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="py-3 flex items-start space-x-3">
              <FaShieldAlt className="text-purple-600 mt-1" />
              <div>
                <p className="font-medium text-gray-800">Privacy Settings</p>
                <p className="text-sm text-gray-600">
                  Control your privacy preferences
                </p>
                <button className="mt-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
