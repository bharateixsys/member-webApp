// import Navbar from '../components/Navbar'
export default function Reports() {
  return (
    <div className="">
      {/* <Navbar /> */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* <h1 className="text-2xl font-bold tracking-tight mb-4">Reports</h1> */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <div className="section-title">Individual/Family Year to Deductibles</div>
            <div className="mt-4 h-48 grid place-items-center text-slate-400">
              <div className="h-40 w-full rounded-xl border border-dashed border-slate-300 grid place-items-center">Chart Placeholder</div>
            </div>
          </div>
          <div className="card p-6">
            <div className="section-title">Individual/Family Year to Out-of-Pocket</div>
            <div className="mt-4 h-48 grid place-items-center text-slate-400">
              <div className="h-40 w-full rounded-xl border border-dashed border-slate-300 grid place-items-center">Chart Placeholder</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
