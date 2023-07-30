import RootLayout from "@/components/Layouts/RootLayout";
import { useRouter } from "next/router";

function ProductPage(params) {
  const route = useRouter();

  return (
    <div className="h-screen px-6 lg:px-12 mx-1">
      <h1 className="text-4xl">
        This is <span className="font-bold">{route.asPath} </span>page
      </h1>
    </div>
  );
}
export default ProductPage;

ProductPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
