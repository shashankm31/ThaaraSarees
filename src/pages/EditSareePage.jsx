import { useEffect, useState } from "react";
import ProductImage from "../components/ProductImage.jsx";
import { getProductForAdmin, updateProduct } from "../services/products.js";

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter the saree name.";
  if (!form.category.trim()) errors.category = "Enter a category.";
  if (form.price !== "" && (!Number.isFinite(Number(form.price)) || Number(form.price) < 0)) errors.price = "Enter a valid price of zero or more, or leave it blank.";
  return errors;
}

export default function EditSareePage({ productCode, onNavigate, onProductSaved }) {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let active = true;
    getProductForAdmin(productCode).then((product) => { if (active) { setForm(product ? { ...product, price: product.price ?? "" } : null); setLoading(false); } }).catch(() => { if (active) { setMessage("We couldn’t load this saree. Please try again."); setLoading(false); } });
    return () => { active = false; };
  }, [productCode]);

  function updateField(event) { const { name, value, type, checked } = event.target; setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value })); }
  async function save(event) {
    event.preventDefault();
    const nextErrors = validate(form); setErrors(nextErrors); setMessage(""); if (Object.keys(nextErrors).length) return;
    setSaving(true);
    try { const product = await updateProduct(productCode, form); onProductSaved(product); setMessage("Saree updated successfully."); } catch { setMessage("We couldn’t save these changes. Please try again."); } finally { setSaving(false); }
  }

  if (loading) return <section className="admin-panel admin-panel--state">Loading saree details…</section>;
  if (!form) return <section className="admin-panel admin-panel--state"><p>{message || "Saree not found."}</p><button className="button button--wine" type="button" onClick={() => onNavigate("/admin/products")}>Back to Products</button></section>;
  return <section className="admin-panel add-saree-panel">
    <a className="admin-back-link" href="/admin/products" onClick={(event) => { event.preventDefault(); onNavigate("/admin/products"); }}>← Back to Products</a>
    <div className="add-saree-panel__heading"><p className="section-eyebrow">{productCode}</p><h2>Edit Saree</h2><p>Update the catalogue details and customer-facing status for this saree.</p></div>
    <form className="add-saree-form" onSubmit={save} noValidate>
      <div className="edit-saree-image"><ProductImage src={form.image} alt={form.name} /><p>Image changes will be added in a future update.</p></div>
      <div className="add-saree-form__grid"><label>Saree name <span>*</span><input name="name" value={form.name} onChange={updateField} disabled={saving} /></label><label>Price <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} disabled={saving} placeholder="Price on request" /></label><label>Category <span>*</span><input name="category" value={form.category} onChange={updateField} disabled={saving} /></label></div>
      {errors.name ? <p className="admin-field-error">{errors.name}</p> : null}{errors.price ? <p className="admin-field-error">{errors.price}</p> : null}{errors.category ? <p className="admin-field-error">{errors.category}</p> : null}
      <label className="add-saree-description">Description<textarea name="description" rows="5" value={form.description} onChange={updateField} disabled={saving} /></label>
      <div className="add-saree-options"><label><input name="available" type="checkbox" checked={form.available} onChange={updateField} disabled={saving} /> Available</label><label><input name="newArrival" type="checkbox" checked={form.newArrival} onChange={updateField} disabled={saving} /> New Arrival</label><label><input name="featured" type="checkbox" checked={form.featured} onChange={updateField} disabled={saving} /> Featured</label></div>
      {message ? <p className={message.includes("successfully") ? "admin-success-message" : "admin-auth-error"} role="status">{message}</p> : null}
      <div className="add-saree-actions"><button className="button button--text" type="button" onClick={() => onNavigate("/admin/products")} disabled={saving}>Cancel</button><button className="button button--wine" type="submit" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button></div>
    </form>
  </section>;
}
