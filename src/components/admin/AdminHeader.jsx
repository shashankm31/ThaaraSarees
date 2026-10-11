export default function AdminHeader({ activeSection, onNavigate }) {
  const title = activeSection === "new" ? "Add New Saree" : activeSection === "products" ? "Products" : "Dashboard";
  const intro = activeSection === "new" ? "Add a new piece to your customer catalogue" : activeSection === "products" ? "Your current saree catalogue" : "A quiet overview of your saree collection";

  return (
    <header className="admin-header">
      <div>
        <p className="admin-header__eyebrow">Thaara Sarees · Admin area</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <button className="admin-add-button" type="button" onClick={() => onNavigate("/admin/products/new")}>Add Saree</button>
      <nav className="admin-mobile-nav" aria-label="Admin navigation">
        <button className={activeSection === "dashboard" ? "is-active" : ""} type="button" onClick={() => onNavigate("/admin")}>Dashboard</button>
        <button className={activeSection === "products" ? "is-active" : ""} type="button" onClick={() => onNavigate("/admin/products")}>Products</button>
      </nav>
    </header>
  );
}
