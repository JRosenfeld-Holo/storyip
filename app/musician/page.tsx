import type { Metadata } from "next";
import Nav from "../components/Nav";
import OccupationPage from "../components/OccupationPage";
import type { OccupationData } from "../components/OccupationPage";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Story IP for Musicians — Tell the Story Behind the Music",
  description:
    "Your fans know every lyric. Now give them the story behind the songs. AI-assisted musician memoir ghostwriting that captures your journey, your influences, and your truth. Starting at $3,497.",
  keywords: [
    "musician memoir",
    "music biography",
    "ghostwriting for musicians",
    "rock memoir",
    "musician autobiography",
  ],
};

const data: OccupationData = {
  slug: "musician",
  profession: "Musician",
  heroEyebrow: "Story IP for Musicians",
  heroHeadline: "Your fans know every lyric. Give them the story behind the songs.",
  heroSubheadline:
    "The greatest music memoirs don't just document a career — they explain a life. From the influences that shaped your sound to the moments that almost broke you, your story is the context that makes everything you've created more meaningful.",
  heroStat: {
    value: "∞",
    label: "The shelf life of a great music memoir",
  },
  stats: [
    { value: "5 hrs", label: "Your Total Time Investment" },
    { value: "150+", label: "Manuscript Pages" },
    { value: "30 Days", label: "To Published Author" },
    { value: "100%", label: "Your Voice, Your Truth" },
  ],
  problems: [
    {
      title: "The streaming paradox",
      body: "Your music is everywhere but feels disposable. A memoir anchors your catalog — it gives listeners a reason to return to your early work and understand why every album matters.",
    },
    {
      title: "The story only you can tell",
      body: "The influences, the failures, the breakthroughs, the behind-the-scenes chaos of your creative process — these stories exist only in your memory. Without a book, they're lost.",
    },
    {
      title: "Superfans with no deeper access",
      body: "Your most loyal fans have followed every release and every tour. A memoir is the ultimate offering — an intimate, unfiltered invitation into the life behind the music.",
    },
  ],
  benefits: [
    {
      title: "Catalog context that deepens engagement",
      body: "Readers go back and listen differently after your memoir. Every album becomes richer, every lyric more meaningful. Your catalog gets a second life with each new reader.",
    },
    {
      title: "The ultimate superfan artifact",
      body: "A signed memoir is the most coveted merch item that exists. It outlasts any T-shirt or vinyl and creates a collector's market around your work.",
    },
    {
      title: "Creative legacy documentation",
      body: "Your musical influences, your writing process, your collaborators — these contributions to the art form deserve to be documented in your own words, not in a Wikipedia paragraph.",
    },
    {
      title: "New revenue and media opportunities",
      body: "A memoir triggers press, podcast tours, streaming documentary interest, and speaking engagements at music festivals and conferences — revenue streams that extend well beyond the book itself.",
    },
  ],
  testimonial: {
    quote:
      "The best music memoirs change how you hear everything the artist has ever made. That's the power of giving your fans the story behind the songs — it makes your whole catalog feel new.",
    attribution: "Story IP Editorial Team",
  },
  process: [
    {
      step: "01",
      title: "Map Your Musical Journey",
      body: "From your earliest influences and the moment you knew music was your calling, through the creative breakthroughs and the difficult chapters — we structure your story's arc.",
    },
    {
      step: "02",
      title: "Capture Your Voice",
      body: "Through guided interviews, you share the real stories — on-record and off. We transform your natural speaking voice into prose that reads like your best lyrics: honest and undeniable.",
    },
    {
      step: "03",
      title: "Publish & Launch",
      body: "Professional editing, custom cover design that honors your visual aesthetic, and Amazon distribution. Your memoir is live in 30 days — a permanent artifact for every fan.",
    },
  ],
};

export default function MusicianPage() {
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
