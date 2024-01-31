"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flex, Loader, Stack, Title } from "@mantine/core";

import { AlbumForm } from "@/forms/Album";
import { AlbumContext } from "@/contexts/AlbumContext";
import { ArtistContext } from "@/contexts/ArtistContext";

export default function UpdateAlbum() {
  const { id } = useParams();
  const { fetchAlbumById } = useContext(AlbumContext);
  const { fetchAllArtists } = useContext(ArtistContext);
  const albumId = decodeURIComponent(String(id));

  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchAlbumById(albumId);
    await fetchAllArtists();
    setLoading(false);
  }, [albumId, fetchAlbumById, fetchAllArtists]);

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
          <Title order={1}>Update Album</Title>
          <AlbumForm />
        </Stack>
      )}
    </>
  );
}
