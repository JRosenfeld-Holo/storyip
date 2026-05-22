"use client";

import { useEffect, useRef } from "react";
import styles from "./PublishedBooks.module.css";

const BOOKS = [
  {
    title: "Coming Soon",
    author: "Published Author",
    description: "A live published book will be featured here with a direct Amazon link.",
    amazonUrl: "#",
    placeholder: true,
  },
  {
    title: "Coming Soon",
    author: "Published Author",
    description: "A live published book will be featured here with a direct Amazon link.",
    amazonUrl: "#",
    placeholder: true,
  },
  {
    title: "Coming Soon",
    author: "Published Author",
    description: "A live published book will be featured here with a direct Amazon link.",
    amazonUrl: "#",
    placeholder: true,
  },
];

export default function PublishedBooks() {
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
    <section className={styles.section} ref={sectionRef} id="published-books">
      <div className={styles.inner}>
        <div className={`${styles.header} fade-up`}>
          <div className={styles.label}>Published Works</div>
          <h2 className={styles.heading}>
            Books by our{" "}
            <span className={styles.headingAccent}>authors</span>
          </h2>
          <p className={styles.subheading}>
            Real books. Real authors. Published and available on Amazon.
          </p>
        </div>

        <div className={styles.grid}>
          {BOOKS.map((book, i) => (
            <div
              key={i}
              className={`${styles.card} ${book.placeholder ? styles.placeholder : ""} fade-up stagger-${i + 1}`}
            >
              <div className={styles.cover}>
                <div className={styles.coverInner}>
                  <div className={styles.spine} />
                  <div className={styles.coverContent}>
                    <div className={styles.coverOrn}>✦</div>
                    <div className={styles.coverTitle}>{book.title}</div>
                    <div className={styles.coverAuthor}>{book.author}</div>
                  </div>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.bookTitle}>{book.title}</div>
                <div className={styles.bookAuthor}>by {book.author}</div>
                <p className={styles.bookDesc}>{book.description}</p>
                {!book.placeholder && (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.amazonLink}
                  >
                    View on Amazon →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className={styles.comingSoon}>
          More published books coming soon. Check back for updates.
        </p>
      </div>
    </section>
  );
}
