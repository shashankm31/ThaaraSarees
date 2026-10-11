import ProductImage from "./ProductImage.jsx";

export default function RelatedProducts({ products }) {
  return (
    <section className="related-products" aria-labelledby="related-title">
      <div className="related-products__header">
        <p className="section-eyebrow">CONTINUE EXPLORING</p>
        <h2 id="related-title">More from Thaara</h2>
      </div>
      <div className="related-products__grid">
        {products.map((product) => (
          <a className="related-product" href={`/sarees/${product.id}`} key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <span>{product.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
