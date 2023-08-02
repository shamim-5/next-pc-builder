import { TableContextProvider } from "@/contexts/TableContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <TableContextProvider>
      <Component {...pageProps} />
    </TableContextProvider>
  );
}
