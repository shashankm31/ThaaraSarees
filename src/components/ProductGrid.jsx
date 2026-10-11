import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, emptyMessage = "No sarees found." }) {
  if (!products.length) return <p className="collection__empty" role="status">{emptyMessage}</p>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
