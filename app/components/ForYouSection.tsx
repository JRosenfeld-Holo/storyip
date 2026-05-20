"use client";

import { useEffect, useRef } from "react";
import styles from "./ForYouSection.module.css";

const AUDIENCES = [
  { label: "Celebrities", line: "Control your narrative" },
  { label: "Athletes", line: "Capture the journey" },
  { label: "Musicians", line: "Tell the untold story" },
  { label: "Entrepreneurs", line: "Inspire the next generation" },
];

export default function ForYouSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

    const els = sectionRef.current?.querySelectorAll(".fade-up");
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="for-you">
      {/* Top statement */}
      <div className={styles.statement}>
        <div className={`${styles.statementInner} fade-up`}>
          <span className={styles.label}>Built For Visionaries</span>
          <h2 className={styles.headline}>
            Everyone has a story worth telling.
            <br />
            <span className={styles.headlineAccent}>
              Few have the time to write it.
            </span>
          </h2>
          <p className={styles.sub}>
            We pair you with a world-class ghostwriter who captures your voice,
            your vision, and your truth — so you can hold your legacy in your
            hands.
          </p>
        </div>
      </div>

      {/* Audience strip */}
      <div className={styles.audienceStrip}>
        {AUDIENCES.map((a, i) => (
          <div
            key={i}
            className={`${styles.audience} fade-up stagger-${i + 1}`}
          >
            <span className={styles.audienceLabel}>{a.label}</span>
            <span className={styles.audienceDivider} />
            <span className={styles.audienceLine}>{a.line}</span>
            <a
              href="#get-started"
              className={styles.audienceCta}
              onClick={(e) => { e.preventDefault(); document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Begin Your Memoir →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
