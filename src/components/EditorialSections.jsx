import { useEffect, useRef, useState } from "react";
import { getWhatsAppUrl } from "../utils/whatsapp.js";

const edits = [
  ["Wedding Edit", "For ceremonial mornings and luminous evenings."],
  ["Festive Edit", "Colour, detail and a sense of celebration."],
  ["Everyday Elegance", "Pieces with an easy, considered grace."],
  ["Silk Stories", "The quiet richness of a timeless weave."],
];

const occasions = ["Wedding", "Festive", "Evening", "Everyday", "Office"];

export function ThaaraEdit() {
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

  return <section className={`thaara-edit ${isVisible ? "is-visible" : ""}`} aria-labelledby="thaara-edit-title" ref={sectionRef}><div className="container"><header className="editorial-heading thaara-edit__heading"><p className="section-eyebrow">CURATED STORIES</p><h2 id="thaara-edit-title">The Thaara Edit</h2><p>A considered starting point for the occasions and moods that call for something special.</p></header><div className="thaara-edit__grid">{edits.map(([title, copy], index) => <a className={`edit-card edit-card--${index + 1}`} href="#sarees" key={title}><span className="edit-card__number">0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p><span className="editorial-link">Explore <i aria-hidden="true">→</i></span></div></a>)}</div></div></section>;
}

export function EditorialVisualBreak() {
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

  return <section className={`editorial-break ${isVisible ? "is-visible" : ""}`} aria-label="Thaara Sarees editorial campaign" ref={sectionRef}><div className="editorial-break__media" data-editorial-slot="campaign"><div className="editorial-break__veil" /><p>Every Thread Has a Story</p></div><div className="editorial-break__copy container"><span>THAARA SAREES</span><h2 aria-label="Elegance is found in the detail."><span className="editorial-break__line"><span>Elegance is</span></span><span className="editorial-break__line"><span>found in the</span></span><span className="editorial-break__line"><span>detail.</span></span></h2></div></section>;
}

export function CraftsmanshipSection() {
  return <section className="craftsmanship" aria-labelledby="craft-title"><div className="container craftsmanship__inner"><div className="craftsmanship__visual" data-editorial-slot="craftsmanship" aria-hidden="true"><span /><span /><span /></div><div className="craftsmanship__content"><p className="section-eyebrow">THE LANGUAGE OF A SAREE</p><h2 id="craft-title">A closer look at what makes a piece memorable.</h2><div className="craftsmanship__notes"><article><span>01</span><h3>Zari</h3><p>Fine metallic detail that catches the light with a quiet richness.</p></article><article><span>02</span><h3>Border</h3><p>The finishing line that gives a drape its rhythm and presence.</p></article><article><span>03</span><h3>Weave</h3><p>Texture, fall and feeling—considered in every thread.</p></article></div></div></div></section>;
}

export function OccasionSection() {
  return <section className="occasion-section" aria-labelledby="occasion-title"><div className="container"><header className="editorial-heading editorial-heading--split"><div><p className="section-eyebrow">CHOOSE YOUR MOMENT</p><h2 id="occasion-title">Shop by occasion</h2></div><p>Let the occasion set the tone. The collection is always yours to explore.</p></header><div className="occasion-grid">{occasions.map((occasion, index) => <a href="#sarees" className={`occasion-card occasion-card--${index + 1}`} key={occasion}><span>0{index + 1}</span><strong>{occasion}</strong><i aria-hidden="true">↗</i></a>)}</div></div></section>;
}

export function PersonalStyling() {
  return <section className="personal-styling" aria-labelledby="styling-title"><div className="container personal-styling__inner"><div className="personal-styling__ornament" aria-hidden="true">✦</div><div><p className="section-eyebrow">PERSONAL STYLING</p><h2 id="styling-title">Not sure which saree to choose?</h2><p>Talk to us. We’ll help you find the right one.</p></div><a className="button button--wine" href={getWhatsAppUrl()}>Talk on WhatsApp <span aria-hidden="true">↗</span></a></div></section>;
}

export function GallerySection() {
  return <section className="gallery-section" aria-labelledby="gallery-title"><div className="container"><header className="editorial-heading editorial-heading--split"><div><p className="section-eyebrow">FOLLOW THE STORY</p><h2 id="gallery-title">A glimpse of Thaara</h2></div><p>Our campaign gallery is being prepared.</p></header><div className="gallery-grid" aria-label="Editorial gallery placeholders">{["Drape", "Detail", "Celebration", "Texture", "Moment"].map((label, index) => <div key={label} className={`gallery-tile gallery-tile--${index + 1}`} data-editorial-slot="gallery"><span>{label}</span></div>)}</div></div></section>;
}
