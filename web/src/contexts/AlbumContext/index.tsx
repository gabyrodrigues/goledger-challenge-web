import { createContext } from "react";

import { SongItem } from "../SongContext";
import { Album, CreateAnAlbum, UpdateAnAlbum, EmptyFormAlbum, AlbumFormData } from "@/utils/data";

interface AlbumProps {
  albums: AlbumItem[];
  album: AlbumItem | null;
  albumSongs: SongItem[];
  activeAlbum: AlbumFormData | EmptyFormAlbum;
  setActiveAlbum: (artist: AlbumFormData | EmptyFormAlbum) => void;
  fetchFirstAlbums: () => Promise<void>;
  fetchAllAlbums: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<{ album: Album; albumWithInfo: AlbumItem } | null>;
  fetchArtistNames: (artistKeys: string[]) => Promise<string[]>;
  handleDeleteAlbum: (albumId: string) => Promise<void>;
  createAlbum: (values: CreateAnAlbum) => Promise<void>;
  updateAlbum: (artistId: string, values: UpdateAnAlbum) => Promise<void>;
}

export interface AlbumItem {
  id: string;
  title: string;
  artist: string;
  rating: number;
  releaseDate: string;
}

export const AlbumContext = createContext({} as AlbumProps);
