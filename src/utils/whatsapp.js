import { STORE_CONFIG } from "../config/store.js";

export function getProductEnquiryUrl(product) {
  const message = `Hi Thaara Sarees, I'm interested in ${product.name} (ID: ${product.id}). Is it available?`;
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
