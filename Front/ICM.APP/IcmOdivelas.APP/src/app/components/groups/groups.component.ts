import { Component, OnInit } from '@angular/core';

import { Group } from 'src/app/models/group';

import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups!: Group[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getGroup();
  }

  getGroup() {
    this.dataService.getAllGroups().subscribe(
      (response: Group[]) => {
        this.groups = response;
      },
      (error) => {
        console.error('Erro found groups:', error);
      }
    );
  }
}
