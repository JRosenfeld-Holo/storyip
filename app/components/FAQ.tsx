"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

const QUESTIONS = [
  {
    q: "Will it sound like me?",
    a: "Absolutely. Our ghostwriters are trained to capture your unique voice, cadence, and personality. We record your conversations and study the way you tell stories — so every page reads as authentically you. You approve every chapter before it's finalized.",
  },
  {
    q: "How much time do I need?",
    a: "About 5 hours total, spread across 3–5 recorded conversations at your convenience. We schedule around your life — not the other way around. Each session is guided, relaxed, and conversational.",
  },
  {
    q: "Who actually writes it?",
    a: "A dedicated, professionally trained ghostwriter with experience in memoir and narrative nonfiction. You'll be matched with a writer who aligns with your story's tone and subject matter. They work exclusively on your project until completion.",
  },
  {
    q: "Is it confidential?",
    a: "100%. Every ghostwriter signs a comprehensive NDA before they begin. Your story, your conversations, and your personal information are treated with the utmost discretion. You own all rights to the finished manuscript.",
  },
  {
    q: "What do I receive at the end?",
    a: "A fully formatted, publish-ready manuscript in both digital (PDF/ePub) and print-ready formats. The Legacy Edition also includes hardcover copies and a complete launch strategy with marketing materials.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Questions</div>
          <h2 className={styles.heading}>Frequently asked</h2>
        </div>

        <div className={styles.items}>
          {QUESTIONS.map((item, i) => (
            <div key={i} className={styles.item}>
              <button
                className={`${styles.question} ${openIndex === i ? styles.questionOpen : ""}`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                id={`faq-question-${i}`}
              >
                {item.q}
                <span
                  className={`${styles.icon} ${
                    openIndex === i ? styles.iconOpen : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 5L7 9L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <div
                className={`${styles.answerWrap} ${
                  openIndex === i ? styles.answerWrapOpen : ""
                }`}
              >
                <p className={styles.answer}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
