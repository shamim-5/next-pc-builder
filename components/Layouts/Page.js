import Title from "./Title";

function Page({ title, children }) {
  return (
    <div className="px-6 lg:px-12 mx-1">
      <div className="">
        <Title titleStyle={`text-4xl`}>Featured Products</Title>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">{children}</div>
      </div>
    </div>
  );
}

export default Page;
