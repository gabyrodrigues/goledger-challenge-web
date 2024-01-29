"use client";
import { useContext, useEffect } from "react";

import { ArtistsSection } from "@/components/ArtistsSection";
import { ArtistContext } from "@/contexts/ArtistContext";

export default function Artists() {
  const { artists, fetchAllArtists } = useContext(ArtistContext);

  useEffect(() => {
    fetchAllArtists();
  }, [fetchAllArtists]);

  return <ArtistsSection items={artists} />;
}
