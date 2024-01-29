import { createContext } from "react";
import { SongItem } from "../SongContext";

interface PlaylistProps {
  playlists: PlaylistItem[];
  playlist: PlaylistItem | null;
  fetchFirstPlaylists: () => Promise<void>;
  fetchAllPlaylists: () => Promise<void>;
  fetchPlaylistById: (playlistId: string) => Promise<void>;
  handleDeletePlaylist: (playlistId: string) => Promise<void>;
}

export interface PlaylistItem {
  id: string;
  name: string;
  description: string;
  songs: SongItem[];
}

export const PlaylistContext = createContext({} as PlaylistProps);
