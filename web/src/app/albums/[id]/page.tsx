"use client";
import { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { Stack, Text } from "@mantine/core";

import { InfoCard } from "@/components/InfoCard";
import { Song } from "@/components/Song";
import { AlbumContext, AlbumItem } from "@/contexts/AlbumContext";

export default function AlbumId() {
  const { id } = useParams();
  const { album, albumSongs, fetchAlbumById } = useContext(AlbumContext);
  const albumId = decodeURIComponent(String(id));

  useEffect(() => {
    fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  return (
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
          classNames={{
            root: "text-lightGray"
          }}>
          No album songs to display.
        </Text>
      )}
    </Stack>
  );
}
