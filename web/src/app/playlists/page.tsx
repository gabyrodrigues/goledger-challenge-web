"use client";
import { useContext, useEffect } from "react";

import { PlaylistsSection } from "@/components/PlaylistsSection";
import { PlaylistContext } from "@/contexts/PlaylistContext";

export default function Playlists() {
  const { playlists, fetchAllPlaylists } = useContext(PlaylistContext);

  useEffect(() => {
    fetchAllPlaylists();
  }, [fetchAllPlaylists]);

  return <PlaylistsSection items={playlists} />;
}
