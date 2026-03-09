const features = [
  {
    title: "AI Automation",
    desc: "Automate complex workflows with AI tools."
  },
  {
    title: "Powerful API",
    desc: "Integrate 100+ services easily."
  },
  {
    title: "Analytics",
    desc: "Track performance in real time."
  }
]

export function Features() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {features.map((feature, i) => (
          <div
            key={i}
            className="p-8 rounded-xl bg-white/5 border border-white/10 hover:-translate-y-2 transition"
          >
            <h3 className="text-xl font-semibold">
              {feature.title}
            </h3>

            <p className="text-zinc-400 mt-2">
              {feature.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  )
}