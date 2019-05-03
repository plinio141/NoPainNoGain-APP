import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class ClientsService {
  constructor(private http: HttpClient){}

  headers = new HttpHeaders({    
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.getToken()
  })

  // register
  register(email: string, password: string, firstName: string, lastName: string, office: number){
    return this.http.post<any>(`${environment.apiUrl}/register`, {email, password, firstName, lastName, office})
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // register
  search(codeCity: number, codeOffice: number){
    return this.http.get<any>(`${environment.apiUrl}/users/search/?codeCity=${codeCity}&codeOffice=${codeOffice}`, {headers: this.headers})
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