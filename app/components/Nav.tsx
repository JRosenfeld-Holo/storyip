"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const SERVE_LINKS = [
  { label: "Financial Advisors", href: "/financial-advisor" },
  { label: "Chiropractors", href: "/chiropractor" },
  { label: "Dentists", href: "/dentist" },
];

const ANCHOR_LINKS = [
  { label: "How It Works", target: "#how-it-works" },
  { label: "Pricing", target: "#pricing" },
  { label: "FAQ", target: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [dropdownOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
      if (pathname !== "/") return;
      e.preventDefault();
      setMenuOpen(false);
      setDropdownOpen(false);
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    },
    [pathname]
  );

  const anchorHref = (target: string) =>
    pathname === "/" ? target : `/${target}`;

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`} id="main-nav">
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
          <span /><span /><span />
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`} id="nav-links">
          {/* Desktop: Who We Serve dropdown */}
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={`${styles.link} ${styles.dropdownTrigger}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              Who We Serve
              <svg
                className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ""}`}
                width="10" height="6" viewBox="0 0 10 6" fill="none"
                aria-hidden="true"
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownPanel}>
                {SERVE_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={styles.dropdownItem}
                    onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Who We Serve flat list */}
          <div className={styles.mobileServe}>
            <div className={styles.mobileServeLabel}>Who We Serve</div>
            {SERVE_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={styles.mobileServeItem}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>

          {ANCHOR_LINKS.map(({ label, target }) => (
            <a
              key={target}
              href={anchorHref(target)}
              className={styles.link}
              onClick={(e) => handleNavClick(e, target)}
            >
              {label}
            </a>
          ))}

          <a
            href={anchorHref("#get-started")}
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
