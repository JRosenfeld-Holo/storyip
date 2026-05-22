import type { Metadata } from "next";
import Nav from "../components/Nav";
import OccupationPage from "../components/OccupationPage";
import type { OccupationData } from "../components/OccupationPage";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Story IP for Financial Advisors — Publish Your Authority Book",
  description:
    "Turn your financial expertise into a published book that earns client trust before the first meeting. AI-assisted ghostwriting for financial advisors, starting at $3,497.",
  keywords: [
    "financial advisor book",
    "wealth manager memoir",
    "authority book financial advisor",
    "ghostwriting for CFPs",
    "financial advisor marketing",
  ],
};

const data: OccupationData = {
  slug: "financial-advisor",
  profession: "Financial Advisor",
  heroEyebrow: "Story IP for Financial Advisors",
  heroHeadline: "The book that earns trust before the first meeting",
  heroSubheadline:
    "In a market of 330,000+ advisors competing for the same high-net-worth clients, a published book is the single most effective trust accelerator. We turn your expertise into a publish-ready manuscript — you invest 5 hours, we handle the rest.",
  heroStat: {
    value: "10–50×",
    label: "ROI from a single book generating just 1–2 extra clients per month",
  },
  stats: [
    { value: "330K+", label: "Active US Advisors" },
    { value: "10%", label: "Conversion Rate Uplift" },
    { value: "$50K+", label: "Avg. Annual Client Value" },
    { value: "30 Days", label: "To Published Author" },
  ],
  problems: [
    {
      title: "The trust deficit",
      body: "Prospects evaluate 3–5 advisors before choosing one. Without a clear differentiator, you're reduced to competing on fees and credentials — the same ones everyone else has.",
    },
    {
      title: "Invisible expertise",
      body: "You've spent decades mastering retirement planning, tax strategy, and wealth preservation. But your expertise is locked in your head — invisible to the prospects who need it most.",
    },
    {
      title: "The $50,000 barrier",
      body: "Traditional ghostwriting costs $25,000–$100,000+. You understand the ROI of a book, but the price tag has kept it out of reach — until now.",
    },
  ],
  benefits: [
    {
      title: "Pre-sold before the meeting",
      body: "Your book becomes a trust accelerator. Prospects who read it arrive already convinced you're their advisor — making the sales conversation almost automatic.",
    },
    {
      title: "The referral multiplier",
      body: "Distribute copies to Centers of Influence — attorneys, CPAs, estate planners. Your book becomes the calling card that generates referrals on autopilot.",
    },
    {
      title: "Amazon as a lead engine",
      body: "Amazon is the third-largest search engine. Your book surfaces when prospects search for retirement planning, wealth management, or financial advice in your niche.",
    },
    {
      title: "Speaking engagements unlocked",
      body: "Published authors get invited to speak. Your book opens doors to conferences, podcasts, and media coverage that bring clients at scale.",
    },
  ],
  testimonial: {
    quote:
      "A self-published book generating just 1–2 extra clients per month produces 10–50x ROI. Financial advisors are the lowest hanging fruit for authority book services.",
    attribution: "Adam Witty, CEO of Advantage/ForbesBooks",
  },
  process: [
    {
      step: "01",
      title: "Capture Your Philosophy",
      body: "We identify your unique financial philosophy and the story only you can tell — your approach to wealth, your client success stories, your market perspective.",
    },
    {
      step: "02",
      title: "We Write, You Review",
      body: "Through guided interviews, we capture your voice and expertise. Our AI-assisted editorial team transforms it into a polished 150–230 page manuscript.",
    },
    {
      step: "03",
      title: "Publish & Launch",
      body: "Professional cover design, Amazon optimization, and a launch strategy tailored for financial services. You're a published author in 30 days.",
    },
  ],
};

export default function FinancialAdvisorPage() {
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
