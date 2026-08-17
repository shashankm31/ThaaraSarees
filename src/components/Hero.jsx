import { STORE_CONFIG } from "../config/store.js";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__content">
          <p className="hero__eyebrow">THAARA SAREES <span aria-hidden="true">·</span> BANGALORE</p>
          <h1 id="hero-title">Elegance, Woven Beautifully.</h1>
          <p className="hero__description">
            Discover timeless sarees chosen for celebrations, traditions and every beautiful occasion.
          </p>
          <div className="hero__actions">
            <a className="button button--wine" href="#sarees">Explore Sarees</a>
            <a className="button button--text" href={whatsappUrl}>Chat on WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
          <p className="hero__location">Curated with care in {STORE_CONFIG.location}</p>
        </div>

        <div className="hero__visual">
          <div className="hero__gold-line" aria-hidden="true" />
          <figure className="hero__image-frame">
            <img src="/images/sarees/saree-001.jpg" alt="Thaara Sarees traditional saree" />
          </figure>
          <p className="hero__image-caption">A story in every thread</p>
        </div>
      </div>
    </section>
  );
}
