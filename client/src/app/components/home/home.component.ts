import { SearchService  } from 'src/app/services/search.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private searchSvc: SearchService, private router: Router){}

  searchByCategory(category: string){
    this.router.navigate(['deals', `${category}`]);
}

  searchByKeyword(form: NgForm){
    const keyword = form.value.keyword;
    this.router.navigate(['deals'], {queryParams : {keyword}});
  }
}
