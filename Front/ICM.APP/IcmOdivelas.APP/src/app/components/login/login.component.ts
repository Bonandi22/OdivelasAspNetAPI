import { LoginService } from './../../services/login.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  requestLogin!: Login;

  constructor(private router: Router,
              public loginService: LoginService,
              private toastr: ToastrService) { }

  ngOnInit() : void{
    this.requestLogin = new Login();
  }

  doLogin() {
    this.loginService.LoginUser(this.requestLogin).subscribe(
      (response: any) => {
        const token = response.jwt;
        this.loginService.setAuthToken(token);
        // Obter o nome do usuário
        const login = this.requestLogin.login; // Assumindo que o login está no campo "login" do objeto "requestLogin"
        this.loginService.getUserName(login).subscribe(
          (user: User) => {
            const userName = user.name;
            this.toastr.success(`Welcome, ${userName}!`, 'Success');
            this.router.navigate(['/home']);
          },
          (error) => {
            console.log(error);
            this.toastr.error('Failed to retrieve user information', 'Error');
            this.router.navigate(['/login']);
          }
        );
      },
      (error) => {
        if (error.status === 400) {
          const errorMessage = error.error.message;
          this.toastr.error(errorMessage, 'Validation Error');
        } else {
          this.toastr.error('Login failed!', 'Error');
        }
        this.router.navigate(['/login']);
      }
    );
  }


}


