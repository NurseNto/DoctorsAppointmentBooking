import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //private apiUrl = 'http://localhost:4000/patients';
  private apiUrl = 'https://bookingbe-tjw1.onrender.com';

  constructor(private http: HttpClient) { }
//create a new patient
  createPatient(patient: Patient): Observable<any> {
    return this.http.post(this.apiUrl, patient);
  }

  getPatientByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/email/${email}`);
  }

  getPatients(){
    return this.http.get(this.apiUrl)
  }

  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/user/update_profile/${id}`)
  }

}
