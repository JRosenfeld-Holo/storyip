"use client";

import { useEffect, useRef } from "react";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    number: "01",
    title: "Talk To Us",
    desc: "Share your story over 3–4 guided conversations. We ask the right questions — all you do is talk. Every word is captured and analyzed for your unique voice.",
    detail: "~1.5 hrs per session",
  },
  {
    number: "02",
    title: "We Write",
    desc: "Our patented voice-capture technology and dedicated ghostwriter craft a polished manuscript that sounds exactly like you wrote every word.",
    detail: "150–230 page manuscript",
  },
  {
    number: "03",
    title: "You Publish",
    desc: "Receive a print-ready, publish-ready book — formatted, designed, and delivered in 30 days. Your legacy, ready to share.",
    detail: "30-day delivery",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    sectionRef.current
      ?.querySelectorAll(".fade-up")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="how-it-works" ref={sectionRef}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={`${styles.header} fade-up`}>
          <span className={styles.label}>The Process</span>
          <h2 className={styles.heading}>
            Three steps.<br />
            One <em>unforgettable</em> book.
          </h2>
        </div>

        {/* Step grid */}
        <div className={styles.grid}>
          {STEPS.map((step, i) => (
            <article
              key={step.number}
              className={`${styles.step} fade-up stagger-${i + 1}`}
            >
              {/* Top rule — draws in via CSS on .visible */}
              <div className={styles.rule} aria-hidden="true" />

              <div className={styles.stepNum}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>

              <div className={styles.stepDetail}>
                <span className={styles.stepDetailDash} aria-hidden="true" />
                {step.detail}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom connector line */}
        <div className={`${styles.bottomRule} fade-up stagger-4`} aria-hidden="true" />
      </div>
    </section>
  );
}
