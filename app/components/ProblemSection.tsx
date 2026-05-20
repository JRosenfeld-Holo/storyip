"use client";

import { useEffect, useRef } from "react";
import styles from "./ProblemSection.module.css";

const PROBLEMS = [
  {
    num: "01",
    title: "\"I don't have time to write.\"",
    body: "Between tours, games, board meetings, and family — sitting down to write 200 pages feels impossible. We only need 5 hours of your time, total.",
  },
  {
    num: "02",
    title: "\"It won't sound like me.\"",
    body: "Our ghostwriters are trained to disappear. Every sentence is vetted against your voice until the book reads as if you typed every word yourself.",
  },
  {
    num: "03",
    title: "\"Publishing is confusing.\"",
    body: "We handle formatting, ISBN, cover design, distribution, and launch strategy. You receive a finished, publish-ready book — no learning curve required.",
  },
];

export default function ProblemSection() {
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
    <section className={styles.section} ref={sectionRef} id="problem">
      <div className={styles.inner}>
        <div className={`${styles.header} fade-up`}>
          <div className={styles.label}>The Problem</div>
          <h2 className={styles.heading}>
            You have a story the world needs to hear.{" "}
            <span className={styles.headingAccent}>But who has time to write a book?</span>
          </h2>
        </div>

        <div className={`${styles.cards} fade-up stagger-2`}>
          {PROBLEMS.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardNumber}>{p.num}</div>
              <div className={styles.cardTitle}>{p.title}</div>
              <p className={styles.cardBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
