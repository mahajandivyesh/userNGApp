import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  canLogin=true;
  userRegisterForm = this.fb.group({
    name:['',[Validators.required]],
    email:['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]],
    confirmPassword : ['', [Validators.required]],
    address:['',[Validators.required]],
    phNum:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  },
  {
    validator: MustMatch('password', 'confirmPassword')
  });
  userLoginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]],
   
  });  
  constructor(private fb:FormBuilder){

  }

  get loginForm(){
    return this.userLoginForm.controls;
  }

  get registerForm(){
    return this.userRegisterForm.controls;
  }
  registerUser(){
    this.canLogin = false;
  }

  loginUser(){
    this.canLogin = true;
  }


  onSubmitLogin(){
    console.log(this.userLoginForm.value);
  }

  onSubmitReg(){
    console.log(this.userRegisterForm.value);
  }

  resetLogin(){
    this.userLoginForm.reset();
  }

  resetRegister(){
    this.userRegisterForm.reset();
  }
}
export function  MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
