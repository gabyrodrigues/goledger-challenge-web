import { EmptyFormAlbum } from "@/utils/data";

export const EMPTY_ALBUM: EmptyFormAlbum = {
  "@key": "",
  "@assetType": "album",
  title: "",
  artist: {
    "@assetType": "artist",
    "@key": ""
  },
  releaseDate: "",
  rating: 10
};
