import { createContext } from "react";

interface AlbumProps {
  albums: AlbumItem[];
  fetchFirstAlbums: () => Promise<void>;
}

export interface AlbumItem {
  id: string;
  title: string;
  artist: string;
  rating: number;
  releaseDate: string;
}

export const AlbumContext = createContext({} as AlbumProps);
