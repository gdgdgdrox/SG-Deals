import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from '../model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { AppConstants } from '../constants/app.constants';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(newUser: NewUser){
    // return firstValueFrom(this.http.post<any>(AppConstants.REGISTER_API_URL, newUser));

    return firstValueFrom(this.http.post<any>(environment.rooturl + AppConstants.REGISTER_API_URL, newUser));
  }
}
