import Head from "next/head";
import Title from "./Title";

function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{`${title}  - Project Name`}</title>
      </Head>
        <header>
           Header components like NavBar.js
        </header>
      <main>
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
}

export default Page;
