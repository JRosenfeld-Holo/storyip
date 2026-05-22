import type { Metadata } from "next";
import Nav from "../components/Nav";
import OccupationPage from "../components/OccupationPage";
import type { OccupationData } from "../components/OccupationPage";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Story IP for Celebrities — Tell Your Story Before Someone Else Does",
  description:
    "Your life is the story people already want to read. AI-assisted celebrity memoir ghostwriting that captures your authentic voice and turns it into a published book in 30 days. Starting at $3,497.",
  keywords: [
    "celebrity memoir",
    "celebrity autobiography",
    "ghostwriting for celebrities",
    "celebrity book deal",
    "publish my memoir",
  ],
};

const data: OccupationData = {
  slug: "celebrity",
  profession: "Celebrity",
  heroEyebrow: "Story IP for Celebrities",
  heroHeadline: "Tell your story before someone else does",
  heroSubheadline:
    "Your life is the story people already want to read. A memoir in your own voice is the most powerful brand asset you can own — more durable than a headline, more intimate than a social post, and more lucrative than any endorsement deal.",
  heroStat: {
    value: "30 Days",
    label: "From your first interview to a publish-ready manuscript",
  },
  stats: [
    { value: "5 hrs", label: "Your Total Time Investment" },
    { value: "150+", label: "Manuscript Pages" },
    { value: "30 Days", label: "To Published Author" },
    { value: "88%", label: "Less Than Traditional Ghostwriting" },
  ],
  problems: [
    {
      title: "The narrative vacuum",
      body: "When you don't control your story, tabloids, Wikipedia, and social media do it for you. A memoir puts the definitive account of your life in your own words — permanently.",
    },
    {
      title: "A legacy that outlasts the moment",
      body: "Cultural moments fade. Viral clips disappear. A published book remains on shelves and search engines for decades — it's how you ensure your story survives the news cycle.",
    },
    {
      title: "The $150,000 price tag",
      body: "Traditional celebrity memoir ghostwriting costs $150,000–$500,000 for a major-house deal. We deliver a publish-ready, professionally edited manuscript at a fraction of that cost.",
    },
  ],
  benefits: [
    {
      title: "Your authentic voice, captured",
      body: "We interview you — not your publicist. Our voice-capture process extracts your rhythm, your humor, your candor. The result reads like you wrote every word.",
    },
    {
      title: "Brand extension & licensing",
      body: "A published memoir unlocks film and TV adaptation opportunities, branded merchandise, speaking engagements, and podcast tours that a social presence alone cannot generate.",
    },
    {
      title: "Direct fan connection",
      body: "Your fans already follow you. A memoir gives them something to hold, share, gift, and remember. It deepens the relationship in a way no algorithm-driven feed can replicate.",
    },
    {
      title: "The ultimate press trigger",
      body: "\"Author\" is a media credential that opens doors. A book launch generates press, podcast invitations, and renewed cultural relevance — a built-in PR campaign on publication day.",
    },
  ],
  testimonial: {
    quote:
      "A memoir is the most intimate thing a celebrity can share with their audience. It's the story behind the story — and it creates a bond that outlasts any single moment in the spotlight.",
    attribution: "Story IP Editorial Team",
  },
  process: [
    {
      step: "01",
      title: "Story Architecture",
      body: "We map the arc of your life — the pivotal moments, the turning points, the behind-the-scenes truths that your audience has never heard. Every great memoir starts with the right structure.",
    },
    {
      step: "02",
      title: "Voice Capture Sessions",
      body: "Through 4–5 hours of guided interviews, we capture your natural speaking voice, your cadence, your humor. You talk — we turn it into prose that reads exactly like you.",
    },
    {
      step: "03",
      title: "Publish & Launch",
      body: "Professional editing, custom cover design built around your brand, and Amazon distribution. You're a published author with a tangible legacy asset in 30 days.",
    },
  ],
};

export default function CelebrityPage() {
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
