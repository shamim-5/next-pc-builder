import RootLayout from "@/components/Layouts/RootLayout";
import Product from "@/components/Products/Product";
import { getProducts } from "@/lib/products";
import dynamic from "next/dynamic";
import Head from "next/head";

export async function getStaticProps() {
  console.log("[HomePage] getStaticProps()");
  const products = await getProducts();

  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

function HomePage({ products }) {
  // console.log("[HomePage] render:", products);

  const DynamicPage = dynamic(() => import("@/components/Layouts/Page"), {
    loading: () => <h1>Loading...</h1>,
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>Next_PC-Builder</title>
        <meta name="description" content="This is pc-builder website made by next-js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicPage title="Next_PC-Builder">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </DynamicPage>
    </>
  );
}

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
