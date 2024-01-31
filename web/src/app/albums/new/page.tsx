"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Flex, Loader, Stack, Title } from "@mantine/core";

import { ArtistContext } from "@/contexts/ArtistContext";
import { AlbumForm } from "@/forms/Album";

export default function NewAlbum() {
  const { fetchAllArtists } = useContext(ArtistContext);
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchAllArtists();
    setLoading(false);
  }, [fetchAllArtists]);

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
          <Title order={1}>Create New Album</Title>
          <AlbumForm />
        </Stack>
      )}
    </>
  );
}
