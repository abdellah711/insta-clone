import type { NextPage } from 'next'
import Head from 'next/head'
import AuthForm from '../components/AuthForm'
import LoginForm from '../components/AuthForm/LoginForm'

const Home: NextPage = () => {
  return (
    <div className='max-w-md mx-auto mt-28'>
      <Head>
        <title>Instagram clone</title>
        <meta name="description" content="Instagram clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm/>
      
    </div>
  )
}

export default Home
