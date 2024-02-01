"use client";
import { useCallback, useContext, useEffect, useState } from "react";

import { SongsSection } from "@/components/SongsSection";
import { SongContext } from "@/contexts/SongContext";
import { Flex, Loader } from "@mantine/core";

export default function Songs() {
  const { songs, fetchAllSongs } = useContext(SongContext);
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
        <SongsSection items={songs} />
      )}
    </>
  );
}
