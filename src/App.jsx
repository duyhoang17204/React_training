export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
          React Training
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Your workspace is ready.
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-slate-600">
          Start building your React interface here. Tailwind CSS is configured and ready to use.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-teal-500" />
          Ready to develop
        </div>
      </section>
    </main>
  )
}
