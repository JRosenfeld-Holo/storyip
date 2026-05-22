import type { Metadata } from "next";
import Nav from "../components/Nav";
import OccupationPage from "../components/OccupationPage";
import type { OccupationData } from "../components/OccupationPage";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Story IP for Entrepreneurs — Turn Your Journey Into Your Most Powerful Business Asset",
  description:
    "Your startup story is your best sales pitch, your best recruiting tool, and your best investor deck. AI-assisted entrepreneur memoir ghostwriting that turns your journey into a published book. Starting at $3,497.",
  keywords: [
    "entrepreneur memoir",
    "founder story",
    "ghostwriting for entrepreneurs",
    "startup book",
    "business autobiography",
    "thought leadership book",
  ],
};

const data: OccupationData = {
  slug: "entrepreneur",
  profession: "Entrepreneur",
  heroEyebrow: "Story IP for Entrepreneurs",
  heroHeadline: "Your journey is your most powerful business asset",
  heroSubheadline:
    "In a world of pitch decks and LinkedIn posts, a published book is the ultimate differentiator. Entrepreneurs who author books close more deals, attract better talent, command higher speaking fees, and build companies that investors remember.",
  heroStat: {
    value: "$1M+",
    label: "Aspirational revenue target a single book can generate in new business",
  },
  stats: [
    { value: "5 hrs", label: "Your Total Time Investment" },
    { value: "150+", label: "Manuscript Pages" },
    { value: "30 Days", label: "To Published Author" },
    { value: "10–50×", label: "Estimated ROI on Investment" },
  ],
  problems: [
    {
      title: "The credibility plateau",
      body: "LinkedIn followers and podcast appearances build awareness. A published book builds authority. There's a credibility ceiling that only authorship can break through in competitive markets.",
    },
    {
      title: "The pitch you can't repeat at scale",
      body: "Your founding story is your best sales tool — but you can only tell it so many times. A book tells it for you, 24/7, to every prospect, investor, and recruit who discovers it.",
    },
    {
      title: "Frameworks locked in your head",
      body: "You've built a proprietary approach to your market. Without a book, those frameworks stay in your head, on whiteboards, and in decks. A memoir externalizes and protects your intellectual capital.",
    },
  ],
  benefits: [
    {
      title: "Deal flow and investor authority",
      body: "\"I wrote the book on it\" is the ultimate competitive advantage. Published founders attract inbound interest from investors, partners, and acquirers who seek out experts rather than just scrolling a pitch deck.",
    },
    {
      title: "Recruiting that runs itself",
      body: "The best talent wants to work with people who think differently. A book signals mission, vision, and intellectual depth in a way no job posting ever can — and it finds the candidates who are already believers.",
    },
    {
      title: "Speaking fees that compound",
      body: "Conference organizers book published authors at 3–10× the rate of non-authors. Your book is the credential that unlocks keynote stages, podcast invitations, and media appearances.",
    },
    {
      title: "Legacy beyond the exit",
      body: "Companies get acquired. Products get disrupted. Your story — the lessons you learned building something from nothing — outlasts any specific venture and becomes the foundation of everything that comes next.",
    },
  ],
  testimonial: {
    quote:
      "Aspirationally, a book should help you make at least a million dollars. It's not about royalties — it's about the clients, the deals, the speaking fees, and the doors that open because you wrote it.",
    attribution: "Paul McManus, More Clients More Fun",
  },
  process: [
    {
      step: "01",
      title: "Extract Your Unfair Insight",
      body: "We identify the unique perspective that only you have — forged by your specific journey, your failures, your pivots, and the lessons that your market desperately needs to hear.",
    },
    {
      step: "02",
      title: "Build the Narrative",
      body: "Through guided interviews, we structure your story as a compelling narrative arc — not a resume, not a LinkedIn post. A book that reads like the business memoir you always meant to write.",
    },
    {
      step: "03",
      title: "Publish & Position",
      body: "Professional editing, a cover that commands credibility, and Amazon optimization. You're a published author in 30 days — with a business development asset that works around the clock.",
    },
  ],
};

export default function EntrepreneurPage() {
  return (
    <>
      <Nav />
      <main>
        <OccupationPage data={data} />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
