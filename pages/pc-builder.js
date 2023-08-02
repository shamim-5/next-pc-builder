import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import Title from "@/components/Layouts/Title";
import { getProducts } from "@/lib/products";
import ProductsTable from "@/components/PCBuilder/ProductsTable";

export async function getServerSideProps() {
  try {
    const products = await getProducts();
    console.log("[ServerSideRender] getServerSideProps()");

    return {
      props: {
        products,
      },
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

function PCBuilderPage({ products }) {
  //   console.log("[PCBuilderPage] render:", products);

  return (
    <>
      <Head>
        <title>PC-Builder-Next_PC-Builder</title>
      </Head>

      <div className="min-h-screen px-6 lg:px-12 mx-1">
        <Title titleStyle="text-4xl uppercase font-semibold">Build Your PC</Title>

        <ProductsTable products={products} />
      </div>
    </>
  );
}

export default PCBuilderPage;

PCBuilderPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
