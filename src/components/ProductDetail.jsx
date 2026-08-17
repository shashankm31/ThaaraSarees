import { getProductEnquiryUrl } from "../utils/whatsapp.js";

export default function ProductDetail({ product }) {
  const priceIsAvailable = typeof product.price === "number" && product.price > 0;

  return (
    <article className="product-detail">
      <div className="product-detail__image-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail__content">
        <p className="section-eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-detail__id">Product ID · {product.id}</p>
        <p className="product-detail__price">
          {priceIsAvailable ? `₹${product.price.toLocaleString("en-IN")}` : "Price on request"}
        </p>
        <p className={`product-detail__availability ${product.available ? "" : "product-detail__availability--unavailable"}`}>
          <span aria-hidden="true" />
          {product.available ? "Available" : "Currently unavailable"}
        </p>
        {product.description && <p className="product-detail__description">{product.description}</p>}
        <div className="product-detail__actions">
          <a className="button button--wine product-detail__enquire" href={getProductEnquiryUrl(product)} target="_blank" rel="noreferrer">
            Enquire on WhatsApp
          </a>
          <a className="product-detail__back" href="/#sarees">← Back to Sarees</a>
        </div>
      </div>
    </article>
  );
}
