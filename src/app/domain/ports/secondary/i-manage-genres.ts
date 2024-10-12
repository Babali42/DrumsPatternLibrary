import { Observable } from "rxjs"
import {Genre} from "../../genre";

export default interface IManageGenres {
  getGenres(): Observable<Genre[]>
}
