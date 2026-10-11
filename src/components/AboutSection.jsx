import { useEffect, useRef, useState } from "react";
import { STORE_CONFIG } from "../config/store.js";
import { getWhatsAppUrl } from "../utils/whatsapp.js";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`about-section ${isVisible ? "is-visible" : ""}`} id="about" aria-labelledby="about-title" ref={sectionRef}>
      <div className="container about-section__inner">
        <div className="about-section__ornament" aria-hidden="true">✦</div>
        <div>
          <p className="section-eyebrow">WHY THAARA</p>
          <h2 id="about-title" aria-label="Chosen for the moments you will remember."><span className="about-section__headline-clip" aria-hidden="true"><span className="about-section__headline-text">Chosen for the moments you will remember.</span></span></h2>
        </div>
        <div className="about-section__copy">
          <p>At {STORE_CONFIG.brandName}, each saree is selected with an eye for grace, detail and the joy of dressing for an occasion.</p>
          <a className="button button--wine" href={getWhatsAppUrl()}>Begin a conversation <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
