"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Flex, Loader } from "@mantine/core";

import { PlaylistsSection } from "@/components/PlaylistsSection";
import { PlaylistContext } from "@/contexts/PlaylistContext";

export default function Playlists() {
  const { playlists, fetchAllPlaylists } = useContext(PlaylistContext);
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchAllPlaylists();
    setLoading(false);
  }, [fetchAllPlaylists]);

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
        <PlaylistsSection items={playlists} />
      )}
    </>
  );
}
