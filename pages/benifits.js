
import {
  FaUserMd,
  FaFlask,
  FaXRay,
  FaClinicMedical,
  FaAmbulance,
  FaPills,
  FaStethoscope,
} from "react-icons/fa";

export default function BenefitsTimeline() {
  const medicalBenefits = [
    { icon: <FaUserMd />, title: "Primary Care Physician", detail: "$50 copay / office visit", note: "Deductible does not apply." },
    { icon: <FaUserMd />, title: "Specialist", detail: "$100 copay / office visit", note: "Deductible does not apply." },
    { icon: <FaFlask />, title: "Lab", detail: "50% coinsurance" },
    { icon: <FaXRay />, title: "Imaging", detail: "50% coinsurance" },
    { icon: <FaClinicMedical />, title: "Urgent Care", detail: "$75 copay / office visit", note: "Deductible does not apply." },
    { icon: <FaAmbulance />, title: "Emergency", detail: "50% coinsurance / visit" },
  ];

  const rxBenefits = [
    { icon: <FaPills />, title: "Generic Drugs", detail: "$25 copay / prescription", note: "Deductible does not apply." },
    { icon: <FaPills />, title: "Preferred Brand Drugs", detail: "$50 copay / prescription" },
    { icon: <FaPills />, title: "Non-preferred Brand Drugs", detail: "$100 copay / prescription" },
    { icon: <FaPills />, title: "Specialty Drugs", detail: "$500 copay / prescription" },
  ];

  return (
   <main className="mx-auto max-w-7xl">
  <div className="grid md:grid-cols-2 gap-12 items-stretch">
    {/* Medical Timeline */}
    <section className="flex flex-col bg-white rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaStethoscope className="text-3xl text-emerald-600" />
        <h2 className="text-2xl font-bold text-emerald-700">Medical Benefits</h2>
      </div>

      {/* Scrollable timeline */}
      <div className="relative pl-10 border-l-4 border-emerald-500 flex-1 overflow-y-auto max-h-[500px] space-y-8 pr-2">
        {medicalBenefits.map((m, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[38px] top-1.5 w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              {m.icon}
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 shadow hover:shadow-md transition">
              <p className="font-semibold text-emerald-800">{m.title}</p>
              <p className="text-red-600 font-medium">{m.detail}</p>
              {m.note && <p className="text-xs text-slate-600 mt-1">{m.note}</p>}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs font-semibold text-slate-700 border-t pt-4">
        All Copayment and Coinsurance amounts are after deductible has been met, unless otherwise indicated.
      </p>
    </section>

    {/* RX Timeline */}
    <section className="flex flex-col bg-white rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaPills className="text-3xl text-indigo-600" />
        <h2 className="text-2xl font-bold text-indigo-700">RX Benefits</h2>
      </div>

      {/* Scrollable timeline */}
      <div className="relative pl-10 border-l-4 border-indigo-500 flex-1 overflow-y-auto max-h-[500px] space-y-8 pr-2">
        {rxBenefits.map((r, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[38px] top-1.5 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg">
              {r.icon}
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 shadow hover:shadow-md transition">
              <p className="font-semibold text-indigo-800">{r.title}</p>
              <p className="text-red-600 font-medium">{r.detail}</p>
              {r.note && <p className="text-xs text-slate-600 mt-1">{r.note}</p>}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs font-semibold text-slate-700 border-t pt-4">
        All Copayment and Coinsurance amounts are after deductible has been met, unless otherwise indicated.
      </p>
    </section>
  </div>
</main>

  );
}


