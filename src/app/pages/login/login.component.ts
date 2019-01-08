import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../../app.config';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  res = '';
  res2 = '';

  submitForm(): void {
    this.httpClient.post(`${BASE_URL}/api/login`, {
      username: this.validateForm.get('username').value,
      password: CryptoJS.SHA1(this.validateForm.get('password').value).toString()
    }).subscribe((res: any) => {
      this.res = res;
      this.httpClient.get(`${BASE_URL}/actuator/gateway/routes`).subscribe((res2: any) => {
        this.res2 = res2;

      });
    });
  }

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
