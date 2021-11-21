import Head from "next/head";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ title, auth, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header auth={auth} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
