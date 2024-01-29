"use client";
import { useContext, useEffect } from "react";

import { SongsSection } from "@/components/SongsSection";
import { SongContext } from "@/contexts/SongContext";

export default function Songs() {
  const { songs, fetchAllSongs } = useContext(SongContext);

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  return (
    <>
      <SongsSection items={songs} />
    </>
  );
}
