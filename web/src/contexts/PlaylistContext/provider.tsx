"use client";
import { useCallback, useState } from "react";

import { PlaylistContext, PlaylistItem } from ".";
import { Playlist } from "@/utils/data";
import api from "@/services/api";

interface PlaylistContextProviderProps {
  children: React.ReactNode;
}

export default function PlaylistContextProvider(props: PlaylistContextProviderProps) {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  async function handlePlaylistWithSongs(playlistsData: Playlist[]): Promise<PlaylistItem[]> {
    const playlistsWithSongs = await Promise.all(
      playlistsData.map(async (playlist: Playlist) => {
        const songsKeys = playlist.songs.map((song) => song["@key"]);
        const songResponse = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "song",
              "@key": { $in: songsKeys }
            },
            fields: ["title"]
          }
        });
        const songsNames = songResponse.data.result.map(({ title }: { title: string }) => title);

        return {
          id: playlist["@key"],
          name: playlist.name,
          description: playlist.description,
          songs: songsNames
        };
      })
    );
    return playlistsWithSongs;
  }

  const fetchFirstPlaylists = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "playlist"
          },
          fields: ["@key", "name", "description", "songs"],
          limit: 6
        }
      });
      const playlistsData = response.data.result;
      const playlistsWithSongs = await handlePlaylistWithSongs(playlistsData);

      setPlaylists(playlistsWithSongs);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAllPlaylists = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "playlist"
          },
          fields: ["@key", "name", "description", "songs"]
        }
      });
      const playlistsData = response.data.result;
      const playlistsWithSongs = await handlePlaylistWithSongs(playlistsData);

      setPlaylists(playlistsWithSongs);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const values = {
    playlists,
    fetchFirstPlaylists,
    fetchAllPlaylists
  };

  return <PlaylistContext.Provider value={values}>{props.children}</PlaylistContext.Provider>;
}
