import Head from 'next/head'
import { getSession } from 'next-auth/react';
import MainFeed from '../components/MainFeed';
import SideBar from '../components/SideBar';
import Player from '../components/Player';

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

      <div className='sticky bottom-0'>
        <Player />
      </div>

    </div>
  )
}
export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}
