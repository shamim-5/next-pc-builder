import { Button, Card } from "antd";
import Title from "../Layouts/Title";
import Image from "next/image";
import Link from "next/link";

function Product({ product }) {
  const { _id, category, description, image_url, product_name, price, status, rating } = product;
  const { Meta } = Card;

  return (
    <div>
      <Card
        className="mb-6 w-full"
        hoverable
        style={{
          width: 240,
        }}
        cover={<Image src={image_url} alt={category} width={320} height={240} />}
      >
        <span className="flex justify-between">
          <p className="text-green-900/100 font-semibold mt-0">{status} </p>
          <p className="text-orange-900/80 font-semibold mt-0">{rating} </p>
        </span>
        <Meta title={category} description={description} />
        <Title titleStyle={`font-semibold`}>{product_name}</Title>
        <span className="flex justify-between items-center my-0">
          <h3 className="text-slate-900/70 font-bold my-0">{price} </h3>
          <Link href={`/products/${_id}`}>
            <Button className="uppercase font-mono" type="primary" ghost>
              Details
            </Button>
          </Link>
        </span>
      </Card>
    </div>
  );
}
export default Product;
