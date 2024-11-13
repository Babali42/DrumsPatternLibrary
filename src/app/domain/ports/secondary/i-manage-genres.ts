import {Genre} from "../../genre";

export default interface IManageGenres {
  getGenres(): Promise<Genre[]>
}
