import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from '../models/appointment';
import { Patient } from '../models/patient';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:4000/appointments';

  constructor(private http: HttpClient) { }

  createAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }

  getDoctorIdFromDatabase(): Observable<number> {
    // Replace the URL with your actual API endpoint to retrieve the doctor_id
    const apiUrl = 'http://localhost:4000/doctors/:id';
  
    return this.http.get<number>(apiUrl);
  }

  getLoggedInPatient(): Observable<Patient | undefined> {
    // Replace the below lines with your actual implementation to retrieve the logged-in patient
    // Make sure to return an observable with the patient object or undefined if not logged in

    // Example implementation:
    const isLoggedIn = true; // Replace with your actual logic to check if the patient is logged in

    if (isLoggedIn) {
      const patient: Patient = {
        id: 1,
        name: '',
        email: '',
        password: '',
        date_of_birth: new Date,
        gender: '',
        contact_number: ''
      }; // Replace with actual patient object
      return of(patient);
    } else {
      return of(undefined);
    }
  }

}
