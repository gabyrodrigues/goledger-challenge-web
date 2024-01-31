"use client";
import { useCallback, useState } from "react";

import { SongContext, SongItem } from ".";
import { CreateASong, Playlist, Song, UpdateASong } from "@/utils/data";
import api from "@/services/api";
import { EMPTY_SONG } from "@/forms/Song/emptySong";

interface SongContextProviderProps {
  children: React.ReactNode;
}

export default function SongContextProvider(props: SongContextProviderProps) {
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [song, setSong] = useState<SongItem | null>(null);
  const [activeSong, setActiveSong] = useState(EMPTY_SONG);

  async function handleSongsWithRefs(songsData: Song[]): Promise<SongItem[]> {
    const songsWithRefs = await Promise.all(
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

        const albumResponse = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "album",
              "@key": song.album["@key"]
            },
            fields: ["title"]
          }
        });
        const albumTitle = albumResponse.data.result[0].title;

        return {
          id: song["@key"],
          title: song.title,
          explicit: song.explicit,
          artists: artistNames,
          album: albumTitle
        };
      })
    );

    return songsWithRefs;
  }

  const fetchFirstSongs = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "song"
          },
          fields: ["@key", "title", "artists", "explicit", "album"],
          limit: 6
        }
      });
      const songsData = response.data.result;

      const songsWithRefs = await handleSongsWithRefs(songsData);
      setSongs(songsWithRefs);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAllSongs = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "song"
          },
          fields: ["@key", "title", "artists", "explicit", "album"]
        }
      });
      const songsData = response.data.result;
      const songsWithRefs = await handleSongsWithRefs(songsData);
      setSongs(songsWithRefs);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchSongById = useCallback(async (songId: string) => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "song",
            "@key": songId
          },
          fields: ["@key", "title", "artists", "explicit", "album"]
        }
      });
      const songsData = response.data.result;
      const songWithRefs = await handleSongsWithRefs(songsData);
      setSong(songWithRefs[0]);
      setActiveSong(songsData[0]);
    } catch (error) {
      setSong(null);
      console.error(error);
    }
  }, []);

  async function findPlaylistsBySong(songId: string): Promise<Playlist[]> {
    try {
      const playlistResponse = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "playlist",
            songs: {
              $elemMatch: {
                "@key": songId
              }
            }
          },
          fields: ["@key", "name", "description", "songs"]
        }
      });

      return playlistResponse.data.result as Playlist[];
    } catch (error) {
      console.error("Error finding playlists by song:", error);
      throw error;
    }
  }

  async function updateSongsFromPlaylist(playlist: Playlist, songId: string): Promise<void> {
    try {
      const playlistSongs = playlist.songs.filter((song) => song["@key"] !== songId);
      await api.post("invoke/updateAsset", {
        update: {
          "@assetType": "playlist",
          "@key": playlist["@key"],
          songs: playlistSongs
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function handleDeleteSong(songId: string) {
    try {
      const playlistsWithSong = await findPlaylistsBySong(songId);
      if (playlistsWithSong.length > 0) {
        await Promise.all(
          playlistsWithSong.map((playlist) => updateSongsFromPlaylist(playlist, songId))
        );
      }

      await api.post("invoke/deleteAsset", {
        key: {
          "@assetType": "song",
          "@key": songId
        }
      });

      const filteredList = songs.filter((song) => song.id !== songId);
      setSongs(filteredList);
    } catch (error) {
      console.error(error);
    }
  }

  async function createSong(values: CreateASong) {
    console.log("createSong", values);
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

  async function updateSong(songId: string, values: UpdateASong) {
    console.log("updateSong", values);
    try {
      await api.post("invoke/updateAsset", {
        update: {
          "@assetType": "song",
          "@key": songId,
          ...values
        }
      });
      setActiveSong(EMPTY_SONG);
    } catch (error) {
      console.error(error);
    }
  }

  const values = {
    songs,
    song,
    activeSong,
    setActiveSong,
    fetchFirstSongs,
    fetchAllSongs,
    fetchSongById,
    handleDeleteSong,
    createSong,
    updateSong
  };

  return <SongContext.Provider value={values}>{props.children}</SongContext.Provider>;
}
