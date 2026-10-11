import ProductImage from "../ProductImage.jsx";

function formatPrice(price) {
  if (price === null || price === undefined) return "Price on request";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
}

function StatusToggle({ label, active, disabled, onClick }) {
  return <button className={`admin-status-toggle ${active ? "is-positive" : ""}`} type="button" aria-pressed={active} disabled={disabled} onClick={onClick}>{disabled ? "Saving…" : `${label}: ${active ? "Yes" : "No"}`}</button>;
}

export default function ProductTable({ products, onEdit, onDelete, onStatusChange, savingProductId, deletingProductId, feedback }) {
  return <div className="admin-product-table-wrap"><table className="admin-product-table"><thead><tr><th>Image</th><th>Product code</th><th>Saree name</th><th>Category</th><th>Price</th><th>Available</th><th>New arrival</th><th>Featured</th><th>Actions</th></tr></thead><tbody>{products.map((product) => {
    const isSaving = savingProductId === product.id;
    const isDeleting = deletingProductId === product.id;
    return <tr key={product.id}>
      <td data-label="Image"><ProductImage className="admin-product-image" src={product.image} alt={product.name} /></td>
      <td data-label="Product code"><strong>{product.id}</strong></td><td data-label="Saree name">{product.name}</td><td data-label="Category">{product.category}</td><td data-label="Price">{formatPrice(product.price)}</td>
      <td data-label="Available"><StatusToggle label="Available" active={product.available} disabled={isSaving || isDeleting} onClick={() => onStatusChange(product, "available")} /></td>
      <td data-label="New arrival"><StatusToggle label="New arrival" active={product.newArrival} disabled={isSaving || isDeleting} onClick={() => onStatusChange(product, "newArrival")} /></td>
      <td data-label="Featured"><StatusToggle label="Featured" active={product.featured} disabled={isSaving || isDeleting} onClick={() => onStatusChange(product, "featured")} /></td>
      <td data-label="Actions"><div className="admin-row-actions"><button type="button" onClick={() => onEdit(product.id)} disabled={isSaving || isDeleting}>Edit</button><button className="is-danger" type="button" onClick={() => onDelete(product)} disabled={isSaving || isDeleting}>{isDeleting ? "Deleting…" : "Delete"}</button></div>{feedback?.[product.id] ? <p className={`admin-row-feedback ${feedback[product.id].type === "error" ? "is-error" : ""}`} role={feedback[product.id].type === "error" ? "alert" : "status"}>{feedback[product.id].message}</p> : null}</td>
    </tr>;
  })}</tbody></table></div>;
}
