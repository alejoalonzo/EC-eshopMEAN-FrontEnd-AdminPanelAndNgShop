import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageServiceService } from '../../services/local-storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  isSubmitted=false;
  authError=false;
  errorMessageLogin='Ops! The Email or Password are wrong'
  loginFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthenticationService, 
    private localStorageServiceService: LocalStorageServiceService,
    private router: Router  
  ) {
  }

  ngOnInit(): void {
    this._initLoginForm();
  }
  private _initLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }
  onSubmmit(){
    this.isSubmitted=true;
    const loginData = {
      email: this.loginForm['email'].value,
      password: this.loginForm['password'].value,
    }
    if(this.loginFormGroup.invalid){
      return;
    }else{
        this.authService.login(loginData.email, loginData.password).subscribe((user)=>{
          this.authError=false;
          this.localStorageServiceService.setToken(user.token)
          this.router.navigate(['/'])
          //console.log(user)
        },(error: HttpErrorResponse)=>{
          console.log(error)
          this.authError=true 
          if(error.status !== 400){
            this.errorMessageLogin = "Error in the server, please try againg later."
          }
        })
    }
  }
}
