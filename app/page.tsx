import Particles from "@/components/Particles";
import Nav from "@/components/Nav";
import HeroV7 from "@/components/HeroV7";
import CitationBar from "@/components/CitationBar";
import DirectiveArticles from "@/components/DirectiveArticles";
import Timeline from "@/components/Timeline";
import ProblemV7 from "@/components/ProblemV7";
import CalcSection from "@/components/CalcSection";
import CompTable from "@/components/CompTable";
import ActionSection from "@/components/ActionSection";
import FooterV7 from "@/components/FooterV7";
import RateProvider from "@/components/RateProvider";

export default function Home() {
  return (
    <RateProvider>
      <Particles />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main-content">
        <HeroV7 />
        <CitationBar />
        <DirectiveArticles />
        <Timeline />
        <ProblemV7 />
        <CalcSection />
        <CompTable />
        <ActionSection />
      </main>
      <FooterV7 />
    </RateProvider>
  );
}