import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class OfficesService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })
  constructor(private http: HttpClient){}

  // findAll
  findAll(city: Number){
    return this.http.get<any>(`${environment.apiUrl}/allOffices/?city=${city}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // register
  register(city: number, code: number, name: string, address: string){
    return this.http.post<any>(`${environment.apiUrl}/offices/new`,{city, code, name, address}, { headers: this.headers })
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public getToken(): string {
    return localStorage.getItem('currentUser');
  }

}