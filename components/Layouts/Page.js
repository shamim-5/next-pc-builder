import Product from "../Products/Product";
import Title from "./Title";

function Page({ title, children }) {
  return (
    <div className="px-6 lg:px-12 mx-1">
      <Title>{title}</Title>
      {children}
    </div>
  );
}

export default Page;
