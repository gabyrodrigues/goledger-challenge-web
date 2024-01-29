"use client";
import { useContext, useEffect } from "react";
import { Stack } from "@mantine/core";

import { InfoCard } from "@/components/InfoCard";
import { SongContext, SongItem } from "@/contexts/SongContext";
import { useParams } from "next/navigation";

export default function SongId() {
  const { id } = useParams();
  const { song, fetchSongById } = useContext(SongContext);
  const songId = decodeURIComponent(String(id));

  useEffect(() => {
    fetchSongById(songId);
  }, [fetchSongById, songId]);

  return (
    <Stack className="gap-8">
      <InfoCard
        type="song"
        song={song as SongItem}
      />
    </Stack>
  );
}
