import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products.js";
import ProductGrid from "./ProductGrid.jsx";

const FILTERS = [
  { label: "All Sarees", value: "all" },
  { label: "Traditional", value: "traditional" },
  { label: "Festive", value: "festive" },
  { label: "Elegant", value: "elegant" },
];

function matchesFilter(product, filter) {
  if (filter === "all") return true;
  return product.category.toLowerCase().includes(filter);
}

export default function CollectionSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleProducts = useMemo(
    () => PRODUCTS.filter((product) => matchesFilter(product, activeFilter)),
    [activeFilter],
  );

  return (
    <section className="collection" id="sarees" aria-labelledby="collection-title">
      <div className="collection__inner container">
        <header className="collection__header">
          <p className="section-eyebrow">OUR COLLECTION</p>
          <h2 id="collection-title">Timeless Sarees, Chosen for You</h2>
          <p>
            Explore our carefully selected sarees, available for beautiful occasions and everyday elegance.
          </p>
        </header>

        <div className="collection__filters" aria-label="Filter sarees by category">
          {FILTERS.map((filter) => (
            <button
              className={`filter-button ${activeFilter === filter.value ? "is-active" : ""}`}
              key={filter.value}
              type="button"
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <ProductGrid products={visibleProducts} />
      </div>
    </section>
  );
}
