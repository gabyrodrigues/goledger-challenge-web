"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flex, Loader, Stack, Title } from "@mantine/core";

import { PlaylistForm } from "@/forms/Playlist";
import { PlaylistContext } from "@/contexts/PlaylistContext";
import { SongContext } from "@/contexts/SongContext";

export default function UpdatePlaylist() {
  const { id } = useParams();
  const { fetchPlaylistById } = useContext(PlaylistContext);
  const { fetchAllSongs } = useContext(SongContext);
  const playlistId = decodeURIComponent(String(id));

  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchPlaylistById(playlistId);
    await fetchAllSongs();
    setLoading(false);
  }, [fetchPlaylistById, playlistId, fetchAllSongs]);

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
          <Title order={1}>Update Playlist</Title>
          <PlaylistForm />
        </Stack>
      )}
    </>
  );
}
