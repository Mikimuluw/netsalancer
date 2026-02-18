import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import CalculatorsSection from "@/components/CalculatorsSection";
import CostComparison from "@/components/CostComparison";
import PDFGenerator from "@/components/PDFGenerator";
import Waitlist from "@/components/Waitlist";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Problem />
      <CalculatorsSection />
      <CostComparison />
      <PDFGenerator />
      <Waitlist />
      <FAQ />
      <Footer />
    </main>
  );
}
