"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
      id="main-nav"
    >
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="StoryIP Home">
          <Image
            src="/logo-storyip-v2.png"
            alt="StoryIP"
            width={280}
            height={90}
            className={styles.logoImg}
            priority
          />
        </a>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}
          id="nav-links"
        >
          <a
            href="#how-it-works"
            className={styles.link}
            onClick={(e) => handleNavClick(e, "#how-it-works")}
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className={styles.link}
            onClick={(e) => handleNavClick(e, "#pricing")}
          >
            Pricing
          </a>
          <a
            href="#faq"
            className={styles.link}
            onClick={(e) => handleNavClick(e, "#faq")}
          >
            FAQ
          </a>
          <a
            href="#get-started"
            className={styles.ctaNav}
            onClick={(e) => handleNavClick(e, "#get-started")}
            id="nav-cta"
          >
            Begin Your Memoir
          </a>
        </div>
      </div>
    </nav>
  );
}
