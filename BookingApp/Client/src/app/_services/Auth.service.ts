import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

 // private apiUrl = 'http://localhost:4000';
  private apiUrl = 'https://bookingbe-tjw1.onrender.com';

  constructor(private http: HttpClient) { }

  register(patient: Patient): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients`, patient);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/patient/auth`, credentials);
  }

  getLoggedInPatient(): Observable<number> {
    // Make an API call to retrieve the logged-in patient ID
    return this.http.get<number>(`${this.apiUrl}/patients/:id`);
  }

  login2() {
    // Perform login logic
    this.isLoggedInSubject.next(true);
  }

  logout() {
    // Perform logout logic
    this.isLoggedInSubject.next(false);
  }

}
