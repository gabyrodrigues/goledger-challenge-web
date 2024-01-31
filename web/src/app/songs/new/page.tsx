"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Flex, Loader, Stack, Title } from "@mantine/core";

import { ArtistContext } from "@/contexts/ArtistContext";
import { SongForm } from "@/forms/Song";
import { AlbumContext } from "@/contexts/AlbumContext";

export default function NewSong() {
  const { fetchAllArtists } = useContext(ArtistContext);
  const { fetchAllAlbums } = useContext(AlbumContext);
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchAllArtists();
    await fetchAllAlbums();
    setLoading(false);
  }, [fetchAllAlbums, fetchAllArtists]);

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
          <Title order={1}>Create New Song</Title>
          <SongForm />
        </Stack>
      )}
    </>
  );
}
