import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription
  loginSuccessful = false;
  loginForm: FormGroup

  constructor(
    private loginService: LoginServiceService,
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    // this.loginForm = this.formBuilder.group({
    //   userName: new FormControl('', [Validators.required]),
    //   password: new FormControl('', [Validators.required]),
    // })

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    if (!this.loginForm.valid) return false;

    const userInfo = {
      name: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value
    }

    this.subscription = this.loginService.login(userInfo).subscribe((state) => {
      if (state) {
        this.loginSuccessful = true;
        this.router.navigate(['/dashboard'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
