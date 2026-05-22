"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BookHero.module.css";
import BookCanvas from "./BookCanvas";

export default function BookHero() {
  const [ready, setReady] = useState(false);
  const wrapperRef          = useRef<HTMLDivElement>(null);
  const contentRef          = useRef<HTMLDivElement>(null);
  const bookColRef          = useRef<HTMLDivElement>(null);
  const bookPlaceholderRef  = useRef<HTMLDivElement>(null);
  const textOverlayRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const wrapper     = wrapperRef.current;
    const bookCol     = bookColRef.current;
    const ph          = bookPlaceholderRef.current;
    const content     = contentRef.current;
    const textOverlay = textOverlayRef.current;
    if (!wrapper || !bookCol || !ph) return;

    // No morph animation on mobile — column is hidden anyway
    if (window.innerWidth < 960) return;

    gsap.registerPlugin(ScrollTrigger);

    let started = false;
    let s0 = 0, t0 = 0, w0 = 0, h0 = 0;

    const reset = () => {
      started = false;
      bookCol.style.cssText = "";
      ph.style.display = "none";
      ph.style.height  = "";
      if (content)     content.style.opacity = "";
      if (textOverlay) textOverlay.style.opacity = "0";
    };

    const startExpansion = () => {
      if (started) return;
      started = true;

      // Capture in-flow position (hero is sticky top:0 so viewport coords = hero-relative coords)
      const r = bookCol.getBoundingClientRect();
      s0 = r.left; t0 = r.top; w0 = r.width; h0 = r.height;

      // Pull bookCol out of flow at the exact same position — no visual jump
      bookCol.style.position   = "absolute";
      bookCol.style.left       = `${s0}px`;
      bookCol.style.top        = `${t0}px`;
      bookCol.style.width      = `${w0}px`;
      bookCol.style.height     = `${h0}px`;
      bookCol.style.zIndex     = "10";
      bookCol.style.transition = "none"; // GSAP owns the transform from here

      // Spacer holds the right column's space in the grid
      ph.style.height  = `${h0}px`;
      ph.style.display = "block";
    };

    const proxy = { p: 0 };
    const tl = gsap.timeline({ paused: true });

    tl.to(proxy, {
      p: 1,
      ease: "none",
      duration: 1,
      onUpdate() {
        if (!started) return;
        const p  = proxy.p;
        const vh = window.innerHeight;
        const vw = window.innerWidth;

        // Left column fades out in the first 40% of scroll
        if (content) content.style.opacity = String(1 - Math.min(1, p / 0.4));

        // Book column expands from column → full viewport
        bookCol.style.left         = `${s0 * (1 - p)}px`;
        bookCol.style.top          = `${t0 * (1 - p)}px`;
        bookCol.style.width        = `${w0 + (vw - w0) * p}px`;
        bookCol.style.height       = `${h0 + (vh - h0) * p}px`;
        bookCol.style.borderRadius = `${18 * (1 - p)}px`;

        // Text overlay fades in once book is nearly full-screen
        if (textOverlay) {
          textOverlay.style.opacity = String(Math.max(0, (p - 0.85) / 0.15));
        }
      },
    });

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start:   "top top",
      end:     "bottom bottom",
      scrub:   1,
      animation: tl,
      onEnter: () => startExpansion(),
    });

    const onResize = () => { if (started) reset(); };
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      tl.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

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
          {/* ── Left: text ── */}
          <div className={styles.content} ref={contentRef}>
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

          {/* ── Right: 3-D book — NOT a positioning context so absolute bookCol escapes to hero ── */}
          <div className={styles.bookColOuter}>
            {/* Holds column space after bookCol goes absolute */}
            <div className={styles.bookPlaceholder} ref={bookPlaceholderRef} aria-hidden="true" />

            {/* Starts in-flow; JS makes it position:absolute then expands to full viewport */}
            <div className={styles.bookCol} ref={bookColRef}>
              <BookCanvas wrapperRef={wrapperRef} />

              <div className={styles.textOverlay} ref={textOverlayRef} aria-hidden="true">
                <p className={styles.textOverlayLine}>What story will you tell?</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
