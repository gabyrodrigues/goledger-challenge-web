import { createContext } from "react";

interface ArtistProps {
  artists: ArtistItem[];
  fetchFirstArtists: () => Promise<void>;
  fetchAllArtists: () => Promise<void>;
}

export interface ArtistItem {
  id: string;
  name: string;
  about: string;
}

export const ArtistContext = createContext({} as ArtistProps);
