"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import styles from "./BookHero.module.css";
import BookCanvas from "./BookCanvas";

export default function BookHero() {
  const [ready, setReady] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <section
        className={`${styles.hero} ${ready ? styles.ready : ""}`}
        id="hero"
      >
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Memoir Ghostwriting, Reimagined
            </div>

            <h1 className={styles.heading}>
              <span className={styles.line1}>Your story,</span>
              <span className={styles.line2}>your voice.</span>
              <span className={styles.line3}><em>Delivered.</em></span>
            </h1>

            <p className={styles.body}>
              Through 3–4 guided interviews, our patented voice-capture
              technology extracts your rhythm, tone, and style. The result is a
              150–230 page manuscript that reads like you wrote every word —
              produced at a fraction of the traditional cost and timeline.
            </p>

            <div className={styles.ctas}>
              <a
                href="#get-started"
                className={styles.ctaPrimary}
                onClick={scrollTo("#get-started")}
                id="hero-cta"
              >
                Begin Your Memoir
                <span className={styles.arrow}>→</span>
              </a>
              <a
                href="#how-it-works"
                className={styles.ctaSecondary}
                onClick={scrollTo("#how-it-works")}
              >
                See how it works
              </a>
            </div>
          </div>

          <div className={styles.bookCol}>
            <BookCanvas wrapperRef={wrapperRef} />
          </div>
        </div>
      </section>
    </div>
  );
}
