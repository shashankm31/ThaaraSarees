import { useCallback, useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import DashboardStats from "../components/admin/DashboardStats.jsx";
import ProductManagement from "../components/admin/ProductManagement.jsx";
import ProductTable from "../components/admin/ProductTable.jsx";
import AddSareePage from "./AddSareePage.jsx";
import EditSareePage from "./EditSareePage.jsx";
import { supabase } from "../config/supabase.js";
import { deleteProduct, getProducts, updateProductStatus } from "../services/products.js";

function getEditProductCode(pathname) {
  const match = pathname.match(/^\/admin\/products\/([^/]+)\/edit\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function AdminPage({ user, activeSection, pathname, onNavigate, onLoggedOut }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [savingProductId, setSavingProductId] = useState("");
  const [deletingProductId, setDeletingProductId] = useState("");
  const [feedback, setFeedback] = useState({});
  const editProductCode = getEditProductCode(pathname);

  const loadProducts = useCallback(async () => {
    setLoading(true); setLoadError("");
    try { setProducts(await getProducts()); } catch { setLoadError("We couldn’t load the product catalogue. Please try again."); } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);
  const replaceProduct = useCallback((updated) => setProducts((current) => current.map((product) => product.id === updated.id ? updated : product)), []);
  const setRowFeedback = (productId, type, message) => setFeedback((current) => ({ ...current, [productId]: { type, message } }));

  async function handleStatusChange(product, field) {
    setSavingProductId(product.id); setRowFeedback(product.id, "", "");
    try { const updated = await updateProductStatus(product.id, field, !product[field]); replaceProduct(updated); setRowFeedback(product.id, "success", "Saved."); }
    catch { setRowFeedback(product.id, "error", "We couldn’t save this change. Please try again."); }
    finally { setSavingProductId(""); }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete ${product.name} (${product.id})? This cannot be undone.`)) return;
    setDeletingProductId(product.id); setRowFeedback(product.id, "", "");
    try { await deleteProduct(product.id); setProducts((current) => current.filter((item) => item.id !== product.id)); }
    catch { setRowFeedback(product.id, "error", "We couldn’t delete this saree. Please try again."); }
    finally { setDeletingProductId(""); }
  }

  async function handleLogout() {
    setLogoutError(""); setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    setIsLoggingOut(false);
    if (error) { setLogoutError("We could not sign you out. Please try again."); return; }
    onLoggedOut();
  }

  const tableProps = { onEdit: (id) => onNavigate(`/admin/products/${id}/edit`), onDelete: handleDelete, onStatusChange: handleStatusChange, savingProductId, deletingProductId, feedback };
  let content;
  if (activeSection === "new") content = <AddSareePage onNavigate={onNavigate} onProductCreated={loadProducts} />;
  else if (editProductCode) content = <EditSareePage productCode={editProductCode} onNavigate={onNavigate} onProductSaved={replaceProduct} />;
  else if (loading) content = <section className="admin-panel admin-panel--state" aria-live="polite">Loading sarees from your catalogue…</section>;
  else if (loadError) content = <section className="admin-panel admin-panel--state"><p>{loadError}</p><button className="button button--wine" type="button" onClick={loadProducts}>Try again</button></section>;
  else if (activeSection === "products") content = <ProductManagement products={products} {...tableProps} />;
  else content = <><DashboardStats products={products} /><section className="admin-panel"><div className="admin-panel__heading"><div><p className="section-eyebrow">Collection</p><h2>Your catalogue at a glance</h2></div><button className="admin-text-link" type="button" onClick={() => onNavigate("/admin/products")}>View all products</button></div>{products.length ? <ProductTable products={products.slice(0, 5)} {...tableProps} /> : <p className="admin-empty-copy">No sarees found.</p>}</section></>;

  return <AdminLayout activeSection={activeSection} onNavigate={onNavigate} onLogout={handleLogout} isLoggingOut={isLoggingOut} logoutError={logoutError}>{content}</AdminLayout>;
}
