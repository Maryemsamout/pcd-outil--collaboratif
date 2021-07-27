import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceService } from '../Services/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  EnseignantList: any;

  constructor(private formBuilder: FormBuilder, private router: Router , private api : ServiceService) { }


  EtudiantList:any = [];
  ngOnInit() {
    this.refreshList();
    this.refreshList1();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  refreshList() {
    this.api.getEtudiant().subscribe( data => {this.EtudiantList=data;
    });
  }
  refreshList1() {
    this.api.getenseignant().subscribe( (data: any) => {this.EnseignantList=data;
    });
  }
  get data() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('invalid');
      return;
    } else
    {
      this.api.getEtudiant().subscribe( data => {
        let found = false ;
        data.forEach((user: { [x: string]: string; }) => {
          if ((user['email'] == this.loginForm.controls.username.value)&& (user['password'] == this.loginForm.controls.password.value))
          {
            found = true ;
            Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
            this.router.navigate(['/etudiant/'+user['idEtudiant']]);
          }
          else {this.submitted = true;}
          this.EnseignantList.forEach((user: { [x: string]: string; })=>{
          if ((user['email'] == this.loginForm.controls.username.value) && (user['password'] == this.loginForm.controls.password.value))
            {
              Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
              this.router.navigate(['/enseignant/'+user['idEnseignant']]);
            }
          })
          //else {this.submitted = true;}
        })
       } );
    }
  }
}
