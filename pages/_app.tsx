import { Auth0Provider } from '@auth0/auth0-react';
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/styles.css";

function App({ Component, pageProps }: AppProps) {
  const redirectUri = `${process.env["NEXT_PUBLIC_BASE_URL"] ? process.env["NEXT_PUBLIC_BASE_URL"] :""}`
  return (
    <Auth0Provider
      domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"] ? process.env["NEXT_PUBLIC_AUTH0_DOMAIN"] : ""}
      clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"] ? process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]:""}
      authorizationParams={{redirect_uri:redirectUri}}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Auth0 Next.js Sample</title>
      </Head>
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default App;
