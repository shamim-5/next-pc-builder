import { Space, Table } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Full Name",
    //  width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    //  width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left",
    sorter: true,
  },
  {
    title: "Column 1",
    dataIndex: "address",
    key: "1",
  },
  {
    title: "Column 2",
    dataIndex: "address",
    key: "2",
  },
  {
    title: "Column 3",
    dataIndex: "address",
    key: "3",
  },
  {
    title: "Column 4",
    dataIndex: "address",
    key: "4",
  },
  {
    title: "Add/Remove",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <Link href={`/products/1`}>Choose</Link>,
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park",
  },
];

function Components({ components }) {
  const [products, setProducts] = useState([]);
  //   console.log("[Components] render:", components);

  const { _id, category, description, image_url, product_name, price, status, rating } = components;

  useEffect(() => {
    setProducts();
  }, []);

  console.log("[Components] render:", data);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Components;
