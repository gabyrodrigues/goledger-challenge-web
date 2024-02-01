"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Flex, Loader, Stack } from "@mantine/core";

import { InfoCard } from "@/components/InfoCard";
import { SongContext, SongItem } from "@/contexts/SongContext";
import { useParams } from "next/navigation";

export default function SongId() {
  const { id } = useParams();
  const { song, fetchSongById } = useContext(SongContext);
  const songId = decodeURIComponent(String(id));
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchSongById(songId);
    setLoading(false);
  }, [fetchSongById, songId]);

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
          <InfoCard
            type="song"
            song={song as SongItem}
          />
        </Stack>
      )}
    </>
  );
}
