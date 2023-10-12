import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Deal } from '../model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  onSearch = new Subject<any>();
  
  constructor(private httpClient: HttpClient) { }

  searchDealsByCategory(category: string){
    console.log('searching deals by category');
    const headers = new HttpHeaders().set('accept', 'application/json');
    this.httpClient.get<Deal[]>(`http://localhost:8080/api/deals/${category}`, {headers}).subscribe({
      next: (data) => {
        this.onSearch.next(data);
      },
      error: (error) => this.onSearch.next(error),
    });
  }
  
  searchDealsByKeyword(keyword: string){
    console.log('searching deals by keyword');
    const headers = new HttpHeaders().set('accept', 'application/json');
    this.httpClient.get<Deal[]>(`http://localhost:8080/api/deals`, {headers, params: {keyword}}).subscribe({
      next: (data) => {
        this.onSearch.next(data);
      },
      error: (error) => this.onSearch.next(error)
    });
  }
}

