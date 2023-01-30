import Head from 'next/head'
import Image from 'next/image'
import MainFeed from '../components/MainFeed';
import SideBar from '../components/SideBar';

const Home = () => {
  return (
    <div className='bg-purp h-screen overflow-hidden'>
      <Head>
        <title>Melodius</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className='flex'>
        <SideBar />
        <MainFeed />
      </main>
    </div>
  )
}

export default Home
