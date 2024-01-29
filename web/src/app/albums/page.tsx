"use client";
import { useContext, useEffect } from "react";

import { AlbumsSection } from "@/components/AlbumsSection";
import { AlbumContext } from "@/contexts/AlbumContext";

export default function Albums() {
  const { albums, fetchAllAlbums } = useContext(AlbumContext);

  useEffect(() => {
    fetchAllAlbums();
  }, [fetchAllAlbums]);

  return <AlbumsSection items={albums} />;
}
