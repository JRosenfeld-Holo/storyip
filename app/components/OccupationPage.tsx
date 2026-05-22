"use client";

import { useEffect, useRef } from "react";
import styles from "./OccupationPage.module.css";

export interface OccupationData {
  slug: string;
  profession: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroStat: { value: string; label: string };
  stats: { value: string; label: string }[];
  problems: { title: string; body: string }[];
  benefits: { title: string; body: string }[];
  testimonial: { quote: string; attribution: string };
  process: { step: string; title: string; body: string }[];
}

export default function OccupationPage({ data }: { data: OccupationData }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = pageRef.current?.querySelectorAll(".fade-up");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={pageRef}>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>{data.heroEyebrow}</div>
            <h1 className={styles.heroHeadline}>{data.heroHeadline}</h1>
            <p className={styles.heroSub}>{data.heroSubheadline}</p>
            <a href="#get-started" className={styles.heroCta} onClick={scrollToForm}>
              Begin Your Book
              <span className={styles.heroCtaArrow}>→</span>
            </a>
          </div>
          <div className={styles.heroStatCard}>
            <div className={styles.heroStatValue}>{data.heroStat.value}</div>
            <div className={styles.heroStatLabel}>{data.heroStat.label}</div>
          </div>
        </div>
        <div className={styles.heroFade} />
      </section>

      {/* ── Stats Strip ────────────────────────────────────────── */}
      <section className={styles.statsStrip}>
        <div className={styles.statsInner}>
          {data.stats.map((stat, i) => (
            <div key={i} className={`${styles.statItem} fade-up stagger-${i + 1}`}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem Section ────────────────────────────────────── */}
      <section className={styles.problemSection}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} fade-up`}>
            <div className={styles.label}>The Challenge</div>
            <h2 className={styles.sectionHeading}>
              Why {data.profession.toLowerCase()}s need a{" "}
              <span className={styles.accent}>published book</span>
            </h2>
          </div>
          <div className={styles.problemGrid}>
            {data.problems.map((problem, i) => (
              <div key={i} className={`${styles.problemCard} fade-up stagger-${i + 1}`}>
                <h3 className={styles.problemTitle}>{problem.title}</h3>
                <p className={styles.problemBody}>{problem.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Section ───────────────────────────────────── */}
      <section className={styles.benefitsSection}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} fade-up`}>
            <div className={styles.label}>The Advantage</div>
            <h2 className={styles.sectionHeading}>
              How a book transforms your{" "}
              <span className={styles.accent}>practice</span>
            </h2>
          </div>
          <div className={styles.benefitsGrid}>
            {data.benefits.map((benefit, i) => (
              <div key={i} className={`${styles.benefitCard} fade-up stagger-${i + 1}`}>
                <div className={styles.benefitNumber}>0{i + 1}</div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitBody}>{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────────────────────────────── */}
      <section className={styles.testimonialSection}>
        <div className={`${styles.testimonialInner} fade-up`}>
          <div className={styles.quoteOrn}>✦</div>
          <blockquote className={styles.quoteText}>
            &ldquo;{data.testimonial.quote}&rdquo;
          </blockquote>
          <div className={styles.quoteAttr}>{data.testimonial.attribution}</div>
        </div>
      </section>

      {/* ── Process Section ─────────────────────────────────────── */}
      <section className={styles.processSection}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} fade-up`}>
            <div className={styles.label}>The Process</div>
            <h2 className={styles.sectionHeading}>
              From conversation to{" "}
              <span className={styles.accent}>published author</span>
            </h2>
          </div>
          <div className={styles.processGrid}>
            {data.process.map((step, i) => (
              <div key={i} className={`${styles.processCard} fade-up stagger-${i + 1}`}>
                <div className={styles.processStep}>{step.step}</div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────── */}
      <section className={styles.bottomCta}>
        <div className={`${styles.bottomCtaInner} fade-up`}>
          <h2 className={styles.bottomCtaHeading}>
            Ready to become a{" "}
            <span className={styles.accent}>published {data.profession.toLowerCase()}</span>?
          </h2>
          <p className={styles.bottomCtaSub}>
            Join the professionals who are using authority publishing to transform their practices.
          </p>
          <a href="#get-started" className={styles.bottomCtaBtn} onClick={scrollToForm}>
            Schedule Your Free Consultation
            <span className={styles.heroCtaArrow}>→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
