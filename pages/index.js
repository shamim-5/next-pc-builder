import Page from "@/components/Page";
import { getProducts } from "@/lib/products";
import { Button } from "antd";

export async function getStaticProps() {
  console.log("[HomePage] getStaticProps()");
  const products = await getProducts();

  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

function HomePage({ products }) {
  console.log("[HomePage] render:", products);

  return (
    <Page title="Dynamic Title">
      {/* antd and tailwindcss check */}
      <Button className="text-red-900" type="primary">
        Test Style
      </Button>

      <h1 className="text-red-900 ">Hello H1</h1>
      <h4 className="text-3xl font-semibold">Hello H4</h4>
      {/* faced data passed throw as children in Page component where set Head title and Page header and main content  */}
      {/* {products} */}
    </Page>
  );
}

export default HomePage;
