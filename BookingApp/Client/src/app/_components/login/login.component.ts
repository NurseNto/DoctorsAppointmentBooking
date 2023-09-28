import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/Auth.service';
import { SessionService } from 'src/app/_services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  email!: string;
  

  constructor(private auth:AuthService, private formB: FormBuilder, private router: Router, private session: SessionService) { 
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
      this.router.navigate(['/home']);
      console.log("success" + res);
      this.session.saveLoggedUser(res);
      
     })

     
      // Perform login API call or other logic here
      }
  }


}
