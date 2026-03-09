import { Hero } from "@/components/blocks/hero";
import { Trusted } from "@/components/blocks/trusted";
import { Features } from "@/components/blocks/features";
import { ProductPreview } from "@/components/blocks/product-preview";
import { Testimonials } from "@/components/blocks/testimonials";
import { Pricing } from "@/components/blocks/pricing";
import { FAQ } from "@/components/blocks/faq";
import { Footer } from "@/components/blocks/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Trusted />
      <Features />
      <ProductPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
