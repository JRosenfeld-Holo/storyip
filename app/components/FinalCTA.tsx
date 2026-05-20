"use client";

import { useState, type SyntheticEvent } from "react";
import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          story: formData.get("story"),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      if (typeof window !== "undefined") {
        if ("gtag" in window) {
          (window as Record<string, unknown> & { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead", {
            event_category: "form",
            event_label: "memoir_inquiry",
          });
        }
        if ("fbq" in window) {
          (window as Record<string, unknown> & { fbq: (...args: unknown[]) => void }).fbq("track", "Lead");
        }
      }

      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="get-started">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Start Here</div>
          <h2 className={styles.heading}>
            Ready to tell{" "}
            <span className={styles.headingAccent}>your story?</span>
          </h2>
          <p className={styles.subheading}>
            Fill out the form below and we&apos;ll reach out within 24 hours to
            schedule your free consultation.
          </p>
        </div>

        {submitted ? (
          <div className={styles.thankYou}>
            <div className={styles.thankYouOrn}>✦</div>
            <h3 className={styles.thankYouHeading}>
              Your story is in good hands.
            </h3>
            <p className={styles.thankYouText}>
              We&apos;ll be in touch within 24 hours to begin your memoir
              journey.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} id="lead-form">
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="form-name" className={styles.fieldLabel}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="form-name"
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="form-email" className={styles.fieldLabel}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="form-email"
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="form-story" className={styles.fieldLabel}>
                In one sentence, what is your story about?
              </label>
              <textarea
                name="story"
                id="form-story"
                rows={3}
                className={`${styles.input} ${styles.textarea}`}
              />
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={submitting}
              id="form-submit"
            >
              {submitting ? "Sending…" : "Begin Your Memoir"}
              <span className={styles.submitArrow}>→</span>
            </button>

            {error && (
              <p className={styles.errorMsg}>
                Something went wrong — please try again or email us directly at hello@storyip.ai
              </p>
            )}

            <p className={styles.privacy}>
              Your information is kept strictly confidential. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
