import { createContext } from "react";
import { SongItem } from "../SongContext";
import { AlbumItem } from "../AlbumContext";

interface ArtistProps {
  artists: ArtistItem[];
  artist: ArtistItem | null;
  artistSongs: SongItem[];
  artistAlbums: AlbumItem[];
  fetchFirstArtists: () => Promise<void>;
  fetchAllArtists: () => Promise<void>;
  fetchArtistById: (artistId: string) => Promise<void>;
  handleDeleteArtist: (artistId: string) => Promise<void>;
}

export interface ArtistItem {
  id: string;
  name: string;
  about: string;
}

export const ArtistContext = createContext({} as ArtistProps);
