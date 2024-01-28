import { ReactNode } from "react";

import SongContextProvider from "./SongContext/provider";
import AlbumContextProvider from "./AlbumContext/provider";
import ArtistContextProvider from "./ArtistContext/provider";
import PlaylistContextProvider from "./PlaylistContext/provider";

interface AppContextsProps {
  children: ReactNode;
}

export function AppContexts({ children }: AppContextsProps) {
  return (
    <AlbumContextProvider>
      <SongContextProvider>
        <PlaylistContextProvider>
          <ArtistContextProvider>{children}</ArtistContextProvider>
        </PlaylistContextProvider>
      </SongContextProvider>
    </AlbumContextProvider>
  );
}
