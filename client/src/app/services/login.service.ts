import { Injectable } from '@angular/core';
import { Credentials, CurrentUser } from '../model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { AppConstants } from '../constants/app.constants';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Promise<CurrentUser>{
    const headers = new HttpHeaders(credentials ? { authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.password)} : {});
    // return firstValueFrom(this.http.get<Credentials>(AppConstants.LOGIN_API_URL, {headers}));

    return firstValueFrom(this.http.get<Credentials>(environment.rooturl + AppConstants.LOGIN_API_URL, {headers}));
  }

  
}
