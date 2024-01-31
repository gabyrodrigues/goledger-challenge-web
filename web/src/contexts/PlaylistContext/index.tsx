import { createContext } from "react";
import { SongItem } from "../SongContext";
import {
  CreateAPlaylist,
  EmptyFormPlaylist,
  PlaylistFormData,
  UpdateAPlaylist
} from "@/utils/data";

interface PlaylistProps {
  playlists: PlaylistItem[];
  playlist: PlaylistItem | null;
  activePlaylist: PlaylistFormData | EmptyFormPlaylist;
  setActivePlaylist: (artist: PlaylistFormData | EmptyFormPlaylist) => void;
  fetchFirstPlaylists: () => Promise<void>;
  fetchAllPlaylists: () => Promise<void>;
  fetchPlaylistById: (playlistId: string) => Promise<void>;
  handleDeletePlaylist: (playlistId: string) => Promise<void>;
  createPlaylist: (values: CreateAPlaylist) => Promise<void>;
  updatePlaylist: (artistId: string, values: UpdateAPlaylist) => Promise<void>;
}

export interface PlaylistItem {
  id: string;
  name: string;
  description: string;
  songs: SongItem[];
}

export const PlaylistContext = createContext({} as PlaylistProps);
