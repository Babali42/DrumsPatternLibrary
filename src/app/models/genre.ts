import {Subgenre} from "./subgenre";

export class Genre {
  constructor(public label: string, public subGenres: Subgenre[]) {
  }
}
