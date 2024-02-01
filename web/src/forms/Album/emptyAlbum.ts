import { EmptyFormAlbum } from "@/utils/data";
import dayjs from "dayjs";

export const EMPTY_ALBUM: EmptyFormAlbum = {
  "@key": "",
  "@assetType": "album",
  title: "",
  artist: {
    "@assetType": "artist",
    "@key": ""
  },
  releaseDate: dayjs().startOf("day").format(),
  rating: null
};
