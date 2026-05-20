"use client";

import { useEffect, useRef } from "react";
import styles from "./Pricing.module.css";

const PLANS = [
  {
    name: "Essential Memoir",
    price: "$3,497",
    featured: false,
    tag: null,
    features: [
      "Up to 150 pages",
      "1 round of revisions",
      "Digital + print-ready files",
      "Custom cover design",
      "30-day delivery",
    ],
  },
  {
    name: "Legacy Edition",
    price: "$7,997",
    featured: true,
    tag: "Most Popular",
    features: [
      "Up to 230 pages",
      "Unlimited revisions",
      "Hardcover & digital formats",
      "Premium cover design",
      "Launch strategy & marketing kit",
      "Priority 25-day delivery",
    ],
  },
  {
    name: "White Glove",
    price: "$12,997",
    featured: false,
    tag: null,
    features: [
      "Up to 300 pages",
      "Unlimited revisions",
      "Hardcover & digital formats",
      "Bespoke cover design",
      "Full launch campaign & PR kit",
      "Speaking engagement preparation",
      "Priority 20-day delivery",
    ],
  },
];

export default function Pricing() {
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.section} ref={sectionRef} id="pricing">
      <div className={styles.inner}>
        <div className={`${styles.header} fade-up`}>
          <div className={styles.label}>Investment</div>
          <h2 className={styles.heading}>
            Choose your{" "}
            <span className={styles.headingAccent}>memoir package</span>
          </h2>
        </div>

        <div className={styles.cards}>
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`${styles.card} ${plan.featured ? styles.featured : ""} fade-up stagger-${i + 1}`}
            >
              {plan.tag && (
                <div className={styles.badge}>{plan.tag}</div>
              )}
              <div className={styles.cardName}>{plan.name}</div>
              <div className={styles.cardPrice}>{plan.price}</div>
              <div className={styles.features}>
                {plan.features.map((f, j) => (
                  <div key={j} className={styles.feature}>
                    <span className={styles.checkmark}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <a
                href="#get-started"
                className={`${styles.cardCta} ${
                  plan.featured ? styles.cardCtaPrimary : styles.cardCtaSecondary
                }`}
                onClick={handleClick}
                id={`pricing-cta-${i}`}
              >
                Begin Your Memoir
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
