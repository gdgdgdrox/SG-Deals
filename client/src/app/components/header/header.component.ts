import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CurrentUser } from 'src/app/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  currentUser!: CurrentUser;

  constructor(private userService: UserService){}

  ngOnInit(): void{
    this.userService.currentUserSubject$.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  logout(){
    this.userService.logout();
  }
}
