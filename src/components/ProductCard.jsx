import ProductImage from "./ProductImage.jsx";
import { getProductEnquiryUrl, getProductPriceLabel } from "../utils/whatsapp.js";

function WhatsAppIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.58 7.46L3.5 20.5l1.54-4.25A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="M8.4 7.8c.2-.47.42-.48.7-.49h.39c.12 0 .3.04.4.29l.78 1.86c.08.2.06.36-.02.51l-.34.48c-.11.13-.22.28-.1.5.12.21.54.88 1.17 1.42.8.71 1.49.93 1.7 1.04.21.1.33.09.46-.06l.72-.84c.15-.18.3-.15.5-.08l1.86.88c.23.11.38.17.43.26.05.1.05.57-.13 1.1-.18.54-1.05 1.04-1.45 1.1-.37.06-.84.09-1.36-.08-.31-.1-.7-.23-1.2-.45-2.1-.91-3.46-3.06-3.56-3.2-.1-.14-.84-1.12-.84-2.14 0-1.01.53-1.5.72-1.72Z" /></svg>;
}

export default function ProductCard({ product }) {
  return <article className="product-card">
    <a className="product-card__image-wrap" href={`/sarees/${product.id}`} aria-label={`View details for ${product.name}`}><ProductImage className="product-card__image" src={product.image} alt={product.name} /><div className="product-card__badges"><span className={`product-card__availability ${product.available ? "" : "product-card__availability--unavailable"}`}>{product.available ? "Available" : "Unavailable"}</span></div></a>
    <div className="product-card__details"><div><p className="product-card__category">{product.category}</p><h3><a href={`/sarees/${product.id}`}>{product.name}</a></h3><p className="product-card__id">{product.id}</p></div><p className="product-card__price">{getProductPriceLabel(product.price)}</p>{product.available ? <a className="product-card__enquire" href={getProductEnquiryUrl(product)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${product.name} on WhatsApp`}><WhatsAppIcon />Enquire on WhatsApp</a> : <p className="product-card__unavailable">This saree is currently unavailable.</p>}</div>
  </article>;
}
