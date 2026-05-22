import type { Metadata } from "next";
import Nav from "../components/Nav";
import OccupationPage from "../components/OccupationPage";
import type { OccupationData } from "../components/OccupationPage";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Story IP for Dentists — Attract Premium Patients with a Published Book",
  description:
    "Turn your dental expertise into a published book that attracts premium patients, boosts case acceptance, and triples practice revenue. Starting at $3,497.",
  keywords: [
    "dentist book",
    "dental authority marketing",
    "ghostwriting for dentists",
    "dental practice marketing",
    "dentist author",
  ],
};

const data: OccupationData = {
  slug: "dentist",
  profession: "Dentist",
  heroEyebrow: "Story IP for Dentists",
  heroHeadline: "The ultimate trust trigger for your dental practice",
  heroSubheadline:
    "202,000 dentists compete across 177,559 practices. A published book is what Adam Witty calls \"the ultimate Trust Trigger\" — it pre-educates patients, boosts case acceptance, and positions you as the authority patients choose over every other practice in town.",
  heroStat: {
    value: "3×",
    label: "Practice revenue increase reported by Dr. Jamie Reynolds after publishing",
  },
  stats: [
    { value: "202K", label: "Active US Dentists" },
    { value: "3×", label: "Revenue Increase" },
    { value: "3.38%", label: "Healthcare DM Response" },
    { value: "30 Days", label: "To Published Author" },
  ],
  problems: [
    {
      title: "The crowded marketplace",
      body: "With 177,559 dental practices in the US, patients can't tell the difference between you and the practice down the street. Price and proximity become the only deciding factors.",
    },
    {
      title: "Case acceptance barriers",
      body: "High-value procedures require trust. Patients hesitate on implants, cosmetic work, and comprehensive treatment plans because they haven't been pre-educated — your book does that for you.",
    },
    {
      title: "Marketing that disappears",
      body: "SEO campaigns end. Google Ads stop when you stop paying. A published book is a permanent marketing asset that generates authority, visibility, and patient trust for years.",
    },
  ],
  benefits: [
    {
      title: "The ultimate trust trigger",
      body: "Give signed copies during consultations to boost case acceptance. Patients who read your book arrive pre-educated about procedures, reducing chair time spent on explanation.",
    },
    {
      title: "Referral network credibility",
      body: "Your book becomes the credibility piece that strengthens relationships with specialists, hygienists, and general practitioners who refer patients to your practice.",
    },
    {
      title: "Premium positioning",
      body: "A book lets you charge what your expertise is worth. Patients see you differently when you've written the book on their procedure — you become the obvious choice.",
    },
    {
      title: "Content & speaking engine",
      body: "Repurpose your book content for SEO, social media, and dental conference presentations. Leverage published-author status for speaking invitations and media coverage.",
    },
  ],
  testimonial: {
    quote:
      "Business tripled at my orthodontic practice after publishing my book. There's no other marketing tool that communicates authority and trust the way a book does.",
    attribution: "Dr. Jamie Reynolds, Orthodontist",
  },
  process: [
    {
      step: "01",
      title: "Define Your Specialty",
      body: "We identify the dental topics that showcase your expertise — smile makeovers, implant education, holistic dentistry, or the patient experience that sets your practice apart.",
    },
    {
      step: "02",
      title: "Capture Your Voice",
      body: "Through guided interviews, we extract your clinical knowledge, patient success stories, and treatment philosophy into a compelling manuscript your patients will trust.",
    },
    {
      step: "03",
      title: "Publish & Launch",
      body: "Professional editing, custom cover design, and a launch strategy built for dental practices. You're a published author in 30 days with a powerful new patient acquisition tool.",
    },
  ],
};

export default function DentistPage() {
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
