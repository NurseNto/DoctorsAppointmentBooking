import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/Auth.service';
import { AppointmentService } from 'src/app/_services/appointment.service';
import { DoctorsService } from 'src/app/_services/doctors.service';
import { PatientService } from 'src/app/_services/patient.service';
import { Appointment } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  public datePickerConfig!: Partial<BsDatepickerConfig>;
  doctors!: Doctor; // Array to hold the list of doctors
  patients!: Patient;
  
  view: string = 'month';
  viewDate: Date = new Date();
  appointmentEvents: CalendarEvent[] = []; 

  appointment!: Appointment;
  doctor_id: any;
  rememberMe: any;
  loggedInPatientId!: any;
  appointmentForm!: FormGroup;
  currentUser: any;
  currentDoctor: any;
  dateTime3!: Date;
  patient_id: any;
  //doctors =  ['GP', 'Dentist'];

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorsService, private patientService: PatientService, private authService:AuthService, private formBuilder: FormBuilder) { 
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-custom',
      showWeekNumbers: false
      // Add more configuration options as needed
    });
  }

   

  ngOnInit() {
    this.loadDoctors();
    this.loadPatients();
  this.loggedInPatientId = this.authService.getLoggedInPatientId();
  // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // this.currentDoctor = JSON.parse(localStorage.getItem('currrentDoctor'));

const doctorIdFromStorage = localStorage.getItem('currentDoctor');
this.patient_id = doctorIdFromStorage !== null ? JSON.parse(doctorIdFromStorage) : '';

const patientIdFromStorage = localStorage.getItem('currentPatient');
this.patient_id = patientIdFromStorage !== null ? JSON.parse(patientIdFromStorage) : '';


  this.appointmentForm = this.formBuilder.group({
    appointment_time: ['', Validators.required],
    appointment_date: ['', Validators.required],
    doctor: ['', Validators.required],
    // Add other form fields as needed
  });
  }

  loadDoctors(): void {
    // Call the service to retrieve the list of doctors from the database
    this.doctorService.getAllDoctors().subscribe(
      data=>{
       console.log(data);
       const user = { doctor_id: this.doctor_id, rememberMe: this.rememberMe };
       localStorage.setItem('currentDoctor', JSON.stringify(user));
       
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadPatients(): void {
    // Call the service to retrieve the list of patients from the database
    this.patientService.getPatients().subscribe(
          data => {
      console.log(data); 
      const user = { patient_id: this.patient_id, rememberMe: this.rememberMe };
       localStorage.setItem('currentPatient', JSON.stringify(user)); 
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  bookAppointment() {

    // const appointment = {
    //   appointment_time: this.appointmentForm.get('appointment_time').value,
    //   appointment_date: this.appointmentForm.get('appointmentDate').value,
    //   doctorId: this.doctor_id
    //   patient_id = this.patient_id

    // };

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

  onSubmit() {
    // Access the selected date and time value
    console.log(this.dateTime3);
    // Perform other actions with the selected date and time
  }



}
