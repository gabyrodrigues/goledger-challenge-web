"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flex, Loader, Stack, Text } from "@mantine/core";

import { InfoCard } from "@/components/InfoCard";
import { Song } from "@/components/Song";
import { PlaylistContext, PlaylistItem } from "@/contexts/PlaylistContext";

export default function PlaylistId() {
  const { id } = useParams();
  const { playlist, fetchPlaylistById } = useContext(PlaylistContext);
  const playlistId = decodeURIComponent(String(id));
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchPlaylistById(playlistId);
    setLoading(false);
  }, [fetchPlaylistById, playlistId]);

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
            type="playlist"
            playlist={playlist as PlaylistItem}
          />

          <Stack gap={8}>
            {playlist?.songs.length ? (
              playlist?.songs.map((song) => (
                <Song
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  explicit={song.explicit}
                  artists={song.artists}
                />
              ))
            ) : (
              <Text
                fs="italic"
                ta="center"
                c="dark.2">
                No songs to display. Update the playlist to add songs.
              </Text>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
