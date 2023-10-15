import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CurrentUser, NewUser } from '../../model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  maxDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private registrationService: RegistrationService){}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(){
    return this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
      receiveUpdate: new FormControl(false)
    })
  }

  register(){
    this.isLoading = true;
    const user = this.form.value as NewUser;
    this.registrationService.register(user)
      .then(response => {
        if (response.email === user.email){
          setTimeout(() => {
            const currentUser = {email: user.email, password:user.password};
            this.userService.currentUser = currentUser
            this.userService.currentUserSubject$.next(currentUser);
            this.isLoading=false;
            this.successMessage = 'Account was successfully created!'
            this.errorMessage = '';
          },2*1000)
        }
      })
      .catch(error => {
        console.log('error:',error);
        setTimeout(() => {
          this.isLoading=false;
          this.errorMessage = error.error.message;
        }, 2*1000)
      });
  }

}
  


