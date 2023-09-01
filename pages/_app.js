import '@/styles/globals.css';
import Head from 'next/head';
import { ProductsContextProvider } from '../components/ProductsContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>VitCom</title>
      </Head>
      <ProductsContextProvider>
        <Component {...pageProps} />
      </ProductsContextProvider>
    </>
  );
}
