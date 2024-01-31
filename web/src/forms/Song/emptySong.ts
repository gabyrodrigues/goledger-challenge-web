import { EmptyFormSong } from "@/utils/data";

export const EMPTY_SONG: EmptyFormSong = {
  "@key": "",
  "@assetType": "song",
  title: "",
  album: {
    "@assetType": "album",
    "@key": ""
  },
  artists: [],
  explicit: false
};
