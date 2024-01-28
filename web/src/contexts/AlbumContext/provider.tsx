"use client";
import { useCallback, useState } from "react";

import { AlbumContext, AlbumItem } from ".";
import api from "@/services/api";
import { Album } from "@/utils/data";

interface AlbumContextProviderProps {
  children: React.ReactNode;
}

export default function AlbumContextProvider(props: AlbumContextProviderProps) {
  const [albums, setAlbums] = useState<AlbumItem[]>([]);

  const fetchFirstAlbums = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "album"
          },
          fields: ["@key", "title", "artist", "rating", "releaseDate"],
          limit: 6
        }
      });

      const albumsData = response.data.result;
      const albumsWithArtists = await Promise.all(
        albumsData.map(async (album: Album) => {
          const artistKey = album.artist["@key"];
          const artistResponse = await api.post("query/search", {
            query: {
              selector: {
                "@assetType": "artist",
                "@key": artistKey
              },
              fields: ["name"]
            }
          });
          const artistName = artistResponse.data.result.map(({ name }: { name: string }) => name);

          return {
            id: album["@key"],
            title: album.title,
            artist: artistName,
            rating: album.rating,
            releaseDate: album.releaseDate
          };
        })
      );
      setAlbums(albumsWithArtists);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const values = {
    albums,
    fetchFirstAlbums
  };

  return <AlbumContext.Provider value={values}>{props.children}</AlbumContext.Provider>;
}
