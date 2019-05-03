import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class CitiesService {
  
  headers = new HttpHeaders({    
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.getToken()
  })

  constructor(private http: HttpClient){}

  // findAll
  findAll(){
    return this.http.get<any>(`${environment.apiUrl}/allCities`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // register
  register(code: string, name: string){
    return this.http.post<any>(`${environment.apiUrl}/cities/new`, {code, name}, { headers: this.headers })
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public getToken(): string {
    console.log(localStorage.getItem('currentUser'));
    return localStorage.getItem('currentUser');
  }
}