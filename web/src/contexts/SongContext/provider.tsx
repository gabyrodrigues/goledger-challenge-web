"use client";
import { useCallback, useState } from "react";

import { SongContext, SongItem } from ".";
import { Song } from "@/utils/data";
import api from "@/services/api";

interface SongContextProviderProps {
  children: React.ReactNode;
}

export default function SongContextProvider(props: SongContextProviderProps) {
  const [songs, setSongs] = useState<SongItem[]>([]);

  const fetchFirstSongs = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "song"
          },
          fields: ["@key", "title", "artists"],
          limit: 9
        }
      });
      const songsData = response.data.result;

      const songsWithArtists = await Promise.all(
        songsData.map(async (song: Song) => {
          const artistKeys = song.artists.map((artist) => artist["@key"]);
          const artistResponse = await api.post("query/search", {
            query: {
              selector: {
                "@assetType": "artist",
                "@key": { $in: artistKeys }
              },
              fields: ["name"]
            }
          });
          const artistNames = artistResponse.data.result.map(({ name }: { name: string }) => name);

          return {
            id: song["@key"],
            title: song.title,
            artists: artistNames
          };
        })
      );
      setSongs(songsWithArtists);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const values = {
    songs,
    fetchFirstSongs
  };

  return <SongContext.Provider value={values}>{props.children}</SongContext.Provider>;
}
