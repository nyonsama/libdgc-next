import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'highlight.js/styles/github.css'
import '../styles/override.css';
import SSRProvider from 'react-bootstrap/SSRProvider';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SSRProvider>
  )
}

export default MyApp
