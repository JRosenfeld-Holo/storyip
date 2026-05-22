import type { Metadata } from "next";
import Nav from "../components/Nav";
import OccupationPage from "../components/OccupationPage";
import type { OccupationData } from "../components/OccupationPage";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Story IP for Athletes — Preserve Your Legacy with a Published Memoir",
  description:
    "Your career defined you on the field. Your memoir defines you forever. AI-assisted athlete memoir ghostwriting that captures your journey from the locker room to the legacy. Starting at $3,497.",
  keywords: [
    "athlete memoir",
    "sports autobiography",
    "ghostwriting for athletes",
    "athlete biography",
    "sports legacy book",
  ],
};

const data: OccupationData = {
  slug: "athlete",
  profession: "Athlete",
  heroEyebrow: "Story IP for Athletes",
  heroHeadline: "Your career defined you. Your memoir defines your legacy.",
  heroSubheadline:
    "Every athlete's career ends. The ones who endure beyond the final game are the ones who told their story. A published memoir transforms years of sacrifice, discipline, and hard-won wisdom into a permanent legacy that inspires for generations.",
  heroStat: {
    value: "Forever",
    label: "How long a published memoir outlasts any championship",
  },
  stats: [
    { value: "5 hrs", label: "Your Total Time Investment" },
    { value: "150+", label: "Manuscript Pages" },
    { value: "30 Days", label: "To Published Author" },
    { value: "100%", label: "Your Voice, Your Story" },
  ],
  problems: [
    {
      title: "The post-career identity gap",
      body: "When the final whistle blows, the cameras move on. A memoir ensures your story — the real story, beyond the stats and highlights — lives on after your playing days are over.",
    },
    {
      title: "Wisdom that gets lost",
      body: "Years of training, overcoming injury, locker-room leadership, mental resilience — these lessons are invaluable to fans, young athletes, and coaches. Without a book, they disappear.",
    },
    {
      title: "Fan demand with nowhere to go",
      body: "Your fans want more than highlights. They want the behind-the-scenes truth — the sacrifices, the pressure, the moments that made you. A memoir gives them exactly that.",
    },
  ],
  benefits: [
    {
      title: "Career transcendence",
      body: "The greatest athletes aren't remembered only for their stats — they're remembered for their story. Ali, Jordan, Agassi. A memoir is how you join that conversation.",
    },
    {
      title: "Post-career brand foundation",
      body: "A published memoir is the anchor for speaking engagements, coaching programs, branded content, and media opportunities that extend your earning power beyond your playing career.",
    },
    {
      title: "Inspiration that scales",
      body: "You've inspired millions through your performance. A memoir lets that inspiration reach millions more — including the next generation of athletes who need to hear your story.",
    },
    {
      title: "Your version of the truth",
      body: "Journalists, podcasts, and documentaries tell their version. A memoir lets you tell yours — unfiltered, in your own voice, with full control over the narrative.",
    },
  ],
  testimonial: {
    quote:
      "A memoir is how great athletes become legends. The game ends, but the story never does. It's the most powerful thing you can leave behind for the fans who believed in you.",
    attribution: "Story IP Editorial Team",
  },
  process: [
    {
      step: "01",
      title: "Map Your Journey",
      body: "From early life and the spark that drove you to your sport, through the defining moments of your career, to the lessons only you can teach — we architect your story's arc.",
    },
    {
      step: "02",
      title: "Tell It Your Way",
      body: "Through guided interviews, you talk — we capture your voice, your humor, your candor. The finished manuscript reads exactly like you, not like a ghostwriter.",
    },
    {
      step: "03",
      title: "Publish & Launch",
      body: "Professional editing, custom cover design, and Amazon distribution. Your memoir is live and in readers' hands in 30 days — a legacy asset built to last.",
    },
  ],
};

export default function AthletePage() {
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
