export function ProductPreview() {
  return (
    <section className="py-32">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-4xl font-bold">
            Powerful Dashboard
          </h2>

          <p className="mt-4 text-zinc-400">
            Manage workflows, analytics, and integrations
            in one powerful dashboard.
          </p>
        </div>

        <img
          src="/dashboard.png"
          className="rounded-xl border border-white/10"
        />

      </div>

    </section>
  )
}