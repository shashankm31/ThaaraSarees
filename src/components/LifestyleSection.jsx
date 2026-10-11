import { useEffect, useRef, useState } from "react";
import { LIFESTYLE_IMAGES } from "../data/lifestyle.js";

export default function LifestyleSection() {
  const [primaryImage, secondaryImage] = LIFESTYLE_IMAGES;
  const hasLifestyleImages = Boolean(primaryImage);
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
    <section className={`lifestyle ${isVisible ? "is-visible" : ""}`} aria-labelledby="lifestyle-title" ref={sectionRef}>
      <div className="lifestyle__inner container">
        <div className={`lifestyle__visual ${hasLifestyleImages ? "lifestyle__visual--with-images" : ""}`}>
          {hasLifestyleImages ? (
            <>
              <figure className="lifestyle__primary-image">
                <img src={primaryImage.image} alt={primaryImage.alt} />
              </figure>
              {secondaryImage && (
                <figure className="lifestyle__secondary-image">
                  <img src={secondaryImage.image} alt={secondaryImage.alt} />
                </figure>
              )}
            </>
          ) : (
            <div className="lifestyle__placeholder" role="status">
              <span className="lifestyle__placeholder-mark" aria-hidden="true">T</span>
              <p>Lifestyle imagery is being prepared.</p>
            </div>
          )}
        </div>

        <div className="lifestyle__content">
          <p className="section-eyebrow">THE THAARA EDIT</p>
          <h2 id="lifestyle-title">See It Worn</h2>
          <p className="lifestyle__intro">Because a saree is meant to be lived in, styled and celebrated.</p>
          <div className="lifestyle__rule" aria-hidden="true" />
          <h3>Made for moments that matter.</h3>
          <p>
            From intimate celebrations to festive evenings, discover sarees that bring effortless elegance to every occasion.
          </p>
          <a className="button button--wine" href="#sarees">Explore Sarees</a>
        </div>
      </div>
    </section>
  );
}
