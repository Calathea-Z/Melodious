import { useState } from "react";
import { signOut, useSession} from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import useSpotify from "../hooks/useSpotify";
import Typewriter from "react-typewriter-animate";
import "react-typewriter-animate/dist/Typewriter.css";

export default function GeneratePlaylist() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState([]);
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bands: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      const responseToFormat = data.result
      console.log(responseToFormat)
      const formattedResponse = responseToFormat.split('~');
      console.log(formattedResponse);
      setResult(formattedResponse);
      setUserInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }
  console.log("End Product", result)

  return (
    <div className='flex-grow h-screen overflow-y-scroll items-center justify-center scrollbar-hide'>
      <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-purple-800 space-x-3 opacity-90 hover:opacity-80 text-white cursor-pointer rounded-full p-1 pr-2' onClick={() => signOut()}>
                <img src={session?.user.image} className='rounded-full w-10 h-10'/>
                <h2>{session?.user.name}</h2>
                <ArrowLeftOnRectangleIcon className='w-5 h-5'/>
            </div>
        </header>
      <main className='pt-4 pl-1 pb-0 w-9/12 flex flex-col space-y-10 text-yellow-400 font-mono text-4xl tracking-wide leading-10'>
        <Typewriter dataToRotate={[
          [
            {type: 'word', text: "Enter a prompt: be as specific or abstract as you'd like!"}
          ],
        ]} />
        <hr className='border-t-[0.1px] border-greeen'/>
        <div className="flex h-10 space-x-10">
          <form onSubmit={onSubmit} className='flex space-x-4'>
            <input
              type="text"
              name="bands"
              placeholder="Atmospheric, downtempo, island, rock"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className='text-xs text-blue-600 rounded-md w-[300px]'
            />
            <button className=' rounded-md border-greeen border-solid border-2 opacity-75 cursor-pointer hover:scale-125 transition transform duration-100 ease-out font-bold text-xs' type="submit" value="Generate">Generate
            </button>
          </form>
          <div className='text-greeen flex-grow flex-col  w-24 h-2 space-y-1 pb-28 font-serif text-[13px] tracking-tight leading-snug mt-0'>
            {result?.map((result, index) => (
                <div key={index}>
                  <div>{result}</div>
                </div>
            ))}
          </div>
        </div>
      </main>
      <div>
        <h1>SONG POPULATION HERE</h1>
      </div>
    </div>
  );
}
