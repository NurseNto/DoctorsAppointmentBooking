import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/_services/appointment.service';
import { SessionService } from 'src/app/_services/session.service';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
editAppointment(_t6: any) {
throw new Error('Method not implemented.');
}
deleteAppointment(_t6: any) {
throw new Error('Method not implemented.');
}
  user!: any;
  bookings: any;

  constructor(private appointments: AppointmentService, private session: SessionService                                                     ) { }

  ngOnInit() {

      // Retrieve the user data from your authentication service
      this.user = this.session.getLoggedUser();

      if (this.user && this.user[0] && this.user[0].id) {
        // User data is available and contains 'patient_id'
        console.log(this.user);
    
        // Fetch appointments for the user
        this.loadAppointments();
      } else {
        console.error('User data or patient_id is missing.');
      }


  }

  loadAppointments() {
    // this.appointments.getAppointments(this.user[0].patient_id).subscribe((response) => {
    //   this.bookings = response;
    //   console.log(response);
      
    // });


    const patientId = this.user[0].id;
    console.log('Patient ID:', patientId); // Log patient_id

    if (this.user && this.user[0] && this.user[0].id) {
      // Fetch appointments for the user
      this.appointments.getAppointments(this.user[0].id).subscribe(
        (response) => {
          this.bookings = response;
          console.log(response);
        },
        (error) => {
          console.error('Error loading appointments:', error);
        }
      );
    } else {
      console.error('User data or patient_id is missing.');
    }
  }
  }

