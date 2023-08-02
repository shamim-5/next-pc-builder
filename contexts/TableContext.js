import React, { createContext, useState, useContext } from "react";

const TableContext = createContext();

export function useTableContext() {
  return useContext(TableContext);
}

export function TableContextProvider({ children }) {
  const [tableQuantity, setTableQuantity] = useState({});

  const updateQuantity = (productId, quantity) => {
    setTableQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: quantity,
    }));
  };

  return <TableContext.Provider value={{ tableQuantity, updateQuantity }}>{children}</TableContext.Provider>;
}
