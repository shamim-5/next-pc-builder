import React, { createContext, useState, useContext } from "react";

const TableContext = createContext();

export function useTableContext() {
  return useContext(TableContext);
}

export function TableContextProvider({ children }) {
  const [tableQuantity, setTableQuantity] = useState({});
  const [dataSource, setDataSource] = useState([]);

  const updateQuantity = (productId, quantity) => {
    setTableQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: quantity,
    }));
  };

  const updateDataSource = (newData) => {
    if (!Array.isArray(newData)) {
      console.error("New data should be an array.");
      return;
    }
    // console.log(newData);
    setDataSource((prevData) => {
      const existingIds = new Set(prevData.map((item) => item._id));
      const filteredNewData = newData.filter((item) => !existingIds.has(item._id));
      return [...prevData, ...filteredNewData];
    });
  };

  return (
    <TableContext.Provider value={{ tableQuantity, updateQuantity, dataSource, setDataSource, updateDataSource }}>
      {children}
    </TableContext.Provider>
  );
}
