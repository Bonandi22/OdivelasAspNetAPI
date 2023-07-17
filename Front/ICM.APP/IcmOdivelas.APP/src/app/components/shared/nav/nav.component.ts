import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from './../../../services/login.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']

})
export class NavComponent implements OnInit {

  // scroll navbar
  isScrolled: boolean = false;
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = (window.pageYOffset > 0);
  }

  constructor(private router: Router,
    public loginService: LoginService,
    private toastr: ToastrService) { }

  ngOnInit() {

  }
  doLogout() {
    this.loginService.logout();
    this.toastr.success('Logout successful!', 'Success');
    this.router.navigate(['/login']);
  }
}
