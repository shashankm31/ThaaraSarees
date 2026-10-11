import AdminHeader from "./AdminHeader.jsx";
import AdminSidebar from "./AdminSidebar.jsx";

export default function AdminLayout({ activeSection, children, onNavigate, onLogout, isLoggingOut, logoutError }) {
  return (
    <div className="admin-layout">
      <AdminSidebar activeSection={activeSection} onNavigate={onNavigate} onLogout={onLogout} isLoggingOut={isLoggingOut} />
      <div className="admin-layout__content">
        <AdminHeader activeSection={activeSection} onNavigate={onNavigate} />
        <main className="admin-main">
          {logoutError ? <p className="admin-auth-error" role="alert">{logoutError}</p> : null}
          {children}
        </main>
      </div>
    </div>
  );
}
