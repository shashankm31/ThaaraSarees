const navigationItems = [
  { id: "dashboard", label: "Dashboard", href: "/admin" },
  { id: "products", label: "Products", href: "/admin/products" },
];

export default function AdminSidebar({ activeSection, onNavigate, onLogout, isLoggingOut }) {
  return (
    <aside className="admin-sidebar" aria-label="Admin navigation">
      <a className="admin-sidebar__logo" href="/" aria-label="View Thaara Sarees website">
        <img src="/images/brand/thaara-logo.png" alt="Thaara Sarees" />
      </a>
      <p className="admin-sidebar__area">Admin area</p>

      <nav className="admin-nav">
        {navigationItems.map((item) => (
          <a
            key={item.id}
            className={activeSection === item.id ? "is-active" : ""}
            href={item.href}
            onClick={(event) => { event.preventDefault(); onNavigate(item.href); }}
          >
            {item.label}
          </a>
        ))}
        <a className={activeSection === "new" ? "is-active" : ""} href="/admin/products/new" onClick={(event) => { event.preventDefault(); onNavigate("/admin/products/new"); }}>Add Saree</a>
      </nav>

      <div className="admin-sidebar__footer">
        <a className="admin-view-website" href="/">View website <span aria-hidden="true">↗</span></a>
        <button className="admin-logout" type="button" onClick={onLogout} disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out…" : "Logout"}
        </button>
      </div>
    </aside>
  );
}
