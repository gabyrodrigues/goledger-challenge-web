import { AlbumFormData } from "@/utils/data";

export function handleFormatCreateAlbum(values: AlbumFormData) {
  const transformedValues = {
    "@assetType": "album",
    title: values.title,
    artist: {
      "@assetType": "artist",
      "@key": values.artist["@key"]
    },
    releaseDate: values.releaseDate,
    rating: values.rating
  };
  return transformedValues;
}
