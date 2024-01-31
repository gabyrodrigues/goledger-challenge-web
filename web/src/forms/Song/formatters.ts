import { SongFormData } from "@/utils/data";

export function handleTransformSubmittedValues(values: SongFormData) {
  const transformedValues = {
    ...values
  };
  return transformedValues;
}

export function handleFormatCreateSong(values: SongFormData) {
  const transformedValues = {
    "@assetType": "song",
    title: values.title,
    album: values.album,
    artists: values.artists,
    explicit: values.explicit
  };
  return transformedValues;
}
