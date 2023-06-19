import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/Auth.service';
import { AppointmentService } from 'src/app/_services/appointment.service';
import { DoctorsService } from 'src/app/_services/doctors.service';
import { PatientService } from 'src/app/_services/patient.service';
import { Appointment } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointment!: Appointment;
  appointmentForm!: FormGroup;
  loggedInPatient: number = 0;
  doctorIdFromDatabase: number | undefined;
  

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorsService, private patientService: PatientService, private authService:AuthService, private formBuilder: FormBuilder) { 
    
  }

   

  ngOnInit() {
    this.authService.getLoggedInPatient().subscribe(
     async patientId => {
        this.loggedInPatient = patientId;
        console.log('Logged-in Patient ID:', this.loggedInPatient);
        await this.loadDoctorIdFromDatabase();
        this.initializeForm();
      },
      (error) => {
        console.log('Error retrieving patient ID:', error);
      }
    ); 
}

initializeForm() {
  this.appointmentForm = this.formBuilder.group({
    appointment_time: ['', Validators.required],
    appointment_date: ['', Validators.required],
    doctor_id: [this.doctorIdFromDatabase || '', Validators.required],
    patient_id: [isNaN(this.loggedInPatient) ? '' : this.loggedInPatient, Validators.required],
    notes: ''
  });
}

async loadDoctorIdFromDatabase() {
  try {
    this.doctorIdFromDatabase = await this.appointmentService.getDoctorIdFromDatabase().toPromise();
    this.appointmentForm.get('doctor_id')?.setValue(this.doctorIdFromDatabase);
  } catch (error) {
    console.error('Failed to load doctor_id:', error);
    // Handle error case
  }
}


bookAppointment() {
  if (this.appointmentForm.invalid) {
    // Handle form validation errors
    return;
  }

  this.appointmentService.createAppointment(this.appointmentForm.value).subscribe(
    response => {
      console.log('Appointment created successfully:', response);
      window.location.reload();
  });
}

}
