import { createContext } from "react";

interface PlaylistProps {
  playlists: PlaylistItem[];
  fetchFirstPlaylists: () => Promise<void>;
}

export interface PlaylistItem {
  id: string;
  name: string;
  description: string;
  songs: string[];
}

export const PlaylistContext = createContext({} as PlaylistProps);
