const stats = [
  { key: "total", label: "Total products", note: "In the catalogue" },
  { key: "available", label: "Available", note: "Ready to enquire" },
  { key: "newArrivals", label: "New arrivals", note: "Marked as new" },
  { key: "featured", label: "Featured", note: "Highlighted pieces" },
];

export default function DashboardStats({ products }) {
  const values = {
    total: products.length,
    available: products.filter((product) => product.available).length,
    newArrivals: products.filter((product) => product.newArrival).length,
    featured: products.filter((product) => product.featured).length,
  };

  return (
    <section className="dashboard-stats" aria-label="Product statistics">
      {stats.map((stat) => (
        <article className="dashboard-stat" key={stat.key}>
          <p>{stat.label}</p>
          <strong>{values[stat.key]}</strong>
          <span>{stat.note}</span>
        </article>
      ))}
    </section>
  );
}
