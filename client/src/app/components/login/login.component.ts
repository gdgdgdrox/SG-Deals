import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Credentials, CurrentUser } from '../../model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: Credentials = { email: '', password: '' };;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private loginService: LoginService, private userService: UserService){}

  login(form: NgForm){
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.loginService.login(this.credentials).then((resp:CurrentUser) => {
      if (resp.email === this.credentials.email){
        setTimeout(() => {
          this.userService.currentUser = this.credentials;
          this.userService.currentUserSubject$.next(this.credentials);
          this.isLoading=false;
          this.successMessage = 'Successfully logged in!';
          this.errorMessage = '';
        }, 2*1000);
      }
    })
    .catch(error => {
      if (error.status === 401){
        setTimeout(()=>{
          this.isLoading=false;
          this.errorMessage = 'Invalid username or password';
        },2*1000)
      }
    })
  }
}
