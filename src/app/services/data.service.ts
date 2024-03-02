import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JsonBeat} from "../models/primary/jsonBeat";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'assets/beats/';
  private fileExtension = '.json';

  constructor(private http: HttpClient) { }

  getData(fileName: string): Observable<JsonBeat> {
    let url = this.apiUrl + fileName + this.fileExtension;
    console.log(url);
    return this.http.get<JsonBeat>(url);
  }
}
