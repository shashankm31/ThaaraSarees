import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";
import { getAvailableProducts, getProductById } from "../services/products.js";

export default function SareeDetailPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isCurrent = true;
    setStatus("loading");

    Promise.all([getProductById(productId), getAvailableProducts()])
      .then(([selectedProduct, availableProducts]) => {
        if (!isCurrent) return;
        setProduct(selectedProduct);
        setRelatedProducts(availableProducts.filter((item) => item.id !== productId).slice(0, 3));
        setStatus("ready");
      })
      .catch(() => {
        if (isCurrent) setStatus("error");
      });

    return () => {
      isCurrent = false;
    };
  }, [productId]);

  if (status === "loading") {
    return <main className="not-found container"><p className="collection__state" role="status">Loading saree details...</p></main>;
  }

  if (status === "error") {
    return <main className="not-found container"><p className="collection__state" role="alert">We're having trouble loading this saree. Please try again shortly.</p><a className="button button--wine" href="/#sarees">Browse Sarees</a></main>;
  }

  if (!product) {
    return (
      <main className="not-found container">
        <p className="section-eyebrow">SAREE NOT FOUND</p>
        <h1>Saree not found.</h1>
        <p>This saree may no longer be available.</p>
        <a className="button button--wine" href="/#sarees">Browse Sarees</a>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <div className="detail-page__inner container">
        <ProductDetail product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}
