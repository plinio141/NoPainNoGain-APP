import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  constructor(private http: HttpClient){}

  // login
  login(email: string, password: string){
    return this.http.post<any>(`${environment.apiUrl}/login`, {email, password})
      .pipe(
        map(response => {
          if(response.success){

            localStorage.setItem('currentUser', JSON.stringify(response.token));
          }

          return response;
        })
      );
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}
