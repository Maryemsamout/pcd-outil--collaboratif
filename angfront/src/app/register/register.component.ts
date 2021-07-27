import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../Services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  //name = "";
  //hide = true;
  selected: string="";
  nivValue:string="";
  three: any = ["II1","II2","II3"];


  etudiant = {
      cin: '',
      fullname:'',
      email: '',
      birthDate:'',
      password:'',
      level: 'II2'
  }
  submitted = false;
  constructor(private formBuilder: FormBuilder, private api: ServiceService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullname: ['', [Validators.required, UsernameValidator.notContainSpace]],
        dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
        password: ['', Validators.required],
        repassword: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@ensi-uma.tn')]],
        cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
      },
      { validator: ConfirmedValidator('password', 'repassword') }


    );

  }

  radioChangeHandler(event: any) {
    this.selected = event.target.value;
    this.nivValue = event.target.value;
    this.etudiant.level=this.selected;
  }
  saveEtudiant(): void {
    const data = {
      cin: this.etudiant.cin,
      fullname:this.etudiant.fullname,
      email: this.etudiant.email,
      birthDate:this.etudiant.birthDate,
      password:this.etudiant.password,
      level: this.etudiant.level,

    };
    this.api.addEtudiant(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved ! Now login for more informations',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        });
  }

   get data() { return this.registerForm.controls; }

  onSubmit() {

    // const data = {
    //   cin: this.registerForm.controls.cin.value ,
    //   fullname: this.registerForm.controls.fullname.value ,
    //   email: this.registerForm.controls.email.value,
    //   dob: this.registerForm.controls.dob.value ,
    //   password : this.registerForm.controls.password.value,
    //   level:"II2"
    // };

    // this.api.addEtudiant(data)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.submitted = true;
    //     },
    //     error => {
    //       console.log(error);
    //     });

    // let data = this.registerForm.value;
    // let student = new Etudiant(data.firstname,data.cin,data.dob,data.email,data.password);

    // this.api.addEtudiant(student).subscribe(
    //   result => {
    //     console.log(result);
    //     this.router.navigate(['/login'])
    //   }, error => console.log(error)
    // );


    // let EtudiantToAdd ={
    //   cin: this.registerForm.controls.cin.value ,
    //   fullname: this.registerForm.controls.fullname.value ,
    //   email: this.registerForm.controls.email.value,
    //   birthdate: this.registerForm.controls.dob.value ,
    //   password : this.registerForm.controls.password.value,
    //   level:"II2"
    //     }
    //   this.api.addEtudiant(EtudiantToAdd).subscribe( data => {
    //   this._snackBar.open('Register Successfully', 'Success', {
    //     duration: 2000,
    //   });
    //   this.router.navigate(['/login']);

    //  } );


  }

}



export class UsernameValidator {
  static notContainSpace(control: AbstractControl) : ValidationErrors | null {
      if((control.value as string).indexOf(' ') <= 0){
          return {notContainSpace: true};
      }

      return null;
  }
}
export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
