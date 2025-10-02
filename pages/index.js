// import Navbar from '../components/Navbar'
import { FaSearch, FaCheckCircle, FaBell, FaUserCircle, FaRegIdCard, FaCalendarAlt, FaHospital, FaUserMd, FaPhoneAlt } from "react-icons/fa";
import BenefitsCards from '../pages/benifits'
import QuickLinks from '../pages/quicklinks'
// import MonthlyTargetChart from "../components/ChartView";
import Chart from '../pages/chart'
import ProfileHeader from '../pages/profile'
import Navbar from '../components/Navbar'


export default function Dashboard() {
    return (
        <main className="font-sans bg-slate-50 min-h-screen">
            <Navbar />
            <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
                {/* Profile Header */}
                <ProfileHeader />
                {/* Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="font-semibold text-slate-800 mb-4">
                            Payment History
                        </h2>
                        <p className="text-slate-500"><Chart /></p>
                        {/* <div className="h-56 bg-slate-100 rounded-lg flex items-center justify-center">
            </div> */}
                    </div>
                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
                            <h2 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-4 flex items-center gap-2">

                                <FaUserMd className="text-emerald-600" /> Member Name
                            </h2>
                            <p className="text-sm text-slate-600">MARGARET FOWLER</p>
                            <p className="text-sm text-slate-600">MARGARET FOWLER</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
                            {/* Current PCP Card */}
                            <div className="">
                                <h2 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-4 flex items-center gap-2">

                                    <FaUserMd className="text-emerald-600" /> Current PCP
                                </h2>

                                <div className="space-y-3 text-sm">
                                    <p>

                                        <span className="font-medium text-slate-700">Current PCP:</span>{" "}
                                        <span className="text-slate-900">MD ANTHONY SHALLIN</span>
                                    </p>

                                    <p>
                                        <span className="font-medium text-slate-700">NPI:</span>{" "}
                                        <span className="text-slate-900">1891734968</span>
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-slate-500" />
                                        <span className="text-slate-900">5129304275</span>
                                    </p>

                                    <p>
                                        <span className="font-medium text-slate-700">Provider ID:</span>{" "}
                                        <span className="text-slate-900">642197216</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
                            {/* Plan Details Card */}
                            <div className="">
                                <h2 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-4 flex items-center gap-2">
                                    <FaHospital className="text-teal-600" /> Plan Details
                                </h2>

                                <div className="space-y-3 text-sm">
                                    <p>
                                        <span className="font-medium text-slate-700">Plan Type:</span>{" "}
                                        <span className="text-slate-900">
                                            SENDERO QUALITY BRONZE HIGH DED/$50 PCP/$100 SP
                                        </span>
                                    </p>

                                    <p>
                                        <span className="font-medium text-slate-700">Group:</span>{" "}
                                        <span className="text-slate-900">Sendero Health Plans</span>
                                    </p>

                                    <p>
                                        <span className="font-medium text-slate-700">Plan ID:</span>{" "}
                                        <a
                                            href="#"
                                            className="text-indigo-600 hover:underline font-medium"
                                        >
                                            PLAN2001-25 (Click for Benefits)
                                        </a>{" "}
                                        |{" "}
                                        <a
                                            href="#"
                                            className="text-indigo-600 hover:underline font-medium"
                                        >
                                            Click for SOC
                                        </a>
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 pt-2">
                                        <div>
                                            <p className="text-slate-500 text-xs">Division ID</p>
                                            <p className="font-medium text-slate-900">REGULAR</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs">Plan Start</p>
                                            <p className="font-medium text-slate-900">01-01-2025</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-xs">Plan End</p>
                                            <p className="font-medium text-slate-900">12-31-2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="">
                    {/* BenefitsCards Section*/}
                    <div className="">
                        <BenefitsCards />
                    </div>
                </div>
                <div className="">
                    {/* QuickLinks Section */}
                    <div className="">
                        <QuickLinks />
                    </div>
                </div>
            </div>
        </main>
    );
}
