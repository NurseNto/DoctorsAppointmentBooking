import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/_services/appointment.service';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointment!: Appointment;
  doctors =  ['GP', 'Dentist'];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    
  }

  bookAppointment() {
    this.appointmentService.createAppointment(this.appointment)
      .subscribe(
        response=> {
          console.log('Appointment booked:', response);
          // Redirect to the appointments list or display a success message
        },
        (error) => {
          console.error('Appointment booking failed:', error);
          // Display an error message
        }
      );
  }


}
