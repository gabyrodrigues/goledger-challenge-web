"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flex, Loader, Stack, Title } from "@mantine/core";

import { SongForm } from "@/forms/Song";
import { SongContext } from "@/contexts/SongContext";
import { ArtistContext } from "@/contexts/ArtistContext";
import { AlbumContext } from "@/contexts/AlbumContext";

export default function UpdateSong() {
  const { id } = useParams();
  const { fetchSongById } = useContext(SongContext);
  const { fetchAllArtists } = useContext(ArtistContext);
  const { fetchAllAlbums } = useContext(AlbumContext);
  const songId = decodeURIComponent(String(id));

  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchSongById(songId);
    await fetchAllArtists();
    await fetchAllAlbums();
    setLoading(false);
  }, [fetchSongById, songId, fetchAllArtists, fetchAllAlbums]);

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
        <Stack gap={32}>
          <Title order={1}>Update Song</Title>
          <SongForm />
        </Stack>
      )}
    </>
  );
}
