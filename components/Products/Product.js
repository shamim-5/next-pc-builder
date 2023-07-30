import Title from "../Layouts/Title";

function Product({ product }) {
  const { category, description, image_url } = product;
  return (
    <div>
      <Title>{category}</Title>
      <h2>{category}</h2>
      <p>{description}</p>
      <p>{image_url}</p>
    </div>
  );
}
export default Product;
