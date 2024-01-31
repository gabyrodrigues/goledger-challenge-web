import { PlaylistFormData } from "@/utils/data";

export function handleFormatCreatePlaylist(values: PlaylistFormData) {
  const transformedValues = {
    "@assetType": "playlist",
    name: values.name,
    description: values.description,
    songs: values.songs
  };
  return transformedValues;
}
