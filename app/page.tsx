
"use client"
import { ChangeEvent, useCallback, useState } from 'react';
import Header from './header/page';
import './style.scss'
import PlaylistComparator from './PlaylistComparator/page';
export default function Home() {
  const [validPlaylist, setPlaylist] = useState<string>()

  const handleChangePlaylist = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPlaylist(e.target.value)

  }, [])
  return (
    <main>
      <Header />
      <div>
        <label htmlFor="playlist-link">Enter playlist link here</label>
        <input onChange={handleChangePlaylist} type="text" name="playlist-link" id="playlist-link" />
      </div>
      {validPlaylist && <PlaylistComparator />}
    </main>

  );
}
