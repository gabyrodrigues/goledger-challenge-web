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
