"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Flex, Loader } from "@mantine/core";

import { ArtistsSection } from "@/components/ArtistsSection";
import { ArtistContext } from "@/contexts/ArtistContext";

export default function Artists() {
  const { artists, fetchAllArtists } = useContext(ArtistContext);
  const [isLoading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    await fetchAllArtists();
    setLoading(false);
  }, [fetchAllArtists]);

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
        <ArtistsSection items={artists} />
      )}
    </>
  );
}
