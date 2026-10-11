import { STORE_CONFIG } from "../config/store.js";

export function getProductPriceLabel(price) {
  if (typeof price !== "number" || price <= 0) return "Price on request";
  return `₹${price.toLocaleString("en-IN")}`;
}

export function getProductEnquiryMessage(product) {
  return [
    "Hello Thaara Sarees,",
    "",
    "I'm interested in this saree:",
    "",
    `Saree: ${product.name}`,
    `Code: ${product.id}`,
    `Price: ${getProductPriceLabel(product.price)}`,
    "",
    "Please let me know if it is available.",
    "",
    "Thank you.",
  ].join("\n");
}

export function getWhatsAppUrl(message = "") {
  const baseUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

export function getProductEnquiryUrl(product) {
  return getWhatsAppUrl(getProductEnquiryMessage(product));
}
