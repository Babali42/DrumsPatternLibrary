import {SubGenre} from "./sub-genre";

export interface Genre {
  label: string;
  subGenres: SubGenre[];
}
