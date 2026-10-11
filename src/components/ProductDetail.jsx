import ProductImage from "./ProductImage.jsx";
import { getProductEnquiryUrl, getProductPriceLabel } from "../utils/whatsapp.js";

export default function ProductDetail({ product }) {
  return <article className="product-detail">
    <div className="product-detail__image-wrap"><ProductImage src={product.image} alt={product.name} /></div>
    <div className="product-detail__content"><p className="section-eyebrow">{product.category}</p><h1>{product.name}</h1><p className="product-detail__id">Product ID · {product.id}</p><div className="product-detail__badges">{product.newArrival ? <span>New Arrival</span> : null}{product.featured ? <span>Featured</span> : null}</div><p className="product-detail__price">{getProductPriceLabel(product.price)}</p><p className={`product-detail__availability ${product.available ? "" : "product-detail__availability--unavailable"}`}><span aria-hidden="true" />{product.available ? "Available" : "Currently unavailable"}</p>{product.description ? <p className="product-detail__description">{product.description}</p> : null}<div className="product-detail__actions">{product.available ? <a className="button button--wine product-detail__enquire" href={getProductEnquiryUrl(product)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${product.name} on WhatsApp`}>Enquire on WhatsApp</a> : <p className="product-detail__unavailable">This saree is no longer available for enquiry.</p>}<a className="product-detail__back" href="/#sarees">← Back to Sarees</a></div></div>
  </article>;
}
