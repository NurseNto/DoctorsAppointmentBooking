import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  
private apiUrl = 'http://localhost:4000/doctors';

  constructor(private http: HttpClient) { }
//create a new patient
  createPatient(doctor: Doctor): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  getAllDoctors(){
    return this.http.get(this.apiUrl)
  }

  getDoctorId(){
    return this.http.get(this.apiUrl + '/id')
  }

}
