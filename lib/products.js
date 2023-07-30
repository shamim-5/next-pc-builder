import { fetchJson } from "./api";

const { DB_URL } = process.env;

// reduce data size
function stripProduct(product) {
  return {
    id: product._id,
    category: product.category,
    description: product.description,
    image_url: product.image_url,
  };
}

export async function getProducts() {
  const { data: products } = await fetchJson(`${DB_URL}/products`);

  return products.map(stripProduct);
}
