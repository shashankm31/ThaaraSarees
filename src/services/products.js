import { isSupabaseConfigured, supabase } from "../config/supabase.js";

const PRODUCT_FIELDS = "product_code, name, price, category, description, image, available, featured, new_arrival, created_at";
const SAREE_IMAGES_BUCKET = "saree-images";

function ensureSupabaseConfigured() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured.");
  }
}

function resolveProductImage(image) {
  if (image.startsWith("/")) return image;
  return supabase.storage.from(SAREE_IMAGES_BUCKET).getPublicUrl(image).data.publicUrl;
}

function mapProduct(row) {
  if (!row) return null;

  return {
    id: row.product_code,
    name: row.name,
    price: row.price === null ? null : Number(row.price),
    category: row.category,
    description: row.description ?? "",
    image: resolveProductImage(row.image),
    available: row.available,
    featured: row.featured,
    newArrival: row.new_arrival,
    createdAt: row.created_at,
  };
}

async function queryProducts(configureQuery) {
  ensureSupabaseConfigured();
  const { data, error } = await configureQuery(supabase.from("products").select(PRODUCT_FIELDS));

  if (error) throw error;
  return data.map(mapProduct);
}

export function getAvailableProducts() {
  return queryProducts((query) => query.eq("available", true).order("created_at", { ascending: false }));
}

export function getProducts() {
  return queryProducts((query) => query.order("created_at", { ascending: false }));
}

export async function getProductById(productCode) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_FIELDS)
    .eq("product_code", productCode)
    .eq("available", true)
    .maybeSingle();

  if (error) throw error;
  return mapProduct(data);
}

export function getNewArrivals() {
  return queryProducts((query) => query.eq("available", true).eq("new_arrival", true).order("created_at", { ascending: false }));
}

export function getFeaturedProducts() {
  return queryProducts((query) => query.eq("available", true).eq("featured", true).order("created_at", { ascending: false }));
}

function productCode(number) {
  return `SAR${String(number).padStart(3, "0")}`;
}

async function nextAvailableProductCode(startAt = 1) {
  for (let number = startAt; number <= 999; number += 1) {
    const code = productCode(number);
    const { data, error } = await supabase.from("products").select("product_code").eq("product_code", code).maybeSingle();
    if (error) throw error;
    if (!data) return { code, number };
  }
  throw new Error("All product codes from SAR001 to SAR999 are already in use.");
}

function extensionFor(file) {
  return { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[file.type];
}

export async function createProductWithImage({ name, price, category, description, available, featured, newArrival, file }) {
  ensureSupabaseConfigured();
  let startAt = 1;

  for (let attempt = 0; attempt < 999; attempt += 1) {
    const { code, number } = await nextAvailableProductCode(startAt);
    const imagePath = `${code}-${crypto.randomUUID()}.${extensionFor(file)}`;
    const { error: uploadError } = await supabase.storage.from(SAREE_IMAGES_BUCKET).upload(imagePath, file, { contentType: file.type, upsert: false });
    if (uploadError) throw uploadError;

    const { error: insertError } = await supabase.from("products").insert({
      product_code: code,
      name,
      price: price === "" ? null : Number(price),
      category,
      description,
      image: imagePath,
      available,
      featured,
      new_arrival: newArrival,
    });

    if (!insertError) return { productCode: code, imagePath };

    const { error: cleanupError } = await supabase.storage.from(SAREE_IMAGES_BUCKET).remove([imagePath]);
    if (cleanupError) {
      throw new Error(`Product record could not be saved, and the uploaded image could not be removed: ${cleanupError.message}`);
    }
    if (insertError.code === "23505") {
      startAt = number + 1;
      continue;
    }
    throw insertError;
  }

  throw new Error("A unique product code could not be generated. Please try again.");
}

export async function getProductForAdmin(productCode) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_FIELDS)
    .eq("product_code", productCode)
    .maybeSingle();
  if (error) throw error;
  return mapProduct(data);
}

function productUpdatePayload(updates) {
  const payload = {};
  if ("name" in updates) payload.name = updates.name.trim();
  if ("price" in updates) payload.price = updates.price === "" || updates.price === null ? null : Number(updates.price);
  if ("category" in updates) payload.category = updates.category.trim();
  if ("description" in updates) payload.description = updates.description.trim();
  if ("available" in updates) payload.available = Boolean(updates.available);
  if ("featured" in updates) payload.featured = Boolean(updates.featured);
  if ("newArrival" in updates) payload.new_arrival = Boolean(updates.newArrival);
  return payload;
}

export async function updateProduct(productCode, updates) {
  ensureSupabaseConfigured();
  const { data, error } = await supabase.from("products").update(productUpdatePayload(updates)).eq("product_code", productCode).select(PRODUCT_FIELDS).single();
  if (error) throw error;
  return mapProduct(data);
}

export function updateProductStatus(productCode, field, value) {
  if (!new Set(["available", "featured", "newArrival"]).has(field)) throw new Error("This product status cannot be updated.");
  return updateProduct(productCode, { [field]: value });
}

export async function deleteProduct(productCode) {
  ensureSupabaseConfigured();
  const { error } = await supabase.from("products").delete().eq("product_code", productCode);
  if (error) throw error;
}
