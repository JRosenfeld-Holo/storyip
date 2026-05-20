"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "Story IP revolutionized the way I approach my legacy. The ghostwriting team perfectly captured my voice and my vision.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Former Athlete",
  },
  {
    text: "The process was smooth and quick. The team's understanding of my story made the interviews completely effortless.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "Tech Entrepreneur",
  },
  {
    text: "The editorial team is exceptional, guiding me through the narrative structure and ensuring my absolute satisfaction.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Philanthropist",
  },
  {
    text: "Their seamless process enhanced my ability to tell my story without taking me away from running my business.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "The robust outlining and quick revisions transformed my scattered thoughts into a cohesive, gripping narrative.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Public Figure",
  },
  {
    text: "The smooth implementation exceeded expectations. They took my raw ideas and turned them into a bestseller.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Author",
  },
  {
    text: "My public perception improved dramatically after releasing the book. It perfectly articulated my unique journey.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a manuscript that exceeded expectations, truly understanding my life's work and legacy.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Founder",
  },
  {
    text: "Publishing this memoir significantly improved my speaking career and online presence. Highly recommended.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "Keynote Speaker",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className={styles.card}>
    <p className={styles.quoteText}>{testimonial.text}</p>
    <div className={styles.author}>
      <div className={styles.avatar}>
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          sizes="40px"
          className={styles.avatarImg}
        />
      </div>
      <div className={styles.authorInfo}>
        <cite className={styles.authorName}>{testimonial.name}</cite>
        <span className={styles.authorRole}>{testimonial.role}</span>
      </div>
    </div>
  </div>
);

const TestimonialsColumn = ({
  items,
  className,
  speedClass,
}: {
  items: Testimonial[];
  className?: string;
  speedClass: string;
}) => {
  return (
    <div className={`${styles.columnWrapper} ${className || ""}`}>
      <div className={`${styles.column} ${speedClass}`}>
        {/* Render the items twice to create the infinite loop effect */}
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((t, index) => (
              <TestimonialCard key={`${i}-${index}`} testimonial={t} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="testimonials" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Testimonials</div>
          <h2 className={styles.heading}>What our authors say</h2>
          <p className={styles.sub}>
            Discover how visionary leaders streamline their legacy with our platform.
          </p>
        </div>

        <div className={styles.marqueeContainer}>
          <TestimonialsColumn
            items={firstColumn}
            speedClass={styles.speedFast}
          />
          <TestimonialsColumn
            items={secondColumn}
            className={styles.hideMobile}
            speedClass={styles.speedSlow}
          />
          <TestimonialsColumn
            items={thirdColumn}
            className={styles.hideTablet}
            speedClass={styles.speedMedium}
          />
        </div>
      </div>
    </section>
  );
}
