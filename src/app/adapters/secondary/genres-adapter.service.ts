import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';
import IManageGenres from "../../domain/ports/secondary/i-manage-genres";
import {Genre} from "../../domain/genre";

@Injectable({ providedIn: 'root' })
export class GenresAdapterService implements IManageGenres {

  private heroesUrl = 'api/genres';  // URL to web api

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.heroesUrl).pipe(
      catchError(this.handleHttpError())
    );
  }

   private handleHttpError() {
    return (error: any): Observable<any> => {
      throw new Error(error.body.error);
    };
  }
}
