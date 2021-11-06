import { GenericResponse } from './../../shared/model/GenericResponse';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from './../../shared/service/app.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hide = true;

  constructor(private formBuilder: FormBuilder,
    private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  login() {
    this.appService.login(this.loginForm.value).subscribe((response: GenericResponse) => {
      if (response.statusCode == 200) {
        this.appService.setUserLoggedIn(true);
        this.appService.setUser(response.body);
        this.router.navigate(['dashboard']);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Sin acceso",
          text: response.message,
          allowOutsideClick: false
        })
      }
    });
  }
}
