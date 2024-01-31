"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Flex, Loader, Stack, Title } from "@mantine/core";

import { SongContext } from "@/contexts/SongContext";
import { PlaylistForm } from "@/forms/Playlist";

export default function NewPlaylist() {
  const { fetchAllSongs } = useContext(SongContext);
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchAllSongs();
    setLoading(false);
  }, [fetchAllSongs]);

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
          <Title order={1}>Create New Playlist</Title>
          <PlaylistForm />
        </Stack>
      )}
    </>
  );
}
