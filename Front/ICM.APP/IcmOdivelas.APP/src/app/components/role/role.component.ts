import { Component } from "@angular/core";

import { Role } from "src/app/models/role";

import { DataService } from "src/app/services/data.service";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  roles!: Role[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.dataService.getAllRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error) => {
        console.error('not found functions:', error);
      }
    );
  }
}
