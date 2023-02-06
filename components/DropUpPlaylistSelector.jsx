import { useRecoilValue, useRecoilState } from "recoil";
import { allPlaylistsState, playlistState, playlistIdState } from "../atoms/playlistAtom";
import { CheckCircleIcon, ChevronUpDownIcon  } from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react"
import { Fragment } from "react";

function DropUpPlaylistSelector() {

  const [selectedId, setSelectedId] = useRecoilState(playlistIdState);
  const [selectedName, setSelectedName] = useRecoilState(playlistState);
  const playlists = useRecoilValue(allPlaylistsState);
  
return (
  <div className=''>
    <Listbox value={selectedId} onChange={setSelectedId}>
      <div className='relative mt-1'>
        <Listbox.Button className='relative text-black w-full min-w-[150px] cursor-default rounded-lg bg-stone-400 py-2 pl-3 mr-10 text-left shadow-md focus: outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
          <span className='block truncate'>{selectedName?.name}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'> <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' /></span> 
        </Listbox.Button>
          <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          >
            <Listbox.Options className='absolute mt-1 max-h-60 max-w-20 overflow-auto rounded-md bg-stone-200 py-1 text-blue-400 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {playlists?.map((playlist, index) => (
                <Listbox.Option
                key={index}
                className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${ active ? 'bg-transparent text-amber-900' : 'text-gray=900'}`}
                value={playlist.id}>
                  {({ selected }) => (
                    <>
                      <span className={`block ${ selected ? 'font-medium' : 'font-normal'}`}>
                        {playlist.name}
                      </span>
                      {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                        <CheckCircleIcon className="h-5 w-5" aria-hidden='true' />
                      </span> ) : null
                      }
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
      </div>
    </Listbox>
  </div>
  )
}

export default DropUpPlaylistSelector
