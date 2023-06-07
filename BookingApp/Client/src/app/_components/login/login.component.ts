import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  

  constructor(private auth:AuthService, private formB: FormBuilder, private router: Router) { 
    this.loginForm = this.formB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      });
  }

  ngOnInit() {
    this.onLogin()
  }

  onLogin(){
    if (this.loginForm.valid) {
      // Form is valid, perform login logic
     this.auth.login(this.loginForm.value).subscribe(res=>{
      this.router.navigate(['/appoint']);
      console.log("success");
      
     })
      // Perform login API call or other logic here
      }
  }


}
