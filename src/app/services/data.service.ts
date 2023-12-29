// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'assets/beats/';
  private fileExtension = '.json';

  constructor(private http: HttpClient) { }

  getData(fileName: string): Observable<any> {
    return this.http.get(this.apiUrl + fileName + this.fileExtension);
  }
}
