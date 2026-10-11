import { useEffect, useRef, useState } from "react";
import { STORE_CONFIG } from "../config/store.js";
import { getWhatsAppUrl } from "../utils/whatsapp.js";

export default function Hero() {
  const whatsappUrl = getWhatsAppUrl();
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = heroRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`hero ${isVisible ? "is-visible" : ""}`} id="home" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero__inner container">
        <div className="hero__content">
          <p className="hero__eyebrow">THAARA SAREES <span aria-hidden="true">·</span> BANGALORE</p>
          <h1 id="hero-title" aria-label="Grace in every drape."><span className="hero__headline-clip" aria-hidden="true"><span className="hero__headline-word hero__headline-word--1">Grace</span>{" "}<span className="hero__headline-word hero__headline-word--2">in</span>{" "}<span className="hero__headline-word hero__headline-word--3">every</span></span><span className="hero__headline-clip" aria-hidden="true"><span className="hero__headline-word hero__headline-word--4">drape.</span></span></h1>
          <p className="hero__description hero__reveal">
            Handpicked sarees for celebrations, traditions and every beautiful occasion. Discover a story woven with care.
          </p>
          <div className="hero__actions hero__reveal">
            <a className="button button--wine" href="#sarees">Explore Collection</a>
            <a className="button button--text" href={whatsappUrl}>Order on WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
          <p className="hero__location hero__reveal">Curated with care in {STORE_CONFIG.location}</p>
        </div>

        <div className="hero__visual">
          <div className="hero__gold-line" aria-hidden="true" />
          <figure className="hero__image-frame">
            <img src="/images/editorial/thaara-hero-drape.png" alt="Burgundy saree drape with gold zari detailing" />
          </figure>
        </div>
      </div>
    </section>
  );
}
