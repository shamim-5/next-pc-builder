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

// common data fetcher functions!
export async function getProducts() {
  const { data: products } = await fetchJson(`${DB_URL}/products`);
  // const products = await fetchJson(`${DB_URL}/products`); // for json-server

  return products.map(stripProduct);
}

export async function getProduct(id) {
  const product = await fetchJson(`${DB_URL}/products/${id}`);

  return stripProduct(product);
  // return stripProduct(product[0]);  // for json-server
}
