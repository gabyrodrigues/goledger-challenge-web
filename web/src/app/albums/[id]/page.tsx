"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flex, Loader, Stack, Text } from "@mantine/core";

import { InfoCard } from "@/components/InfoCard";
import { Song } from "@/components/Song";
import { AlbumContext, AlbumItem } from "@/contexts/AlbumContext";

export default function AlbumId() {
  const { id } = useParams();
  const { album, albumSongs, fetchAlbumById } = useContext(AlbumContext);
  const albumId = decodeURIComponent(String(id));
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchAlbumById(albumId);
    setLoading(false);
  }, [albumId, fetchAlbumById]);

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
            type="album"
            album={album as AlbumItem}
          />

          {albumSongs.length ? (
            <Stack gap={8}>
              {albumSongs.map((song) => (
                <Song
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artists={song.artists}
                  explicit={song.explicit}
                />
              ))}
            </Stack>
          ) : (
            <Text
              fs="italic"
              ta="center"
              c="dark.2">
              No album songs to display.
            </Text>
          )}
        </Stack>
      )}
    </>
  );
}
