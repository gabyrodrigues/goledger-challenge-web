"use client";
import { useContext, useEffect } from "react";

import { AlbumsSection } from "@/components/AlbumsSection";
import { ArtistsSection } from "@/components/ArtistsSection";
import { SongsSection } from "@/components/SongsSection";
import { PlaylistsSection } from "@/components/PlaylistsSection";

import { SongContext } from "@/contexts/SongContext";
import { AlbumContext } from "@/contexts/AlbumContext";
import { ArtistContext } from "@/contexts/ArtistContext";
import { PlaylistContext } from "@/contexts/PlaylistContext";

export default function Home() {
  const { songs, fetchFirstSongs } = useContext(SongContext);
  const { albums, fetchFirstAlbums } = useContext(AlbumContext);
  const { artists, fetchFirstArtists } = useContext(ArtistContext);
  const { playlists, fetchFirstPlaylists } = useContext(PlaylistContext);

  useEffect(() => {
    fetchFirstSongs();
    fetchFirstAlbums();
    fetchFirstArtists();
    fetchFirstPlaylists();
  }, [fetchFirstAlbums, fetchFirstArtists, fetchFirstPlaylists, fetchFirstSongs]);

  return (
    <>
      <SongsSection
        linkUrl="/songs"
        items={songs}
      />

      <AlbumsSection
        linkUrl="/albums"
        items={albums}
      />

      <ArtistsSection
        linkUrl="/artists"
        items={artists}
      />

      <PlaylistsSection
        linkUrl="/playlists"
        items={playlists}
      />
    </>
  );
}
