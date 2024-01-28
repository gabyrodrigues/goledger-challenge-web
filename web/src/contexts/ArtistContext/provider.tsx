"use client";
import { useCallback, useState } from "react";

import api from "@/services/api";
import { ArtistContext, ArtistItem } from ".";
import { Artist } from "@/utils/data";

interface ArtistContextProviderProps {
  children: React.ReactNode;
}

export default function ArtistContextProvider(props: ArtistContextProviderProps) {
  const [artists, setArtists] = useState<ArtistItem[]>([]);

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
      const artists = artistsData.map((artist: Artist) => {
        return {
          id: artist["@key"],
          name: artist.name,
          about: artist.about
        };
      });
      setArtists(artists);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const values = {
    artists,
    fetchFirstArtists
  };

  return <ArtistContext.Provider value={values}>{props.children}</ArtistContext.Provider>;
}
