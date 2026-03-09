export function Testimonials() {
  return (
    <section className="py-32 text-center">

      <h2 className="text-4xl font-bold">
        What Developers Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-12">

        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          "This tool saved us hundreds of hours."
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          "The best developer platform I’ve used."
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          "Incredible speed and performance."
        </div>

      </div>

    </section>
  )
}