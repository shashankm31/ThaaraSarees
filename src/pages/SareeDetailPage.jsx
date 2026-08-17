import { PRODUCTS } from "../data/products.js";
import ProductDetail from "../components/ProductDetail.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";

export default function SareeDetailPage({ productId }) {
  const product = PRODUCTS.find((item) => item.id === productId);

  if (!product) {
    return (
      <main className="not-found container">
        <p className="section-eyebrow">SAREE NOT FOUND</p>
        <h1>We could not find that saree.</h1>
        <a className="button button--wine" href="/#sarees">Browse Sarees</a>
      </main>
    );
  }

  const relatedProducts = PRODUCTS.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <main className="detail-page">
      <div className="detail-page__inner container">
        <ProductDetail product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}
