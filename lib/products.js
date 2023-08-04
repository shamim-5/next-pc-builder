import { fetchJson } from "./api";

const { DB_URL } = process.env;

// reduce data size
function stripProduct(product) {
  return {
    _id: product._id,
    category: product.category,
    description: product.description,
    product_name: product.product_name,
    price: product.price,
    status: product.status,
    rating: product.rating,
    image_url: product.image_url,
    products: product.products,
  };
}

// backend data fetch functions...
// note: for mongodb res comes as {data: products}
// product[0] for return product object. /products?_id=${id} mongodb  query
export async function getProducts() {
  const { data: products } = await fetchJson(`${DB_URL}/products`);

  return products.map(stripProduct);
}

export async function getProduct(id) {
  const product = await fetchJson(`${DB_URL}/products?_id=${id}`);

  return stripProduct(product);
}
