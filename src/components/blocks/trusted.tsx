export function Trusted() {
  return (
    <section className="py-20 text-center">
      <p className="text-sm text-zinc-400 mb-8">
        Trusted by teams worldwide
      </p>

      <div className="flex justify-center gap-10 opacity-60">
        <img src="/logos/github.svg" className="h-6"/>
        <img src="/logos/openai.svg" className="h-6"/>
        <img src="/logos/stripe.svg" className="h-6"/>
        <img src="/logos/vercel.svg" className="h-6"/>
      </div>
    </section>
  )
}