import { ArrowLeftOnRectangleIcon, Bars3Icon, PlusCircleIcon, HomeIcon, CodeBracketSquareIcon, MagnifyingGlassCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { signOut, useSession } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react'

function DropdownNav() {

//----- Grab user session info and rename it to data.  
  const { data: session } = useSession();

return (
  <div className='flex justify-end bg-transparent'>
    <Menu as='div' className='relative z-20'>
      {({open}) => (
        <Fragment>
          <Menu.Button className=' inline-flex justify-center items-center text-xs w-full rounded-lg bg-transparent font-medium text-stone-500 hover:opacity-80 focus: outline-none'>
            <ChevronDownIcon className='h-5 w-5 font-extrabold text-l text-white'/>
          </Menu.Button>
          
{/*-----Creates a smooth transition for modal opening and closing.           */}
          <Transition 
          show={open}
          enter='transform transition duration-100 ease-in'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transform transition duration-75 ease-out'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'>
            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-violet-100 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  <p className='text-black flex justify-center p-2 pr-4 space-x-3 items-center font-bold border-b-2 border-slate-200'>
                    <img src={session?.user.image} className='rounded-full w-12 h-12 border-2 border-gray-100'/>
                    <h2>{session?.user.name}</h2>
                  </p>
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <a href='/' className={`group w-full flex items-center px-4 py-2 text-sm ${active ? 'bg-yellow-400 text-white' :  'text-gray-700'}`}
                    >
                      <HomeIcon className={`mr-3 h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} aria-hidden='true' />
                      Your Playlists
                    </a>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <a href='/suggestions' className={`group w-full flex items-center px-4 py-2 text-sm ${active ? 'bg-yellow-400 text-white' :  'text-gray-700'}`}
                    >
                      <CodeBracketSquareIcon className={`mr-3 h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} aria-hidden='true' />
                      Ask For Suggestions
                    </a>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <a href='/searchbyartists' className={`group w-full flex items-center px-4 py-2 text-sm ${active ? 'bg-yellow-400 text-white' :  'text-gray-700'}`}
                    >
                      <MagnifyingGlassCircleIcon className={`mr-3 h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} aria-hidden='true' />
                      Search by Artist
                    </a>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button 
                    className={`group w-full flex items-center px-4 py-2 text-sm ${active ? 'bg-yellow-400 hover:text-white' : 'text-gray-700'}`} onClick={signOut}
                    >
                      <ArrowLeftOnRectangleIcon className={`mr-3 h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} aria-hidden='true' />
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div> 
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  </div>
  )
}

export default DropdownNav
