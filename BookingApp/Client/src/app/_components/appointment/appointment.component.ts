import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/_services/Auth.service";
import { AppointmentService } from "src/app/_services/appointment.service";
import { DoctorsService } from "src/app/_services/doctors.service";
import { PatientService } from "src/app/_services/patient.service";
import { Appointment } from "src/app/models/appointment";
import { Doctor } from "src/app/models/doctor";
import { Patient } from "src/app/models/patient";
import { DatePipe } from "@angular/common";
import { SessionService } from "src/app/_services/session.service";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"],
})
export class AppointmentComponent implements OnInit {
  appointment!: Appointment;
  appointmentForm!: FormGroup;
  loggedInPatient: number = 0;
  doctorIdFromDatabase: number | undefined;
  patientIdFromDatabase: number | undefined;
  user!: any;
  doctorID!: number;

  exampleDoctor = 
  {doctorID3 : 8}


  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorsService,
    private patientService: PatientService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private session: SessionService
  ) {}

  ngOnInit() {
    // Retrieve the user data from session storage
    this.user = this.session.getLoggedUser();
    JSON.stringify(this.user)
    console.log('user got - ' + this.user);
    
    // check if the user variable contains valid user data before initializing the form
    if (this.user && Object.keys(this.user).length > 0){
   
      this.initializeForm();
      console.log('Form initialized');
      
          // Use JSON.stringify() to log the user object properties
    console.log('User data:', JSON.stringify(this.user, null, 2));
    } else{
      console.log('User data not found in session');
    }
    
  }

  initializeForm() {
    this.appointmentForm = this.formBuilder.group({
      appointment_time: ["", Validators.required],
      appointment_date: ["", Validators.required],
      doctor_id: [this.exampleDoctor.doctorID3, Validators.required],
      patient_id: [this.user.patient_id, Validators.required],
      notes: "",
    });

  }

  bookAppointment() {

    console.log('bookAppointment function called');

    if (this.appointmentForm.invalid) {
      // Handle form validation errors
      return;
    }

    this.appointmentService
      .createAppointment(this.appointmentForm.value)
      .subscribe((response) => {
        console.log("Appointment created successfully:", response);
       // window.location.reload();
      });
  }
}
