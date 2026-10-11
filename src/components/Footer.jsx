import { STORE_CONFIG } from "../config/store.js";
import { getWhatsAppUrl } from "../utils/whatsapp.js";

const navigationItems = [
  { label: "Home", href: "/#home" },
  { label: "Sarees", href: "/#sarees" },
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/#about" },
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

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.2 11.6a8.2 8.2 0 0 1-12.1 7.2L4 20l1.3-4a8.2 8.2 0 1 1 14.9-4.4Z" />
      <path d="M9.3 8.4c.2-.4.4-.4.6-.4h.5c.2 0 .4.1.5.4l.6 1.4c.1.3.1.5-.1.7l-.4.5c.5 1 1.2 1.7 2.2 2.2l.5-.4c.2-.2.4-.2.7-.1l1.4.6c.3.1.4.3.4.5v.5c0 .2-.1.4-.4.6-.4.2-1 .3-1.6.1-2.8-.8-5.3-3.3-6.1-6.1-.2-.6-.1-1.2.1-1.6Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__brand-name">{STORE_CONFIG.brandName}</p>
          <p className="site-footer__tagline">Every Thread Has a Story</p>
        </div>

        <div className="site-footer__ornament" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="site-footer__socials" aria-label="Social and contact links">
          <a href={STORE_CONFIG.instagramUrl} aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href={getWhatsAppUrl()} aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
        </div>

        <div className="site-footer__meta">
          <p>© 2026 {STORE_CONFIG.brandName}. All rights reserved.</p>
          <a className="site-footer__staff-login" href="/admin/login">
            Staff Login <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
