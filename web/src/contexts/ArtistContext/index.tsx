import { createContext } from "react";
import { SongItem } from "../SongContext";
import { AlbumItem } from "../AlbumContext";
import { Artist, ArtistFormData, CreateAnArtist, EmptyFormArtist } from "@/utils/data";

interface ArtistProps {
  artists: ArtistItem[];
  artist: ArtistItem | null;
  artistSongs: SongItem[];
  artistAlbums: AlbumItem[];
  activeArtist: ArtistFormData | EmptyFormArtist;
  setActiveArtist: (artist: ArtistFormData | EmptyFormArtist) => void;
  fetchFirstArtists: () => Promise<void>;
  fetchAllArtists: () => Promise<void>;
  fetchArtistById: (artistId: string) => Promise<{
    artist: Artist;
    artistWithInfo: ArtistItem;
  } | null>;
  handleDeleteArtist: (artistId: string) => Promise<void>;
  createArtist: (values: CreateAnArtist) => Promise<void>;
}

export interface ArtistItem {
  id: string;
  name: string;
  about: string;
}

export const ArtistContext = createContext({} as ArtistProps);
