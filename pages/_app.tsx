import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Navigation from 'components/Navigation'
import { useRouter } from 'next/router'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Instagram clone</title>
        <meta name="description" content="Instagram clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider>
        {!router.pathname.startsWith('/auth') && <Navigation />}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )

}

export default MyApp
