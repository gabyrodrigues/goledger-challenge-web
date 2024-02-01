"use client";
import { useCallback, useContext, useEffect, useState } from "react";

import { AlbumsSection } from "@/components/AlbumsSection";
import { ArtistsSection } from "@/components/ArtistsSection";
import { SongsSection } from "@/components/SongsSection";
import { PlaylistsSection } from "@/components/PlaylistsSection";

import { SongContext } from "@/contexts/SongContext";
import { AlbumContext } from "@/contexts/AlbumContext";
import { ArtistContext } from "@/contexts/ArtistContext";
import { PlaylistContext } from "@/contexts/PlaylistContext";
import { Flex, Loader } from "@mantine/core";

export default function Home() {
  const { songs, fetchFirstSongs } = useContext(SongContext);
  const { albums, fetchFirstAlbums } = useContext(AlbumContext);
  const { artists, fetchFirstArtists } = useContext(ArtistContext);
  const { playlists, fetchFirstPlaylists } = useContext(PlaylistContext);
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchFirstSongs();
    await fetchFirstAlbums();
    await fetchFirstArtists();
    await fetchFirstPlaylists();
    setLoading(false);
  }, [fetchFirstAlbums, fetchFirstArtists, fetchFirstPlaylists, fetchFirstSongs]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <>
      {isLoading ? (
        <Flex
          align="center"
          justify="center">
          <Loader
            size="xl"
            color="var(--mantine-color-gray-0)"
          />
        </Flex>
      ) : (
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
      )}
    </>
  );
}
