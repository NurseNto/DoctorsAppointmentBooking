import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from 'src/app/_services/patient.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fb!: FormGroup;
  patient!: Patient;
  name!: string;
  email!: string;
  password!: string;
  date_of_birth!: Date;
  gender: any;
  contact_number: any;
  address?: string;
  medical_history?: string;
  medicalAidNumber?: string;
  medicalAidName?: string;
  notes?: string;


  constructor(private patientService:PatientService) { }

  ngOnInit() {
    this.fb = new FormGroup ({
      name : new FormControl(null, [Validators.required, Validators.min(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.min(8), this.passwordValidator]),
      date_of_birth: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl(null, [Validators.required, Validators.email]),
      contact_number: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, [Validators.required, Validators.email]),
      medical_history: new FormControl(null, [Validators.required, Validators.email]),
      medicalAidName: new FormControl(null, [Validators.required, Validators.email]),
      medicalAidNumber: new FormControl(null, [Validators.required, Validators.email]),
      notes: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  passwordValidator(): Validators {
    return (control: FormControl) => {
      const value: string = control.value;
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasLetter = /[a-zA-Z]/.test(value);
  
      if (!hasSymbol || !hasNumber || !hasLetter) {
        return { invalidPassword: true };
      }
  
      return null;
    };
  }

  onSubmit(){
    this.registerPatient();
  }

  registerPatient(){
    if(this.fb.valid) {
      this.patientService.createPatient(this.patient).subscribe(res=>{
        this.patient = res;
      });
    }
  }

}
