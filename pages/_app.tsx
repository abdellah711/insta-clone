import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Navigation from 'components/Navigation'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <SessionProvider>
      {!router.pathname.startsWith('/auth') && <Navigation/>}
      <Component {...pageProps} />
    </SessionProvider>
  )

}

export default MyApp
