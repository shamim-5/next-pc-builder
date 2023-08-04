import { useTableContext } from "@/contexts/TableContext";
import { Button, Popconfirm, Table } from "antd";
import Link from "next/link";
import { useEffect } from "react";

const defaultFooter = (record) => {
  let totalPriceSum = 0;
  let allQuantitiesZero;

  for (const product of record) {
    const priceNumber = product.totalPrice ? parseFloat(product?.totalPrice.slice(1).replace(",", "")) : 0;
    totalPriceSum += priceNumber;

    if (product.quantity === 0 || record.length < 5) {
      allQuantitiesZero = true;
      break; // No need to continue checking once we find a quantity not equal to 1
    }
  }

  // console.log(allQuantitiesZero);
  // console.log(record);
  return (
    <div className="flex flex-col items-end">
      <h3 className="text-2xl font-semibold">
        Total Amount: <span className="text-blue-900/80 ">${totalPriceSum.toFixed(2)} </span>
      </h3>
      <p className={`text-red-700/80 ${allQuantitiesZero ? "" : "hidden"}`}>
        Please choose 5 or more component and minimum quantity should be greater than 0!
      </p>
      <Link href={"#"}>
        <Button disabled={allQuantitiesZero} className="px-9 uppercase  mb-9 " type="primary" size="large">
          Build Now
        </Button>
      </Link>
    </div>
  );
};

function ProductsTable({ products }) {
  const { tableQuantity } = useTableContext();
  const { dataSource, setDataSource } = useTableContext();

  const columns = [
    {
      title: "Product Name",
      //  width: 100,
      dataIndex: "product_name",
      key: "product_name",
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
      // sorter: true,
    },
    {
      title: "Price",
      //  width: 100,
      dataIndex: "price",
      key: "price",
      // fixed: "left",
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Remove",
      key: "operation",
      render: (_, record) => {
        return (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
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
  const updatedProducts = (dataSource.length ? dataSource : products).map((product) => ({
    key: product._id.toString(),
    _id: product._id.toString(),
    product_name: product.product_name,
    category: product.category,
    status: product.status,
    quantity: tableQuantity[product._id] || 0,
    price: product.price,
    totalPrice: "$" + parseFloat(tableQuantity[product._id] || 0) * parseFloat(product.price.slice(1)),
  }));

  // console.log("[tableQuantity] :", tableQuantity);
  const handleDelete = (key) => {
    const newData = updatedProducts.filter((item) => item.key !== key);
    setDataSource([...newData]);
  };

  const tableProps = {
    footer: defaultFooter,
  };

  useEffect(() => {
    setDataSource([...updatedProducts]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(tableQuantity, updatedProducts);
  return (
    <>
      <div>
        <Table {...tableProps} pagination={false} columns={columns} dataSource={dataSource} />
      </div>
    </>
  );
}

export default ProductsTable;
