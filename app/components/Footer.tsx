import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const SERVE_LINKS = [
  { label: "Financial Advisors", href: "/financial-advisor" },
  { label: "Chiropractors", href: "/chiropractor" },
  { label: "Dentists", href: "/dentist" },
];

const QUICK_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Get Started", href: "/#get-started" },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brandCol}>
            <Image
              src="/logo-storyip-v2.png"
              alt="StoryIP"
              width={240}
              height={80}
              className={styles.logoImg}
            />
            <p className={styles.tagline}>
              Your memoir, written for you.
            </p>
          </div>

          {/* Who We Serve column */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Who We Serve</div>
            {SERVE_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={styles.link}>
                {label}
              </Link>
            ))}
          </div>

          {/* Quick Links column */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Quick Links</div>
            {QUICK_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className={styles.link}>
                {label}
              </a>
            ))}
          </div>

          {/* Contact column */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Contact</div>
            <a href="mailto:hello@storyip.ai" className={styles.link}>
              hello@storyip.ai
            </a>
            <a href="/privacy" className={styles.link}>
              Privacy
            </a>
            <a href="/terms" className={styles.link}>
              Terms
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.copy}>© 2026 Story IP. All rights reserved.</div>
      </div>
    </footer>
  );
}
