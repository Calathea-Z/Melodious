import { getProviders, signIn } from 'next-auth/react'
import MelodiousLogo from '../assets/Melodious-1.png'
import Image from 'next/image'
import Typewriter from 'react-typewriter-animate';



// In the future you could add more providers here such as Google or email.
function Login({ providers }) {
return (
    <div className='flex flex-col items-center bg-purp min-h-screen w-full justify-center'>
        <Image className='w-52' src= { MelodiousLogo } alt='Melodious Logo' />
        <div className='flex flex-col text-yellow-400 font-mono text-s tracking-wide leading-10'>
        <Typewriter dataToRotate={[
          [
            {type: 'word',
             text: "Build the playlist of your dreams 📻",
             maxTypeSpeed: 1500,}
          ],
          [
            {type: 'word',
             text: "Atmospheric, down-tempo, purple, from Europe, 1985-2000 🌌",
             maxTypeSpeed: 1500,}
          ],
          [
            {type: 'word',
             text: "New, grungy, house, trance 🕺 ",
             maxTypeSpeed: 1500,}
          ],
          [
            {type: 'word',
             text: "I'm having a party, give me some jazz for cooking! 🍷",
             maxTypeSpeed: 1500,}
          ],
          [
            {type: 'word',
             text: "Like Taylor Swift but less pop more METAL 🤘",
             maxTypeSpeed: 1500,}
          ],
          [
            {type: 'word',
             text: "The possibilities are endless, Happy Listening!🚀",
             maxTypeSpeed: 1500,}
          ],
        ]} />
        </div>
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