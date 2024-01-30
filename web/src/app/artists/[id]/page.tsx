"use client";
import { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { Stack } from "@mantine/core";

import { AlbumsSection } from "@/components/AlbumsSection";
import { InfoCard } from "@/components/InfoCard";
import { SongsSection } from "@/components/SongsSection";
import { ArtistContext, ArtistItem } from "@/contexts/ArtistContext";

export default function ArtistId() {
  const { id } = useParams();
  const { artist, artistSongs, artistAlbums, fetchArtistById } = useContext(ArtistContext);
  const artistId = decodeURIComponent(String(id));

  useEffect(() => {
    fetchArtistById(artistId);
  }, [fetchArtistById, artistId]);

  return (
    <Stack gap={32}>
      <InfoCard
        type="artist"
        artist={artist as ArtistItem}
      />

      <SongsSection items={artistSongs} />

      <AlbumsSection items={artistAlbums} />
    </Stack>
  );
}
