import { getProviders, signIn } from 'next-auth/react'
import MelodiusLogo from '../assets/Melodius-1.png'
import Image from 'next/image'

function Login( { providers } ) {
  return (
    <div className='flex flex-col items-center bg-purp min-h-screen w-full justify-center'>
        <Image className='w-56 mb-5' src= { MelodiusLogo } alt='Melodius Logo' />
        {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button className='bg-[#a17b9c] text-white p-5 rounded-full'>
                    Log in with { provider.name }
                </button>
            </div>
        ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}