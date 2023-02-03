import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { playlistState } from '../atoms/playlistAtom';

function PlaylistBox() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(playlist[0])

  return (
    <Listbox value={selectedPlaylist} onChange={setSelectedPlaylist}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
export default PlaylistBox
