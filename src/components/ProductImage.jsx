import { useState } from "react";

export default function ProductImage({ src, alt, className = "" }) {
  const [hasFailed, setHasFailed] = useState(false);
  if (hasFailed || !src) return <div className={`${className} product-image-fallback`} role="img" aria-label={`${alt}: image unavailable`}>Image unavailable</div>;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setHasFailed(true)} />;
}
