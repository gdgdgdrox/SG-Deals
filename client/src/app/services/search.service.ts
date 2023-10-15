import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { Deal } from '../model';
import { environment } from '../environments/environment';
import { AppConstants } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  onSearch$ = new Subject<any>();
  
  constructor(private httpClient: HttpClient) { }

  searchDealsByCategory(category: string): Promise<Deal[]>{
    const headers = new HttpHeaders().set('accept', 'application/json');
    // return firstValueFrom(this.httpClient.get<Deal[]>(AppConstants.DEALS_API_URL +  '/' + category, {headers}));

    return firstValueFrom(this.httpClient.get<Deal[]>(environment.rooturl + AppConstants.DEALS_API_URL +  '/' + category, {headers}));
  }
  
  searchDealsByKeyword(keyword: string): Promise<Deal[]>{
    const headers = new HttpHeaders().set('accept', 'application/json');
    // return firstValueFrom(this.httpClient.get<Deal[]>(AppConstants.DEALS_API_URL, {headers, params: {keyword}}));

    return firstValueFrom(this.httpClient.get<Deal[]>(environment.rooturl + AppConstants.DEALS_API_URL, {headers, params: {keyword}}));

  }
}

