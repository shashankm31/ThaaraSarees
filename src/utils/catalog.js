export function getAvailableProducts(products) {
  return products.filter((product) => product.available);
}

export function getFeaturedProducts(products) {
  return getAvailableProducts(products).filter((product) => product.featured);
}

export function getNewArrivals(products) {
  return getAvailableProducts(products)
    .filter((product) => product.newArrival)
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
}
