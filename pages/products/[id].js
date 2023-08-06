import RootLayout from "@/components/Layouts/RootLayout";
import { Button, Card } from "antd";
import Title from "@/components/Layouts/Title";
import Image from "next/image";
import { getProduct, getProducts } from "@/lib/products";
import Head from "next/head";
import Link from "next/link";
import { useTableContext } from "@/contexts/TableContext";

export async function getStaticPaths() {
  const products = await getProducts();
  // console.log("[ProductPage] render", products);

  return {
    paths: products.map((product) => ({
      params: { id: product._id.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  // console.log("[ProductPage] getStaticProps()", id, typeof id);
  try {
    const product = await getProduct(id);
    // console.log("[ProductPage] render", product);
    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

function ProductPage({ product }) {
  const { category, description, image_url, product_name, price, status, rating, products } = product;

  const { tableQuantity, updateQuantity } = useTableContext();
  const { dataSource, setDataSource } = useTableContext();

  console.log(product);
  const tableProductFormat = (product) => {
    return {
      key: product._id.toString(),
      _id: product._id.toString(),
      product_name: product.product_name,
      category: product.category,
      status: product.status,
      quantity: tableQuantity[product._id] || 0,
      price: product.price,
      totalPrice: "$" + parseFloat(tableQuantity[product._id] || 0) * parseFloat(product.price.slice(1)),
    };
  };
  const updatedProducts = dataSource.length
    ? dataSource.map((product) => tableProductFormat(product))
    : [tableProductFormat(product)];

  // update pc-builder page ProductTable.js quantity field using react context
  const handleUpdateQuantity = (productId, quantity) => {
    const updatedQuantity = (quantity || 0) + 1;

    updateQuantity(productId, updatedQuantity);
    setDataSource([...updatedProducts]);
  };

  return (
    <>
      <Head>
        <title>Product Details-Next_Pc-Builder</title>
      </Head>
      <div className="h-auto px-6 lg:px-12 mx-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
          <Card
            className="my-6"
            style={{
              width: 300,
            }}
            cover={<Image src={image_url} alt="product-details" width={340} height={340} priority />}
          ></Card>
          <div className="lg:flex-1 mt-6">
            <Title titleStyle="text-3xl font-semibold font-mono">Product Details</Title>
            <h2 className="text-xl font-semibold text-slate-900/100">Category: {category}</h2>
            <h3 className="text-lg font-semibold text-slate-900/100">Product_name: {product_name}</h3>
            <p className="text-base font-semibold text-slate-900/80">Description: {description}</p>
            <p className="text-base font-semibold text-slate-900/90">Status: {status}</p>
            <p className="text-base font-semibold text-slate-900/90">Price: {price}</p>
            <p className="text-base font-semibold text-slate-900/90">Rating: {rating}</p>
            <Link href={`/pc-builder`}>
              <Button
                onClick={() => handleUpdateQuantity(`${product._id}`, tableQuantity[product._id] || 0)}
                className="text-blue-900/100 ml-3 lg:ml-1 px-2 uppercase font-serif font-extrabold  border border-l-0 rounded-tl-none border-r-0 rounded-br-none bg-slate-50/60 transition-colors duration-500 w-full"
                type="primary"
                ghost
              >
                Add To Builder
              </Button>
            </Link>
          </div>
        </div>
        <Title titleStyle="text-4xl my-6">Featured Category</Title>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 mb-12 justify-items-center">
          {products.map((product) => {
            const { image_url, product_name, price, status, rating } = product;

            // console.log(product);
            const tableProductFormat = (product) => {
              return {
                key: product._id.toString(),
                _id: product._id.toString(),
                product_name: product.product_name,
                category: product.category,
                status: product.status,
                quantity: tableQuantity[product._id] || 0,
                price: product.price,
                totalPrice: "$" + parseFloat(tableQuantity[product._id] || 0) * parseFloat(product.price.slice(1)),
              };
            };
            const updatedProducts = dataSource.length
              ? dataSource.map((product) => tableProductFormat(product))
              : [tableProductFormat(product)];

            // update pc-builder page ProductTable.js quantity field using react context
            const handleUpdateQuantity = (productId, quantity) => {
              const updatedQuantity = (quantity || 0) + 1;

              updateQuantity(productId, updatedQuantity);
              setDataSource([...updatedProducts]);
            };

            return (
              <div key={product._id}>
                <Card
                  style={{
                    width: 300,
                  }}
                  cover={<Image src={image_url} alt="product-details" width={340} height={340} priority />}
                >
                  <h2>{category}</h2>
                  <h2>{product_name}</h2>
                  <p>{status}</p>
                  <span className="flex justify-between m-0">
                    <p className="m-0 font-bold">Price: {price}</p>
                    <p className="m-0 font-semibold text-orange-600">Rating: {rating}</p>
                  </span>
                  <Link href={`/pc-builder`}>
                    <Button
                      onClick={() => handleUpdateQuantity(`${product._id}`, tableQuantity[product._id] || 0)}
                      className="text-blue-900/100 ml-3 lg:ml-1 px-2 uppercase font-serif font-extrabold  border border-l-0 rounded-tl-none border-r-0 rounded-br-none bg-slate-50/60 transition-colors duration-500 w-full"
                      type="primary"
                      ghost
                    >
                      Add To Builder
                    </Button>
                  </Link>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default ProductPage;

ProductPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
