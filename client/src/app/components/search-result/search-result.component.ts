import { SearchService } from '../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { Deal } from '../../model';
import { environment } from 'src/app/environments/environment.secret';
import { LocationMapComponent } from '../location-map/location-map.component';



@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{
  dealCategory!: string;
  deals: Deal[] = [];
  dealIDsForSaving: string[] = [];
  searchError: string = '';
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private searchSvc: SearchService, 
    public sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router,
    ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.dealCategory = this.activatedRoute.snapshot.params['category'];
    if (this.dealCategory){
      this.searchSvc.searchDealsByCategory(this.dealCategory)
        .then((data:Deal[]) => {
          this.deals = data
        })
        .catch(error => this.searchError = 'Something went wrong with the search. Please try again later')
        .finally(() => this.isLoading = false)
      }
    else{
      const searchKeyword = this.activatedRoute.snapshot.queryParams['keyword'];
      this.searchSvc.searchDealsByKeyword(searchKeyword)
        .then((data:Deal[]) => this.deals = data)
        .catch(error => this.searchError = 'Something went wrong with the search. Please try again later')
        .finally(() => this.isLoading = false)
      }
    }
    
    ngOnDestroy(): void {
    if (this.userService.currentUser.email && this.dealIDsForSaving.length > 0){
      this.saveDeal(this.userService.currentUser.email, this.dealIDsForSaving);
    }
  }
  
  toggleSave(uuid:string, idx: number) {
    // check if user is login. if not logged in, dont allow them to toggle and direct them to login page instead
    if (!this.userService.currentUser.email){
      this.router.navigate(['/login']);
    }
    else{
      const deal = this.deals[idx];
      deal.saved = !deal.saved
      if (deal.saved) {
        this.dealIDsForSaving.push(deal.uuid);
        this.userService.addDeal(deal.uuid);
      } else {
        const index = this.dealIDsForSaving.findIndex(dealUUID => dealUUID === uuid);
        this.userService.removeDeal(uuid);
        if (index !== -1) {
          this.dealIDsForSaving.splice(index, 1);
        }
      }
    }
  }
  
  saveDeal(email: string, dealIDsForSaving: string[]){
    this.userService.saveUserDeal(email, dealIDsForSaving); 
  }
  
  shareDeal(deal:Deal){
    if (navigator.share) {
      navigator.share({
        title: 'Hey check out this deal',
        text: deal.name,
        url: deal.websiteURL
      })
      .then(() => {
        // console.log('Deal shared successfully');
      })
      .catch((error) => {
        console.error('Failed to share deal:', error);
      });
    } else {
        console.error('Web Share API is not supported in this browser');
      }
    }
    

}