import { useEffect, useMemo, useState } from "react";
import { getAvailableProducts } from "../services/products.js";
import ProductGrid from "./ProductGrid.jsx";

function sortProducts(products, sort) {
  return [...products].sort((first, second) => {
    if (sort === "name") return first.name.localeCompare(second.name);
    if (sort === "price-low") {
      if (first.price === null) return 1;
      if (second.price === null) return -1;
      return first.price - second.price;
    }
    if (sort === "price-high") {
      if (first.price === null) return 1;
      if (second.price === null) return -1;
      return second.price - first.price;
    }
    return new Date(second.createdAt) - new Date(first.createdAt);
  });
}

export default function CollectionSection() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [collection, setCollection] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    let isCurrent = true;
    getAvailableProducts().then((availableProducts) => {
      if (!isCurrent) return;
      setProducts(availableProducts);
      setStatus("ready");
    }).catch(() => {
      if (isCurrent) setStatus("error");
    });
    return () => { isCurrent = false; };
  }, []);

  const categories = useMemo(() => [...new Set(products.map((product) => product.category).filter(Boolean))].sort((first, second) => first.localeCompare(second)), [products]);
  const normalizedSearch = search.trim().toLowerCase();
  const visibleProducts = useMemo(() => sortProducts(products.filter((product) => {
    const matchesSearch = !normalizedSearch || [product.id, product.name, product.category].some((value) => value.toLowerCase().includes(normalizedSearch));
    const matchesCollection = collection === "all" || (collection === "new" && product.newArrival) || (collection === "featured" && product.featured);
    return matchesSearch && matchesCollection && (category === "all" || product.category === category);
  }), sort), [products, normalizedSearch, collection, category, sort]);

  const emptyMessage = normalizedSearch ? "No sarees match your search." : collection === "new" ? "New arrivals are being curated. Please return soon." : collection === "featured" ? "Featured pieces are being selected. Please return soon." : "No sarees match these filters.";

  return <section className="collection" id="sarees" aria-labelledby="collection-title">
    <div className="collection__inner container">
      <header className="collection__header"><p className="section-eyebrow">THE COLLECTION</p><h2 id="collection-title">Sarees for the stories that stay with you.</h2><p>Explore pieces chosen for beautiful occasions, everyday elegance and everything in between.</p></header>
      <div className="collection__tools">
        <label className="collection__search">Find a saree<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, code, or category" /></label>
        <div className="collection__filters" aria-label="Filter sarees"><div className="collection__filter-buttons">{[["all", "All Sarees"], ["new", "New Arrivals"], ["featured", "Featured"]].map(([value, label]) => <button className={`filter-button ${collection === value ? "is-active" : ""}`} key={value} type="button" aria-pressed={collection === value} onClick={() => setCollection(value)}>{label}</button>)}</div><label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label>Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select></label></div>
      </div>
      {status === "loading" && <p className="collection__state" role="status">Loading our collection...</p>}
      {status === "error" && <p className="collection__state" role="alert">We're having trouble loading the collection. Please try again shortly.</p>}
      {status === "ready" && products.length === 0 && <div className="collection__state collection__state--empty" role="status"><span aria-hidden="true">✦</span><p>Our next collection is being prepared with care.</p><a className="button button--text" href="#contact">Enquire on WhatsApp <span aria-hidden="true">↗</span></a></div>}
      {status === "ready" && products.length > 0 && <ProductGrid products={visibleProducts} emptyMessage={emptyMessage} />}
    </div>
  </section>;
}
