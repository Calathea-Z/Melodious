import { PuzzlePieceIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

function GetUserInput() {
    const [userInput, setUserInput] = useState(null);


    const setInput = (e) => {
        const input = e.target.value
        setUserInput(input)
    }

    console.log(userInput);




  return (
    <div className='flex-grow h-screen overflow-y-scroll items-center justify-center scrollbar-hide'>
        <div className='flex flex-col justify-center items-start space-x-7 bg-gradient-to-b to-purp from-greeen h-80 p-5 text-purple-200'>
            <div className='mt-5'>
                <h1 className='font-extrabold tracking-wider font-mono text-2xl'>What kind of music are you in the mood for?</h1>
            </div>
            <div className='flex p-20 items-center jusity-center'>
                <form className='flex space-x-20' onChange={setInput}>
                    <input type='text' name='songValues' className='text-black border-none rounded-sm' />
                    <button type='submit' value='|' className='button text-purple-300 text-2xl font-extrabold'>
                        <PuzzlePieceIcon className='button text-2xl mb-2' />
                        <h6>Go!</h6>
                    </button>
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default GetUserInput