import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Credentials, CurrentUser, Deal, NewUser } from '../model';
import { environment } from '../environments/environment';
import { AppConstants } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: CurrentUser = {email:'',password:''}
  currentUserSubject$: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>({email: '',password:''});
  dealIDsForSaving: string[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  addDeal(uuid: string){
    this.dealIDsForSaving.push(uuid);
  }

  removeDeal(uuid: string){
    const index = this.dealIDsForSaving.findIndex(dealUUID => dealUUID === uuid);
    if (index !== -1) {
      this.dealIDsForSaving.splice(index, 1);
    }
  }

  saveUserDeal(email: string, dealIDsForSaving: string[]){
    const headers = new HttpHeaders(this.currentUser ? { authorization : 'Basic ' + btoa(this.currentUser.email + ':' + this.currentUser.password)} : {});
    const payload = {
      email: email,
      dealIDs: dealIDsForSaving
    };
    // this.http.post(AppConstants.SAVE_USER_DEAL_API, payload, {headers})

    this.http.post(environment.rooturl + AppConstants.SAVE_USER_DEAL_API, payload, {headers})
    .subscribe({
      next: (resp:any) => {
        console.log(resp);
    }, error: err => {
        // console.log(err);
    }});
  }

  getUserDeal(email: string){
    const headers = new HttpHeaders(this.currentUser ? { authorization : 'Basic ' + btoa(this.currentUser.email + ':' + this.currentUser.password)} : {});
    // return this.http.get<Deal[]>(AppConstants.GET_USER_DEAL_API, {headers});

    return this.http.get<Deal[]>(environment.rooturl + AppConstants.GET_USER_DEAL_API, {headers});
  }


  deleteUserDeal(dealID: string) {
    // const url = AppConstants.DELETE_USER_DEAL_API + '/' + dealID;

    const url = environment.rooturl + AppConstants.DELETE_USER_DEAL_API + '/' + dealID;
    const headers = new HttpHeaders(this.currentUser ? { authorization : 'Basic ' + btoa(this.currentUser.email + ':' + this.currentUser.password)} : {});
    
    return firstValueFrom(this.http.delete(url, {headers}));
  }

  logout(){
    if (this.currentUser.email && this.dealIDsForSaving.length > 0){
      this.saveUserDeal(this.currentUser.email, this.dealIDsForSaving);
    }
    this.currentUser = {email:'',password:''};
    this.currentUserSubject$.next({email:'',password:''});
    this.router.navigate(['/']);
  }
  
}
