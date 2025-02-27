"use client";
import { useCallback, useContext, useState } from "react";

import { PlaylistContext, PlaylistItem } from ".";
import { CreateAPlaylist, Playlist, Song, UpdateAPlaylist } from "@/utils/data";
import api from "@/services/api";
import { EMPTY_PLAYLIST } from "@/forms/Playlist/emptyPlaylist";
import { AlbumContext } from "../AlbumContext";

interface PlaylistContextProviderProps {
  children: React.ReactNode;
}

export default function PlaylistContextProvider(props: PlaylistContextProviderProps) {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItem | null>(null);
  const [activePlaylist, setActivePlaylist] = useState(EMPTY_PLAYLIST);
  const { fetchArtistNames } = useContext(AlbumContext);

  async function handlePlaylistsData(playlistsData: Playlist[]): Promise<PlaylistItem[]> {
    const playlists = playlistsData.map((playlist: Playlist) => {
      return {
        id: playlist["@key"],
        name: playlist.name,
        description: playlist.description,
        songs: []
      };
    });
    return playlists;
  }

  const handlePlaylistWithSongs = useCallback(
    async (playlistData: Playlist) => {
      const songsKeys = playlistData.songs.map((song) => song["@key"]);
      const songResponse = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "song",
            "@key": { $in: songsKeys }
          },
          fields: ["@key", "title", "explicit", "artists"]
        }
      });
      const songsInfo = await Promise.all(
        songResponse.data.result.map(async (song: Song) => {
          const artistKeys = song.artists.map((artist) => artist["@key"]);
          const artistNames = await fetchArtistNames(artistKeys);

          return {
            id: song["@key"],
            title: song.title,
            explicit: song.explicit,
            artists: artistNames
          };
        })
      );

      return {
        id: playlistData["@key"],
        name: playlistData.name,
        description: playlistData.description,
        songs: songsInfo
      };
    },
    [fetchArtistNames]
  );

  const fetchFirstPlaylists = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "playlist"
          },
          fields: ["@key", "name", "description"],
          limit: 6
        }
      });
      const playlistsData = response.data.result;
      const playlistsWithSongs = await handlePlaylistsData(playlistsData);

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
      const playlistsWithSongs = await handlePlaylistsData(playlistsData);

      setPlaylists(playlistsWithSongs);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchPlaylistById = useCallback(
    async (playlistId: string) => {
      try {
        const response = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "playlist",
              "@key": playlistId
            },
            fields: ["@key", "name", "description", "songs"]
          }
        });
        const playlistsData = response.data.result;
        const playlistsWithSongs = await handlePlaylistWithSongs(playlistsData[0]);

        setPlaylist(playlistsWithSongs);
        setActivePlaylist(playlistsData[0]);
      } catch (error) {
        setPlaylist(null);
        console.error(error);
      }
    },
    [handlePlaylistWithSongs]
  );

  async function handleDeletePlaylist(playlistId: string) {
    try {
      await api.post("invoke/deleteAsset", {
        key: {
          "@assetType": "playlist",
          "@key": playlistId
        }
      });

      const filteredList = playlists.filter((playlist) => playlist.id !== playlistId);
      setPlaylists(filteredList);
    } catch (error) {
      console.error(error);
    }
  }

  async function createPlaylist(values: CreateAPlaylist) {
    try {
      await api.post("invoke/createAsset", {
        asset: [
          {
            ...values
          }
        ]
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function updatePlaylist(playlistId: string, values: UpdateAPlaylist) {
    try {
      await api.post("invoke/updateAsset", {
        update: {
          "@assetType": "playlist",
          "@key": playlistId,
          ...values
        }
      });
      setActivePlaylist(EMPTY_PLAYLIST);
    } catch (error) {
      console.error(error);
    }
  }

  const values = {
    playlists,
    playlist,
    activePlaylist,
    setActivePlaylist,
    fetchFirstPlaylists,
    fetchAllPlaylists,
    fetchPlaylistById,
    handleDeletePlaylist,
    createPlaylist,
    updatePlaylist
  };

  return <PlaylistContext.Provider value={values}>{props.children}</PlaylistContext.Provider>;
}
