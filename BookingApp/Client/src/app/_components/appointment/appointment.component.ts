import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/Auth.service';
import { AppointmentService } from 'src/app/_services/appointment.service';
import { DoctorsService } from 'src/app/_services/doctors.service';
import { PatientService } from 'src/app/_services/patient.service';
import { Appointment } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';



@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointment!: Appointment;
  appointmentForm!: FormGroup;
  loggedInPatient!: number;
  doctorIdFromDatabase: number | undefined;
  

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorsService, private patientService: PatientService, private authService:AuthService, private formBuilder: FormBuilder) { 
    
  }

   

  ngOnInit() {
    //this.loggedInPatient = this.authService.getLoggedInPatient();

    this.authService.getLoggedInPatient().subscribe(
      (patientId: number) => {
        this.loggedInPatient = patientId;
        console.log('Logged-in Patient ID:', this.loggedInPatient);
      },
      (error) => {
        console.log('Error retrieving patient ID:', error);
      }
    );
  
    this.loadDoctorIdFromDatabase(); // Load the doctor_id from the database

    this.appointmentForm = this.formBuilder.group({
      appointment_time: ['', Validators.required],
      appointment_date: ['', Validators.required],
      doctor_id: [this.doctorIdFromDatabase || '', Validators.required],
      patient_id: [this.loggedInPatient || '', Validators.required]
    });
   
}

loadDoctorIdFromDatabase() {
  // Call the appropriate service method to get the doctor_id from the database
  // Assign the retrieved doctor_id to the `doctorIdFromDatabase` property
  // You can use a service method like `getDoctorIdFromDatabase()` or any other approach to fetch the doctor_id

  // Example implementation:
  this.appointmentService.getDoctorIdFromDatabase().subscribe(
    (doctorId) => {
      this.doctorIdFromDatabase = doctorId;
    },
    (error) => {
      console.error('Failed to load doctor_id:', error);
      // Handle error case
    }
  );
}


bookAppointment() {
  if (this.appointmentForm.invalid) {
    // Handle form validation errors
    return;
  }

  this.appointmentService.createAppointment(this.appointmentForm.value).subscribe(
    (response) => {
      console.log('Appointment created successfully:', response);
      // Optionally, perform any additional actions after successful creation
    },
    (error) => {
      console.error('Failed to create appointment:', error);
      // Handle error case
    }
  );
}



}
