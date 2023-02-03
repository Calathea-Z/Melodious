import { getProviders, signIn } from 'next-auth/react'
import MelodiousLogo from '../assets/Melodious-1.png'
import Image from 'next/image'



// In the future you could add more providers here such as Google or email.
function Login({ providers }) {
return (
    <div className='flex flex-col items-center bg-purp min-h-screen w-full justify-center'>
        <Image className='w-52 mb-5' src= { MelodiousLogo } alt='Melodious Logo' />
        {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button className='bg-[#a17b9c] text-white p-5 rounded-lg'
                onClick={() => signIn(provider.id, { callbackUrl: "/"})}>
                    Log in with { provider.name }
                </button>
            </div>
        ))}
    </div>
)}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}