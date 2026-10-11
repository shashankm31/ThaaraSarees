import { useState } from "react";
import { STORE_CONFIG } from "../config/store.js";
import { getWhatsAppUrl } from "../utils/whatsapp.js";

const navigationItems = [
  { label: "Home", href: "/#home" },
  { label: "Collection", href: "/#sarees" },
  { label: "New Arrivals", href: "/#sarees" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" data-menu-open={menuOpen || undefined}>
      <nav className="navbar container" aria-label="Main navigation">
        <a className="brand-logo" href="/#home" aria-label="Thaara Sarees home" onClick={closeMenu}>
          <img src="/images/brand/thaara-logo.png" alt="Thaara Sarees" />
        </a>

        <div className={`nav-menu ${menuOpen ? "is-open" : ""}`} id="main-menu">
          <div className="nav-links">
            {navigationItems.map((item) => (
              <a key={item.label} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="nav-mobile-actions">
            <a href={STORE_CONFIG.instagramUrl} aria-label="Visit Thaara Sarees on Instagram">
              <InstagramIcon />
              Instagram
            </a>
            <a className="button button--wine" href={whatsappUrl} onClick={closeMenu}>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="nav-desktop-actions">
          <a className="icon-link" href={STORE_CONFIG.instagramUrl} aria-label="Visit Thaara Sarees on Instagram">
            <InstagramIcon />
          </a>
          <a className="button button--wine button--compact" href={whatsappUrl}>
            Chat on WhatsApp
          </a>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>
    </header>
  );
}
