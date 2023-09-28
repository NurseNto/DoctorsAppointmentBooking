import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { AppointmentComponent } from './_components/appointment/appointment.component';
import { HomeComponent } from './_components/home/home.component';
import { BookingsComponent } from './_components/bookings/bookings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'appoint', component:AppointmentComponent},
  { path: '', component: HomeComponent},
  { path: 'home', component: BookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
