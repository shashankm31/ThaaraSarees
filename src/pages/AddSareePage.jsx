import { useEffect, useState } from "react";
import { createProductWithImage } from "../services/products.js";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const INITIAL_FORM = { name: "", price: "", category: "Traditional", description: "", available: true, featured: false, newArrival: false };

function validate(form, file) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter the saree name.";
  if (!form.category.trim()) errors.category = "Enter a category.";
  if (form.price !== "" && (!Number.isFinite(Number(form.price)) || Number(form.price) < 0)) errors.price = "Enter a valid price of zero or more, or leave it blank.";
  if (!file) errors.image = "Choose a saree image.";
  else if (!ALLOWED_TYPES.includes(file.type)) errors.image = "Use a JPEG, PNG, or WebP image.";
  else if (file.size > MAX_FILE_SIZE) errors.image = "Choose an image smaller than 10 MB.";
  return errors;
}

export default function AddSareePage({ onNavigate, onProductCreated }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState("");
  const [publishedCode, setPublishedCode] = useState("");

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  function updateField(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function chooseFile(event) {
    const selected = event.target.files?.[0] || null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selected);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : "");
    setErrors((current) => ({ ...current, image: validate(form, selected).image }));
  }

  async function publish(event) {
    event.preventDefault();
    const nextErrors = validate(form, file);
    setErrors(nextErrors);
    setMessage("");
    if (Object.keys(nextErrors).length) return;

    setIsPublishing(true);
    try {
      const result = await createProductWithImage({ ...form, name: form.name.trim(), category: form.category.trim(), description: form.description.trim(), file });
      setPublishedCode(result.productCode);
      await onProductCreated?.();
      setMessage("Saree published successfully.");
      setForm(INITIAL_FORM);
      setFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    } catch (error) {
      setMessage("The saree could not be published. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  }

  if (publishedCode) {
    return <section className="admin-panel admin-panel--state"><p className="admin-success-message" role="status">{message}</p><p>New product code: <strong>{publishedCode}</strong></p><button className="button button--wine" type="button" onClick={() => onNavigate("/admin/products")}>View Products</button></section>;
  }

  return <section className="admin-panel add-saree-panel">
    <a className="admin-back-link" href="/admin/products" onClick={(event) => { event.preventDefault(); onNavigate("/admin/products"); }}>← Back to Products</a>
    <div className="add-saree-panel__heading"><p className="section-eyebrow">New catalogue piece</p><h2>Add New Saree</h2><p>Add one product image and the details customers will see in the collection.</p></div>
    <form className="add-saree-form" onSubmit={publish} noValidate>
      <div className="add-saree-image-field"><label htmlFor="saree-image">Saree image <span>*</span></label><input id="saree-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseFile} disabled={isPublishing} /><p>JPEG, PNG, or WebP · Maximum 10 MB</p>{previewUrl ? <img className="add-saree-preview" src={previewUrl} alt="Selected saree preview" /> : null}{errors.image ? <p className="admin-field-error">{errors.image}</p> : null}</div>
      <div className="add-saree-form__grid"><label>Saree name <span>*</span><input name="name" value={form.name} onChange={updateField} disabled={isPublishing} /></label><label>Price <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} disabled={isPublishing} placeholder="Price on request" /></label><label>Category <span>*</span><input name="category" value={form.category} onChange={updateField} disabled={isPublishing} /></label></div>
      {errors.name ? <p className="admin-field-error">{errors.name}</p> : null}{errors.price ? <p className="admin-field-error">{errors.price}</p> : null}{errors.category ? <p className="admin-field-error">{errors.category}</p> : null}
      <label className="add-saree-description">Description<textarea name="description" rows="5" value={form.description} onChange={updateField} disabled={isPublishing} /></label>
      <div className="add-saree-options"><label><input name="available" type="checkbox" checked={form.available} onChange={updateField} disabled={isPublishing} /> Available</label><label><input name="newArrival" type="checkbox" checked={form.newArrival} onChange={updateField} disabled={isPublishing} /> New Arrival</label><label><input name="featured" type="checkbox" checked={form.featured} onChange={updateField} disabled={isPublishing} /> Featured</label></div>
      {message ? <p className="admin-auth-error" role="alert">{message}</p> : null}
      <div className="add-saree-actions"><button className="button button--text" type="button" onClick={() => onNavigate("/admin/products")} disabled={isPublishing}>Cancel</button><button className="button button--wine" type="submit" disabled={isPublishing}>{isPublishing ? "Publishing…" : "Publish Saree"}</button></div>
    </form>
  </section>;
}
