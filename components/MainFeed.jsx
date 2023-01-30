import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"
import Image from "next/image";

function MainFeed() {
    const { data: session } = useSession();
  return (
    <div className='flex-grow'>
        <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-purp space-x-3 opacity-80 hover:opacity-70 text-white cursor-pointer rounded-full p-1 pr-2'>
                <img src={session?.user.image} className='rounded-full w-10 h-10'/>
                <h2>{session?.user.name}</h2>
                <ChevronDoubleDownIcon className='w-5 h-5'/>
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-purp from-greeen h-80 text-white p-8`}>
            <h1>Hello</h1>
        </section>
    </div>
  )
}

export default MainFeed