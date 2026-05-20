import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Image
            src="/logo-storyip-v2.png"
            alt="StoryIP"
            width={240}
            height={80}
            className={styles.logoImg}
          />
        </div>

        <div className={styles.links}>
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

        <div className={styles.divider} />

        <div className={styles.copy}>© 2026 Story IP. All rights reserved.</div>
      </div>
    </footer>
  );
}
