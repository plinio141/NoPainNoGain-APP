import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class ClientsService {
  constructor(private http: HttpClient){}

  // register
  register(email: string, password: string, firstName: string, lastName: string, office: Number){
    return this.http.post<any>(`${environment.apiUrl}/register`, {email, password, firstName, lastName, office})
      .pipe(
        map(response => {
          console.log(response);
          
          return response;
        })
      );
  }
  public getToken(): string {
    return localStorage.getItem('currentUser');
  }

}