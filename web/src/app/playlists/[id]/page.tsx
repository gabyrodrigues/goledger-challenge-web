"use client";
import { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { Stack, Text } from "@mantine/core";

import { InfoCard } from "@/components/InfoCard";
import { Song } from "@/components/Song";
import { PlaylistContext, PlaylistItem } from "@/contexts/PlaylistContext";

export default function PlaylistId() {
  const { id } = useParams();
  const { playlist, fetchPlaylistById } = useContext(PlaylistContext);
  const playlistId = decodeURIComponent(String(id));

  useEffect(() => {
    fetchPlaylistById(playlistId);
  }, [fetchPlaylistById, playlistId]);

  return (
    <Stack className="gap-8">
      <InfoCard
        type="playlist"
        playlist={playlist as PlaylistItem}
      />

      <Stack className="gap-2">
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
          <Text className="text-center text-lightGray italic">
            No songs to display. Update the playlist to add songs.
          </Text>
        )}
      </Stack>
    </Stack>
  );
}
