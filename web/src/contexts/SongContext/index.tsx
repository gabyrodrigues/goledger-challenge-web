import { CreateASong, EmptyFormSong, SongFormData, UpdateASong } from "@/utils/data";
import { createContext } from "react";

interface SongProps {
  songs: SongItem[];
  song: SongItem | null;
  activeSong: SongFormData | EmptyFormSong;
  setActiveSong: (artist: SongFormData | EmptyFormSong) => void;
  fetchFirstSongs: () => Promise<void>;
  fetchAllSongs: () => Promise<void>;
  fetchSongById: (songId: string) => Promise<void>;
  handleDeleteSong: (songId: string) => Promise<void>;
  createSong: (values: CreateASong) => Promise<void>;
  updateSong: (artistId: string, values: UpdateASong) => Promise<void>;
}

export interface SongItem {
  id: string;
  title: string;
  explicit: boolean;
  artists: string[];
  album: string;
}

export const SongContext = createContext({} as SongProps);
