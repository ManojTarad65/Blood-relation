export function Pricing() {
  return (
    <section className="py-32">

      <h2 className="text-center text-4xl font-bold">
        Simple Pricing
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mt-12">

        <div className="p-8 border rounded-xl">
          Starter
        </div>

        <div className="p-8 border rounded-xl scale-105 bg-white/5">
          Pro
        </div>

        <div className="p-8 border rounded-xl">
          Enterprise
        </div>

      </div>

    </section>
  )
}