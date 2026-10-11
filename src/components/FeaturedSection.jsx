import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../services/products.js";
import ProductGrid from "./ProductGrid.jsx";

export default function FeaturedSection() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let current = true;
    getFeaturedProducts().then((items) => {
      if (current) { setProducts(items.slice(0, 4)); setStatus("ready"); }
    }).catch(() => { if (current) setStatus("error"); });
    return () => { current = false; };
  }, []);

  return <section className="featured-section" aria-labelledby="featured-title">
    <div className="container">
      <header className="editorial-heading editorial-heading--split"><div><p className="section-eyebrow">SELECTED FOR YOU</p><h2 id="featured-title">Featured sarees</h2></div><a className="editorial-link" href="#sarees">View the collection <span aria-hidden="true">→</span></a></header>
      {status === "loading" ? <p className="editorial-state" role="status">Curating featured sarees…</p> : null}
      {status === "error" ? <p className="editorial-state" role="alert">Featured sarees are unavailable right now.</p> : null}
      {status === "ready" && products.length > 0 ? <ProductGrid products={products} /> : null}
      {status === "ready" && products.length === 0 ? <p className="editorial-state">New featured pieces will be revealed soon.</p> : null}
    </div>
  </section>;
}
