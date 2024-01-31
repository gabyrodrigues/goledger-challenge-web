"use client";
import { useCallback, useContext, useState } from "react";

import api from "@/services/api";
import { Album, Artist, CreateAnArtist, Song, UpdateAnArtist } from "@/utils/data";
import { EMPTY_ARTIST } from "@/forms/Artist/emptyArtist";
import { ArtistContext, ArtistItem } from ".";
import { SongItem } from "../SongContext";
import { AlbumContext, AlbumItem } from "../AlbumContext";

interface ArtistContextProviderProps {
  children: React.ReactNode;
}

export default function ArtistContextProvider(props: ArtistContextProviderProps) {
  const [artists, setArtists] = useState<ArtistItem[]>([]);
  const [artist, setArtist] = useState<ArtistItem | null>(null);
  const [artistSongs, setArtistSongs] = useState<SongItem[]>([]);
  const [artistAlbums, setArtistAlbums] = useState<AlbumItem[]>([]);
  const [activeArtist, setActiveArtist] = useState(EMPTY_ARTIST);
  const { fetchArtistNames, fetchAlbumById, handleDeleteAlbum } = useContext(AlbumContext);

  async function handleArtistData(artistsData: Artist[]): Promise<ArtistItem[]> {
    const artists = artistsData.map((artist: Artist) => {
      return {
        id: artist["@key"],
        name: artist.name,
        about: artist.about
      };
    });
    return artists;
  }

  const handleArtistSongs = useCallback(
    async (artistData: Artist) => {
      try {
        const songResponse = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "song",
              artists: {
                $elemMatch: {
                  "@key": artistData["@key"]
                }
              }
            },
            fields: ["@key", "title", "artists", "explicit", "album"]
          }
        });

        const songs = await Promise.all(
          songResponse.data.result.map(async (songData: Song) => {
            const artistKeys = songData.artists.map((artist) => artist["@key"]);
            const artistNames = await fetchArtistNames(artistKeys);
            const album = await fetchAlbumById(songData.album["@key"]);

            return {
              id: songData["@key"],
              title: songData.title,
              explicit: songData.explicit,
              artists: artistNames,
              album: album?.albumWithInfo.title
            };
          })
        );

        return songs as SongItem[];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    [fetchAlbumById, fetchArtistNames]
  );

  const handleArtistAlbums = useCallback(async (artistData: Artist) => {
    try {
      const albumResponse = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "album",
            artist: {
              "@key": artistData["@key"]
            }
          },
          fields: ["@key", "title", "artist", "rating", "releaseDate"]
        }
      });

      const albums = await Promise.all(
        albumResponse.data.result.map(async (albumData: Album) => {
          return {
            id: albumData["@key"],
            title: albumData.title,
            artist: artistData.name,
            rating: albumData.rating,
            releaseData: albumData.releaseDate
          };
        })
      );

      return albums as AlbumItem[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  const fetchFirstArtists = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "artist"
          },
          fields: ["@key", "name", "about"],
          limit: 6
        }
      });

      const artistsData = response.data.result;
      const artists = await handleArtistData(artistsData);
      setArtists(artists);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAllArtists = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "artist"
          },
          fields: ["@key", "name", "about"]
        }
      });

      const artistsData = response.data.result;
      const artists = await handleArtistData(artistsData);
      setArtists(artists);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchArtistById = useCallback(
    async (artistId: string) => {
      try {
        const response = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "artist",
              "@key": artistId
            },
            fields: ["@key", "name", "about"]
          }
        });

        const artistsData = response.data.result;
        const artists = await handleArtistData(artistsData);
        const artistSongs = await handleArtistSongs(artistsData[0]);
        const artistAlbums = await handleArtistAlbums(artistsData[0]);

        setArtist(artists[0]);
        setArtistSongs(artistSongs);
        setArtistAlbums(artistAlbums);
        setActiveArtist(artistsData[0]);

        return { artist: artistsData[0], artistWithInfo: artists[0] };
      } catch (error) {
        setArtist(null);
        setActiveArtist(EMPTY_ARTIST);
        console.error(error);
        return null;
      }
    },
    [handleArtistAlbums, handleArtistSongs]
  );

  async function handleDeleteArtist(artistId: string) {
    try {
      const artistInfo = await fetchArtistById(artistId);

      if (artistInfo) {
        const albumsWithArtist = await handleArtistAlbums(artistInfo.artist);

        if (albumsWithArtist.length > 0) {
          await Promise.all(albumsWithArtist.map((album) => handleDeleteAlbum(album.id)));
        }
      }

      await api.post("invoke/deleteAsset", {
        key: {
          "@assetType": "artist",
          "@key": artistId
        }
      });

      const filteredList = artists.filter((artist) => artist.id !== artistId);
      setArtists(filteredList);
    } catch (error) {
      console.error(error);
    }
  }

  async function createArtist(values: CreateAnArtist) {
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

  async function updateArtist(artistId: string, values: UpdateAnArtist) {
    try {
      await api.post("invoke/updateAsset", {
        update: {
          "@assetType": "artist",
          "@key": artistId,
          ...values
        }
      });
      setActiveArtist(EMPTY_ARTIST);
    } catch (error) {
      console.error(error);
    }
  }

  const values = {
    artists,
    artist,
    artistSongs,
    artistAlbums,
    activeArtist,
    setActiveArtist,
    fetchFirstArtists,
    fetchAllArtists,
    fetchArtistById,
    handleDeleteArtist,
    createArtist,
    updateArtist
  };

  return <ArtistContext.Provider value={values}>{props.children}</ArtistContext.Provider>;
}
