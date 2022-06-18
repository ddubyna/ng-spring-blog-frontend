import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {RegisterPayload} from '../register-payload';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ValidatorFn} from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  checkPasswords: ValidatorFn;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.checkPasswords = (group: AbstractControl):  ValidationErrors | null => {
      const pass = group.get('password').value;
      const confirmPass = group.get('confirmPassword').value;

      if (pass === '' || confirmPass === '') {
        return null;
      }

      return (pass === confirmPass) ? null : { notSame: true };
    };

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.checkPasswords
    });
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.registerForm.dirty && this.registerForm.valid) {
      this.registerPayload.username = this.registerForm.get('username').value;
      this.registerPayload.email = this.registerForm.get('email').value;
      this.registerPayload.password = this.registerForm.get('password').value;
      this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;

      this.authService.register(this.registerPayload).subscribe(data => {
        console.log('register succes');
        this.router.navigateByUrl('/register-success');
      }, error => {
        console.log('register failed');
      });
    } else {

    }

  }
}
