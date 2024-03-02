import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'assets/';
  private fileExtension = '.json';

  constructor(private http: HttpClient) {
  }

  getData<T>(fileName: string, folder: string | undefined = undefined): Observable<T> {
    let url = this.apiUrl;
    if (folder)
      url += folder;
    url += fileName + this.fileExtension;
    return this.http.get<T>(url);
  }
}
