import { useTableContext } from "@/contexts/TableContext";
import { Space, Table } from "antd";
import Link from "next/link";

const columns = [
  {
    title: "Product Name",
    //  width: 100,
    dataIndex: "product_name",
    key: "product_name",
    fixed: "left",
  },
  {
    title: "Price",
    //  width: 100,
    dataIndex: "price",
    key: "price",
    fixed: "left",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    sorter: true,
  },
  {
    title: "Add/Remove",
    key: "action",
    render: (_, record) => {
      return (
        <Space size="middle">
          {/* <p>{record.product_name}</p> */}
          <a>Delete</a>
        </Space>
      );
    },
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (_, record) => {
      // console.log(record);
      return (
        <>
          <Link href={`/products/${record.key}`}>Choose</Link>
        </>
      );
    },
  },
];

function ProductsTable({ products }) {
  const { tableQuantity } = useTableContext();

  const updatedProducts = products.map((product) => ({
    key: product._id.toString(),
    product_name: product.product_name,
    quantity: tableQuantity[product._id] || 0,
    category: product.category,
    status: product.status,
    price: product.price,
  }));

  // console.log("[tableQuantity] :", tableQuantity);

  return (
    <div>
      <Table columns={columns} dataSource={updatedProducts} />
    </div>
  );
}

export default ProductsTable;
