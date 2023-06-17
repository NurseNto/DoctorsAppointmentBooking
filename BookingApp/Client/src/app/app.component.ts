import { Component } from '@angular/core';
import { AuthService } from './_services/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Appointment';
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.auth.logout();
  }
}
