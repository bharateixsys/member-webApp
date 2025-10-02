import React from "react";

export default function QuickLinks() {
  const links = [
    { label: "Pharmacy Portal", href: "https://navitus.com/members", color: "text-emerald-600", icon: "📋" },
    { label: "Payment Portal", href: "https://senderohealth.softheon.com/account/payments/locate-account", color: "text-teal-600", icon: "💰" },
    { label: "Cost Transparency Tool", href: "https://www.mymedicalshopper.com/login?loginBranding=sendero-health-plans-inc", color: "text-blue-600", icon: "📊" },
    { label: "24/7 On-Demand Virtual Urgent Care", href: "https://care.normanmd.com/en/#/security/login", color: "text-purple-600", icon: "☎️" },
  ];

  return (
    <main className="mx-auto max-w-7xl">
    <div className="bg-white rounded-2xl border border-slate-200 p-6  mb-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-md transition"
          >
            <span className={`${link.color} text-xl`}>{link.icon}</span>
            <span className="font-medium text-slate-700">{link.label}</span>
          </a>
        ))}
      </div>
    </div>

     {/* Quick Links - Buttons Grid */}
            {/* <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-inner">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://navitus.com/members"
                  className="p-4 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition text-center"
                >
                  Pharmacy Portal
                </a>
                <a
                  href="https://senderohealth.softheon.com/account/payments/locate-account"
                  className="p-4 rounded-xl bg-teal-600 text-white font-semibold shadow hover:bg-teal-700 transition text-center"
                >
                  Payment Portal
                </a>
                <a
                  href="https://www.mymedicalshopper.com/login?loginBranding=sendero-health-plans-inc"
                  className="p-4 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-center"
                >
                  Cost Transparency Tool
                </a>
                <a
                  href="https://care.normanmd.com/en/#/security/login"
                  className="p-4 rounded-xl bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition text-center"
                >
                  24/7 On-Demand Virtual Urgent Care
                </a>
              </div>
            </div> */}
    </main>
  );
}
