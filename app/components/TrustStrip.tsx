import styles from "./TrustStrip.module.css";

const STATS = [
  { number: "150+", label: "Books Published" },
  { number: "30", label: "Day Delivery" },
  { number: "~5hrs", label: "Your Time" },
  { number: "$3,497", label: "Starting" },
];

export default function TrustStrip() {
  return (
    <section className={styles.strip} id="trust-strip">
      <div className={styles.grid}>
        {STATS.map((s, i) => (
          <div key={i} className={styles.stat}>
            <div className={styles.number}>{s.number}</div>
            <div className={styles.label}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
