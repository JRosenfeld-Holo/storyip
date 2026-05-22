import type { Metadata } from "next";
import Nav from "../components/Nav";
import OccupationPage from "../components/OccupationPage";
import type { OccupationData } from "../components/OccupationPage";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Story IP for Chiropractors — Build Authority with a Published Book",
  description:
    "Transform your chiropractic expertise into a published book that bridges the credibility gap, attracts patients, and doubles MD referrals. Starting at $3,497.",
  keywords: [
    "chiropractor book",
    "chiropractic authority",
    "ghostwriting for chiropractors",
    "chiropractic marketing",
    "chiropractor author",
  ],
};

const data: OccupationData = {
  slug: "chiropractor",
  profession: "Chiropractor",
  heroEyebrow: "Story IP for Chiropractors",
  heroHeadline: "Bridge the credibility gap with a published book",
  heroSubheadline:
    "Chiropractors are highly educated but seldom seen as an authority. A published book instantly transforms you from \"alternative practitioner\" to recognized expert — attracting patients, doubling MD referrals, and positioning you as the authority in your market.",
  heroStat: {
    value: "2×",
    label: "More MD referrals for published chiropractors",
  },
  stats: [
    { value: "70K+", label: "Licensed US Chiropractors" },
    { value: "<0.1%", label: "Have Published a Book" },
    { value: "2×", label: "MD Referral Increase" },
    { value: "30 Days", label: "To Published Author" },
  ],
  problems: [
    {
      title: "The credibility gap",
      body: "Unlike MDs, chiropractors are \"highly educated but an undervalued member of the medical community who are seldom seen as an authority.\" A book bridges this gap instantly.",
    },
    {
      title: "Competing on price & location",
      body: "Without a clear differentiator, patients choose based on proximity and insurance — not expertise. You're competing with every other DC within a 10-mile radius on identical criteria.",
    },
    {
      title: "Referrals that never come",
      body: "Medical doctors could be your biggest referral source, but they won't send patients to a practitioner they perceive as unproven. A published book changes the conversation entirely.",
    },
  ],
  benefits: [
    {
      title: "Instant authority with patients",
      body: "When patients are unsure which office to choose, being a published author definitively helps convert them. Your book works as a 24/7 authority-building tool.",
    },
    {
      title: "The MD referral tool",
      body: "Dr. Jeff Langmaid's book helped practitioners double medical doctor referrals. Your book becomes the professional credibility piece that opens doors with specialists and physicians.",
    },
    {
      title: "Free book funnel for new patients",
      body: "Use your book as a lead magnet — free book funnels attract new patients who arrive pre-educated about your approach and ready to commit to treatment plans.",
    },
    {
      title: "Content engine for your practice",
      body: "One book feeds your blog, newsletters, social media, and speaking engagements for years. It's the content foundation that keeps generating visibility and authority.",
    },
  ],
  testimonial: {
    quote:
      "Being an author of two books gives instant credibility with established and new patients alike... when patients are unsure which office to choose, being a published author definitely helps convert them.",
    attribution: "Dr. Jeffrey Shebovsky, DC — Totally Booked Practice client",
  },
  process: [
    {
      step: "01",
      title: "Identify Your Expertise",
      body: "We pinpoint the clinical stories and patient education topics that will resonate most — back pain, posture correction, holistic wellness, or your unique approach to care.",
    },
    {
      step: "02",
      title: "Guided Conversations",
      body: "Through 2–3 hours of structured interviews, we capture your voice, your philosophy, and the patient success stories that make your practice unique.",
    },
    {
      step: "03",
      title: "Publish & Position",
      body: "Professional editing, custom cover design, and Amazon optimization. You're a published author with a powerful new patient acquisition tool in 30 days.",
    },
  ],
};

export default function ChiropractorPage() {
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
