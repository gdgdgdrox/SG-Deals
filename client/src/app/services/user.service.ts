import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Credentials, Deal, NewUser } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  loggedInUserEmail = '';
  onUser = new Subject<string>();
  dealIDsForSaving: string[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  register(newUser: NewUser){
    return firstValueFrom(this.http.post<any>('http://localhost:8080/api/user/register', newUser));
  }

  login(credentials: Credentials){
    return firstValueFrom(this.http.post<any>('http://localhost:8080/api/user/login', credentials));
  }

  logout(){
    this.isLoggedIn = false;
    this.loggedInUserEmail = '';
    this.router.navigate(['/']);
  }

  getLoggedInUserEmail(){
    return this.loggedInUserEmail;
  }
  
  addDeal(uuid: string){
    this.dealIDsForSaving.push(uuid);
  }

  removeDeal(uuid: string){
    console.log('in remove deal function');
    const index = this.dealIDsForSaving.findIndex(dealUUID => dealUUID === uuid);
    if (index !== -1) {
      console.log(`found deal ${uuid} to delete`);
      this.dealIDsForSaving.splice(index, 1);
      console.log(this.dealIDsForSaving.length);
    }
  }

  saveUserDeal(email: string, dealIDsForSaving: string[]){
    const payload = {
      email: email,
      dealIDs: dealIDsForSaving
    };
    this.http.post('http://localhost:8080/api/user/deal/save', payload).subscribe({
      next: (resp:any) => {
        console.log(resp);
    }, error: err => {
        console.log(err);
    }});
  }

  getUserDeal(email: string){
    return this.http.post<Deal[]>('http://localhost:8080/api/user/deal/get', {email});
  }


  deleteUserDeal(email: string, dealID: string) {
    const url = 'http://localhost:8080/api/user/deal/delete';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        email,
        dealID,
      },
    };
    return firstValueFrom(this.http.delete(url, options));
  }
  
}
