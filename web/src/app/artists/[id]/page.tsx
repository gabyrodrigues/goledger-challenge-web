"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flex, Loader, Stack } from "@mantine/core";

import { AlbumsSection } from "@/components/AlbumsSection";
import { InfoCard } from "@/components/InfoCard";
import { SongsSection } from "@/components/SongsSection";
import { ArtistContext, ArtistItem } from "@/contexts/ArtistContext";

export default function ArtistId() {
  const { id } = useParams();
  const { artist, artistSongs, artistAlbums, fetchArtistById } = useContext(ArtistContext);
  const artistId = decodeURIComponent(String(id));
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchArtistById(artistId);
    setLoading(false);
  }, [artistId, fetchArtistById]);

  useEffect(() => {
    handleFetchData();
  }, [fetchArtistById, artistId, handleFetchData]);

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
            type="artist"
            artist={artist as ArtistItem}
          />

          <SongsSection items={artistSongs} />

          <AlbumsSection items={artistAlbums} />
        </Stack>
      )}
    </>
  );
}
