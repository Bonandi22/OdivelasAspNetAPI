import { Component, HostListener, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

  }
}
