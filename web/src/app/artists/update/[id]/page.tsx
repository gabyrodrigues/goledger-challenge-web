"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flex, Loader, Stack, Title } from "@mantine/core";

import { ArtistForm } from "@/forms/Artist";
import { ArtistContext } from "@/contexts/ArtistContext";

export default function UpdateArtist() {
  const { id } = useParams();
  const { fetchArtistById } = useContext(ArtistContext);
  const artistId = decodeURIComponent(String(id));

  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchArtistById(artistId);
    setLoading(false);
  }, [artistId, fetchArtistById]);

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
          <Title order={1}>Update Artist</Title>
          <ArtistForm />
        </Stack>
      )}
    </>
  );
}
