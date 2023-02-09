import { getProviders, signIn } from "next-auth/react";
import MelodiousLogo from "../assets/Melodious-1.png";
import OpenAILogo from "../assets/OpenAI-logo.svg";
import SpotifyLogo from "../assets/spotifyLogo.png";
import Image from "next/image";
import Typewriter from "react-typewriter-animate";

// In the future you could add more providers here such as Google or email.
function Login({ providers }) {
  return (
    <>
      <div className="flex flex-col items-center bg-purp min-h-screen w-full justify-center">
        <Image className="w-52" src={MelodiousLogo} alt="Melodious Logo" />
        <div className="flex flex-col text-yellow-400 font-mono text-s tracking-wide leading-10">
          <Typewriter
            dataToRotate={[
              [
                {
                  type: "word",
                  text: "Build the playlist of your dreams 📻",
                  maxTypeSpeed: 1500,
                },
              ],
              [
                {
                  type: "word",
                  text: "Atmospheric, down-tempo, from Europe, 1985-1995 🌌",
                  maxTypeSpeed: 1500,
                },
              ],
              [
                {
                  type: "word",
                  text: "jungle, house, trance 🕺 ",
                  maxTypeSpeed: 1500,
                },
              ],
              [
                {
                  type: "word",
                  text: "I'm having a party, give me some jazz for cooking! 🍷",
                  maxTypeSpeed: 1500,
                },
              ],
              [
                {
                  type: "word",
                  text: "Like Taylor Swift but less pop more METAL 🤘",
                  maxTypeSpeed: 1500,
                },
              ],
              [
                {
                  type: "word",
                  text: "The possibilities are endless, Happy Listening!🚀",
                  maxTypeSpeed: 1500,
                },
              ],
            ]}
          />
        </div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-[#a17b9c] text-white p-5 rounded-lg"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Log in with {provider.name}
            </button>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 bg-[#7B6982] w-full inline-flex items-center justify-center space-x-4">
        <h1 className="md:text-xl text-sm text-stone-400">Powered by:</h1>
        <div className="flex space-between space-x-2 md:space-x-16">
          <Image
            className="md:w-20 w-10 pb-2 pt-2"
            src={SpotifyLogo}
            alt="Melodious Logo"
          />
          <Image className="md:w-40 w-20" src={OpenAILogo} alt="OpenAI Logo" />
        </div>
      </div>
    </>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
