import { createContext } from "react";

interface SongProps {
  songs: SongItem[];
  fetchFirstSongs: () => Promise<void>;
  fetchAllSongs: () => Promise<void>;
}

export interface SongItem {
  id: string;
  title: string;
  artists: string[];
}

export const SongContext = createContext({} as SongProps);
