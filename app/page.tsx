import Nav from "./components/Nav";
import BookHero from "./components/BookHero";
import TrustStrip from "./components/TrustStrip";
import ForYouSection from "./components/ForYouSection";
import ProblemSection from "./components/ProblemSection";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import PublishedBooks from "./components/PublishedBooks";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <BookHero />
        {/* All content after hero uses contentSection to paint above the fixed canvas */}
        <div className="contentSection">
          <TrustStrip />
          <ForYouSection />
          <ProblemSection />
          <HowItWorks />
          <Pricing />
          <Testimonials />
          <PublishedBooks />
          <FAQ />
          <FinalCTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
