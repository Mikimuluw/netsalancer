import Particles from "@/components/Particles";
import Nav from "@/components/Nav";
import HeroV7 from "@/components/HeroV7";
import ProblemV7 from "@/components/ProblemV7";
import CalcSection from "@/components/CalcSection";
import CompTable from "@/components/CompTable";
import ActionSection from "@/components/ActionSection";
import FooterV7 from "@/components/FooterV7";

export default function Home() {
  return (
    <>
      <Particles />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main-content">
        <HeroV7 />
        <ProblemV7 />
        <CalcSection />
        <CompTable />
        <ActionSection />
      </main>
      <FooterV7 />
    </>
  );
}