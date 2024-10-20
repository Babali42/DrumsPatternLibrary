import {catchError, Observable, throwError} from "rxjs";
import { Beat } from "src/app/domain/beat";
import {IManageBeats} from "../../domain/ports/secondary/i-manage-beats";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BeatsAdapterService implements IManageBeats {
  private heroesUrl = 'api/beats';  // URL to web api

  constructor(private http: HttpClient) { }

  getBeat(name: string): Observable<Beat> {
    const url = `${this.heroesUrl}/${name}`;
    return this.http.get<Beat>(url).pipe(
      catchError(this.handleHttpError())
    );
  }

  private handleHttpError() {
    return (error: any): Observable<any> => {
      throw new Error(error.body.error);
    };
  }
}
