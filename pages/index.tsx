import type { NextPage } from 'next'


import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/SideBar';

const Home: NextPage = () => {
  return (
    <div className='bg-purp h-screen overflow-hidden'>
      <Head>
        <title>Playlist AI.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=''>

      </main>
      <SideBar />
    </div>
  )
}

export default Home
