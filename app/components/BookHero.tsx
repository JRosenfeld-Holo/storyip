"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BookHero.module.css";

export default function BookHero() {
  const [ready, setReady] = useState(false);
  const wrapperRef     = useRef<HTMLDivElement>(null);
  const videoColRef    = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const imageWrapRef   = useRef<HTMLDivElement>(null);
  const imageFrameRef  = useRef<HTMLDivElement>(null);
  const badgeRef       = useRef<HTMLDivElement>(null);
  const contentRef     = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const wrapper     = wrapperRef.current;
    const ph          = placeholderRef.current;
    const imgWrap     = imageWrapRef.current;
    const imgFrame    = imageFrameRef.current;
    const badge       = badgeRef.current;
    const content     = contentRef.current;
    const textOverlay = textOverlayRef.current;
    if (!wrapper || !ph || !imgWrap || !imgFrame) return;

    if (window.innerWidth < 960) return;

    gsap.registerPlugin(ScrollTrigger);

    let started = false;
    let s0 = 0, t0 = 0, w0 = 0, h0 = 0;

    const reset = () => {
      started = false;
      imgWrap.style.cssText = "";
      imgFrame.style.cssText = "";
      ph.style.display = "none";
      ph.style.height = "";
      if (content)     content.style.opacity = "";
      if (badge)       badge.style.opacity = "";
      if (textOverlay) textOverlay.style.opacity = "0";
    };

    const startExpansion = () => {
      if (started) return;
      started = true;

      // Disable any remaining CSS transitions before GSAP takes over
      imgFrame.style.transition = "none";

      // Capture imageWrap's exact viewport position (hero is sticky top:0 left:0)
      const r = imgWrap.getBoundingClientRect();
      s0 = r.left; t0 = r.top; w0 = r.width; h0 = r.height;

      // Switch imageWrap out of flow — matched coords so there's no visual jump
      imgWrap.style.position = "absolute";
      imgWrap.style.left     = `${s0}px`;
      imgWrap.style.top      = `${t0}px`;
      imgWrap.style.width    = `${w0}px`;
      imgWrap.style.height   = `${h0}px`;

      // Show placeholder to hold column height
      ph.style.height  = `${h0}px`;
      ph.style.display = "block";

      // Make frame fill the absolute container
      imgFrame.style.position = "absolute";
      imgFrame.style.inset    = "0";
      imgFrame.style.maxWidth = "none";
      const vid = imgFrame.querySelector("video") as HTMLElement | null;
      if (vid) { vid.style.height = "100%"; vid.style.objectFit = "cover"; }
    };

    // GSAP drives a proxy value that ScrollTrigger scrubs smoothly
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

        const fade = Math.min(1, p / 0.4);
        if (content) content.style.opacity = String(1 - fade);
        if (badge)   badge.style.opacity   = String(1 - fade);

        imgWrap.style.left   = `${s0 * (1 - p)}px`;
        imgWrap.style.top    = `${t0 * (1 - p)}px`;
        imgWrap.style.width  = `${w0 + (vw - w0) * p}px`;
        imgWrap.style.height = `${h0 + (vh - h0) * p}px`;

        imgFrame.style.borderRadius = `${18 * (1 - p)}px`;
        imgFrame.style.transform    = `rotate(${-2.5 * (1 - p)}deg)`;

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
      // onEnter fires immediately when scroll reaches the trigger — before scrub lag —
      // so the DOM switch (relative → absolute) happens at the right moment
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

          {/* videoCol is NOT a positioning context — imageWrap escapes to hero when absolute */}
          <div className={styles.videoCol} ref={videoColRef}>
            {/* Invisible spacer shown by JS to hold column height after imageWrap leaves flow */}
            <div className={styles.imagePlaceholder} ref={placeholderRef} aria-hidden="true" />

            {/* In-flow on load so video is visible; GSAP pulls it out on first scroll */}
            <div className={styles.imageWrap} ref={imageWrapRef}>
              <div className={styles.imageFrame} ref={imageFrameRef}>
                <video
                  className={styles.bookVideo}
                  src="/book.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                />
                <div className={styles.imgOverlay} aria-hidden="true" />
              </div>

              <div className={styles.textOverlay} ref={textOverlayRef}>
                <p className={styles.textOverlayLine}>What story will you tell?</p>
              </div>

              <div className={styles.badge} ref={badgeRef}>
                <svg className={styles.badgeHex} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2L21.196 7V17L12 22L2.804 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <div className={styles.badgeText}>
                  <span className={styles.badgeTitle}>Patented Technology</span>
                  <span className={styles.badgeSub}>Voice Capture System</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
