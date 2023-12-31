import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CurrentUser, Deal } from '../../model';

@Component({
  selector: 'app-saved-deals',
  templateUrl: './saved-deals.component.html',
  styleUrls: ['./saved-deals.component.css']
})
export class SavedDealsComponent implements OnInit{
  currentUser!: CurrentUser;
  userDeals: Deal[] = [];
  deleteErrorMessage = '';
  isLoading = true;

  constructor(
    private http: HttpClient, 
    private userService: UserService,
    public sanitizer: DomSanitizer,
    private router: Router
    ){}

  ngOnInit(): void{
    this.currentUser = this.userService.currentUser;
    setTimeout(() => this.getUserDeal(this.currentUser.email) ,3*1000)
  }

  getUserDeal(email: string){
    this.userService.getUserDeal(email).subscribe({
      next: (resp) => {
        this.userDeals = resp;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    })
  }

  deleteDeal(uuid: string){
    this.userService.removeDeal(uuid);
    this.userService.deleteUserDeal(uuid)
    .then(resp => {
        this.userDeals = this.userDeals.filter(deal => deal.uuid !== uuid);
      })
    .catch(error => {
      this.deleteErrorMessage = error.message;
    });
    
  }
}
