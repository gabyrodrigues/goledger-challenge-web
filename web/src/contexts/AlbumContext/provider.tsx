"use client";
import { useCallback, useState } from "react";

import { AlbumContext, AlbumItem } from ".";
import api from "@/services/api";
import { Album, Artist, Song } from "@/utils/data";
import { SongItem } from "../SongContext";

interface AlbumContextProviderProps {
  children: React.ReactNode;
}

export default function AlbumContextProvider(props: AlbumContextProviderProps) {
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [album, setAlbum] = useState<AlbumItem | null>(null);
  const [albumSongs, setAlbumSongs] = useState<SongItem[]>([]);

  async function handleAlbumsWithArtists(albumsData: Album[]): Promise<AlbumItem[]> {
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
    return albumsWithArtists;
  }

  async function handleAlbumsData(albumsData: Album[]): Promise<AlbumItem[]> {
    const albums = albumsData.map((album: Album) => {
      return {
        id: album["@key"],
        title: album.title,
        artist: album.artist["@key"],
        rating: album.rating,
        releaseDate: album.releaseDate
      };
    });
    return albums;
  }

  const fetchArtistNames = useCallback(async (artistKeys: string[]) => {
    const artistResponse = await api.post("query/search", {
      query: {
        selector: {
          "@assetType": "artist",
          "@key": { $in: artistKeys }
        },
        fields: ["name"]
      }
    });

    return artistResponse.data.result.map((artist: Artist) => artist.name);
  }, []);

  const handleAlbumSongs = useCallback(
    async (albumData: Album) => {
      try {
        const songResponse = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "song",
              album: {
                "@key": albumData["@key"]
              }
            },
            fields: ["@key", "title", "artists", "explicit", "album"]
          }
        });

        const songs = await Promise.all(
          songResponse.data.result.map(async (songData: Song) => {
            const artistKeys = songData.artists.map((artist) => artist["@key"]);
            const artistNames = await fetchArtistNames(artistKeys);

            return {
              id: songData["@key"],
              title: songData.title,
              explicit: songData.explicit,
              artists: artistNames,
              album: albumData.title
            };
          })
        );

        return songs as SongItem[];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    [fetchArtistNames]
  );

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
      const albums = await handleAlbumsData(albumsData);
      setAlbums(albums);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAllAlbums = useCallback(async () => {
    try {
      const response = await api.post("query/search", {
        query: {
          selector: {
            "@assetType": "album"
          },
          fields: ["@key", "title", "artist", "rating", "releaseDate"]
        }
      });

      const albumsData = response.data.result;
      const albums = await handleAlbumsData(albumsData);
      setAlbums(albums);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAlbumById = useCallback(
    async (albumId: string) => {
      try {
        const response = await api.post("query/search", {
          query: {
            selector: {
              "@assetType": "album",
              "@key": albumId
            },
            fields: ["@key", "title", "artist", "rating", "releaseDate"]
          }
        });

        const albumsData = response.data.result;
        const albumsWithArtists = await handleAlbumsWithArtists(albumsData);
        const albumSongs = await handleAlbumSongs(albumsData[0]);
        const album = albumsWithArtists[0];

        setAlbum(album);
        setAlbumSongs(albumSongs);
        return album;
      } catch (error) {
        setAlbum(null);
        console.error(error);
        return null;
      }
    },
    [handleAlbumSongs]
  );

  const values = {
    albums,
    album,
    albumSongs,
    fetchFirstAlbums,
    fetchAllAlbums,
    fetchAlbumById,
    fetchArtistNames
  };

  return <AlbumContext.Provider value={values}>{props.children}</AlbumContext.Provider>;
}
