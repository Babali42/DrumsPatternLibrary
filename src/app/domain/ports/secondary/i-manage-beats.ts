import {Observable} from "rxjs";
import {Beat} from "../../beat";

export interface IManageBeats {
  getBeat(name: string): Observable<Beat>
}
