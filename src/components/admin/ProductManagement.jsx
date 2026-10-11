import { useMemo, useState } from "react";
import ProductTable from "./ProductTable.jsx";

const initialFilters = { availability: "all", newArrival: "all", featured: "all", category: "all" };

function comparePrice(first, second, direction) {
  if (first.price === null || first.price === undefined) return 1;
  if (second.price === null || second.price === undefined) return -1;
  return direction === "asc" ? first.price - second.price : second.price - first.price;
}

function sortProducts(products, sort) {
  return [...products].sort((first, second) => {
    if (sort === "oldest") return new Date(first.createdAt) - new Date(second.createdAt);
    if (sort === "code-asc") return first.id.localeCompare(second.id, undefined, { numeric: true });
    if (sort === "code-desc") return second.id.localeCompare(first.id, undefined, { numeric: true });
    if (sort === "price-asc") return comparePrice(first, second, "asc");
    if (sort === "price-desc") return comparePrice(first, second, "desc");
    return new Date(second.createdAt) - new Date(first.createdAt);
  });
}

function Summary({ products }) {
  const values = [["Total products", products.length], ["Available", products.filter((product) => product.available).length], ["Unavailable", products.filter((product) => !product.available).length], ["New arrivals", products.filter((product) => product.newArrival).length], ["Featured", products.filter((product) => product.featured).length]];
  return <div className="admin-catalogue-summary" aria-label="Catalogue summary">{values.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>;
}

export default function ProductManagement({ products, onEdit, onDelete, onStatusChange, savingProductId, deletingProductId, feedback }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("newest");
  const categories = useMemo(() => [...new Set(products.map((product) => product.category).filter(Boolean))].sort((first, second) => first.localeCompare(second)), [products]);
  const normalizedSearch = search.trim().toLowerCase();
  const filteredProducts = useMemo(() => sortProducts(products.filter((product) => {
    const matchesSearch = !normalizedSearch || [product.id, product.name, product.category].some((value) => value.toLowerCase().includes(normalizedSearch));
    const matchesAvailability = filters.availability === "all" || product.available === (filters.availability === "available");
    const matchesNewArrival = filters.newArrival === "all" || product.newArrival === (filters.newArrival === "new");
    const matchesFeatured = filters.featured === "all" || product.featured === (filters.featured === "featured");
    const matchesCategory = filters.category === "all" || product.category === filters.category;
    return matchesSearch && matchesAvailability && matchesNewArrival && matchesFeatured && matchesCategory;
  }), sort), [products, normalizedSearch, filters, sort]);
  const updateFilter = (event) => setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  const noResultsMessage = normalizedSearch ? "No sarees match your search." : filters.availability === "available" ? "No available sarees." : "No sarees found.";

  return <section className="admin-panel admin-catalogue-panel">
    <div className="admin-panel__heading"><div><p className="section-eyebrow">Catalogue</p><h2>All sarees</h2></div><span>{filteredProducts.length} shown</span></div>
    <Summary products={products} />
    <div className="admin-product-controls"><label className="admin-product-search">Search sarees<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Code, name, or category" /></label><div className="admin-product-filters">
      <label>Availability<select name="availability" value={filters.availability} onChange={updateFilter}><option value="all">All</option><option value="available">Available</option><option value="unavailable">Unavailable</option></select></label>
      <label>New Arrival<select name="newArrival" value={filters.newArrival} onChange={updateFilter}><option value="all">All</option><option value="new">New Arrivals</option><option value="not-new">Not New Arrivals</option></select></label>
      <label>Featured<select name="featured" value={filters.featured} onChange={updateFilter}><option value="all">All</option><option value="featured">Featured</option><option value="not-featured">Not Featured</option></select></label>
      <label>Category<select name="category" value={filters.category} onChange={updateFilter}><option value="all">All</option>{categories.map((category) => <option value={category} key={category}>{category}</option>)}</select></label>
      <label>Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="code-asc">Product code ascending</option><option value="code-desc">Product code descending</option><option value="price-asc">Price low to high</option><option value="price-desc">Price high to low</option></select></label>
    </div></div>
    {filteredProducts.length ? <ProductTable products={filteredProducts} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} savingProductId={savingProductId} deletingProductId={deletingProductId} feedback={feedback} /> : <p className="admin-empty-copy admin-empty-copy--filtered">{noResultsMessage}</p>}
  </section>;
}
