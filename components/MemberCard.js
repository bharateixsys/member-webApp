export default function MemberCard({ member }) {
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow">M</span>
            {member.fullName}
          </h2>
          <p className="mt-1 text-sm text-slate-500 section-title">Member ID <span className="font-semibold text-slate-700">{member.memberId}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-soft">{member.status}</span>
          {/* <button className="btn-outline">Edit</button>
          <button className="btn-primary-soft">View Profile</button> */}
        </div>
      </div>
      <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5">
        {/* <section className="kpi">
          <span className="section-title">Organization</span>
          <div className="mt-2">
            <div className="label">Employer / Group</div>
            <div className="value">{member.organization}</div>
          </div>
        </section>
        <section className="kpi">
          <span className="section-title">Home Address</span>
          <div className="mt-2 text-sm">
            <div className="font-semibold">{member.address.street}</div>
            <div className="text-slate-600">{member.address.city}, {member.address.state} {member.address.zip}</div>
          </div>
        </section>
        <section className="kpi">
          <span className="section-title">Alternate Mailing Address</span>
          <div className="mt-2 text-sm">
            <div className="font-semibold">{member.altAddress.street}</div>
            <div className="text-slate-600">{member.altAddress.city}, {member.altAddress.state} {member.altAddress.zip}</div>
          </div>
        </section> */}
        <section className="kpi">
          <span className="section-title">Plan Details</span>
          <div className="mt-3 grid grid-cols-1 gap-4">
            <div><div className="label">Plan Type</div><div className="value">{member.receivedDate}</div></div>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-4">
            <div><div className="label">Group</div><div className="value">Sendero Health Plans</div></div>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-4">
            <div><div className="label">Plan ID</div><div className="value">PLAN2001-25 ( Click for Benefits ) ( Click for SOC )</div></div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-4">
            <div><div className="label">Division ID</div><div className="value">REGULAR</div></div>
            <div><div className="label">Plan Start</div><div className="value">{member.effectiveDate}</div></div>
            <div><div className="label">Plan End</div><div className="value">{member.effectiveDate}</div></div>
          </div>
        </section>
        <section className="kpi">
          <span className="section-title">Current PCP</span>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div><div className="label">Current PCP</div><div className="value">{member.memberType}</div></div>
            <div><div className="label">NPI</div><div className="value">{member.memberSubtype}</div></div>
            <div><div className="label">Phone #</div><div className="value">{member.enrollmentType}</div></div>
            <div><div className="label">Provider ID</div><div className="value">{member.status}</div></div>
          </div>
        </section>
        {/* <section className="kpi">
          <span className="section-title">Plan Details</span>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div><div className="label">Plan Type</div><div className="value">{member.plan.planType}</div></div>
            <div><div className="label">Package Name</div><div className="value">{member.plan.packageName}</div></div>
            <div className="col-span-2"><div className="label">Notes</div><div className="text-sm text-slate-700">{member.plan.notes || '—'}</div></div>
          </div>
        </section> */}
      </div>
    </div>
  )
}
