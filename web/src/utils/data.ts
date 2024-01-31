export type AssetType = "artist" | "album" | "playlist" | "song";

export interface IdRef {
  "@assetType": string;
  "@key": string;
}

export interface Song {
  "@key": string;
  title: string;
  explicit: boolean;
  artists: IdRef[];
  album: IdRef;
}

export interface Album {
  "@key": string;
  title: string;
  artist: IdRef;
  rating: number;
  releaseDate: string;
  songs: IdRef[];
}

export interface Artist {
  "@key": string;
  name: string;
  about: string;
}

export interface Playlist {
  "@key": string;
  name: string;
  description: string;
  songs: IdRef[];
}

export interface ArtistFormData extends Artist {
  "@assetType": "artist";
}
export interface EmptyFormArtist extends Partial<ArtistFormData> {}
export interface CreateAnArtist extends Omit<Artist, "@key"> {}
export interface UpdateAnArtist extends Partial<ArtistFormData> {}

export interface AlbumFormData extends Omit<Album, "songs"> {
  "@assetType": "album";
}
export interface EmptyFormAlbum extends Partial<AlbumFormData> {}
export interface CreateAnAlbum extends Omit<Album, "@key" | "songs"> {}
export interface UpdateAnAlbum extends Partial<AlbumFormData> {}
