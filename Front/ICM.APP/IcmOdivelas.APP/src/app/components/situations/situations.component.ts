import { Component, OnInit } from '@angular/core';

import { Situation } from 'src/app/models/situation';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-situations',
  templateUrl: './situations.component.html',
  styleUrls: ['./situations.component.css']
})
export class SituationsComponent implements OnInit {

  situations!: Situation[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getSituation();
  }

  getSituation() {
    this.dataService.getAllSituations().subscribe(
      (response: Situation[]) => {
        this.situations = response;
      },
      (error) => {
        console.error('not found Situation:', error);
      }
    );
  }
}
