import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Category } from 'src/app/models/category';
import { Group } from 'src/app/models/group';
import { MemberRoles } from 'src/app/models/memberRoles';
import { Role } from 'src/app/models/role';
import { Situation } from 'src/app/models/situation';

import { DataService } from 'src/app/services/data.service';
// Importe o arquivo JavaScript
import './form-validation.js';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.css']
})
export class RegisterMemberComponent implements OnInit {

  forms: any;
  formsTitle!: string;
  categories!: Category[];
  groups!: Group[];
  situations!: Situation[];
  roles!: Role[];
  memberRoles!: MemberRoles[];

  constructor(private dataService: DataService) {}


  ngOnInit() {
    this.formsTitle = "New Member";
    this.loadCategories();
    this.loadGroups();
    this.loadSituations();
    this.loadRoles();
    this.forms = new FormGroup({
      name: new FormControl(null),
      phoneNumber: new FormControl(null),
      birthDate: new FormControl(null),
      isbaptized: new FormControl(false),
      nacionality: new FormControl(null),
      categoryId: new FormControl(null),
      groupId: new FormControl(null),
      situationId: new FormControl(null),
      selectedRoles: new FormControl([]),
    });
  }

  SendForms(): void {
    const memberData = this.forms.value;
    const selectedRoles = memberData.selectedRoles;

    this.dataService.SalveMember(memberData).subscribe(
      (memberResult) => {
        const memberId = memberResult.id;

        const memberRoles = selectedRoles.map((selectedRole: any) => ({
          memberId: memberId,
          roleId: selectedRole
        }));

        this.dataService.SalveMemberRoles(memberRoles).subscribe(
          (rolesResult) => {
            alert("Member inserted successfully");
          },
          (rolesError) => {
            console.log(rolesError);
          }
        );
      },
      (memberError) => {
        console.log(memberError);
      }
    );
  }
  loadCategories() {
    this.dataService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  loadGroups() {
    this.dataService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }
  loadSituations() {
    this.dataService.getAllSituations().subscribe(situations => {
      this.situations = situations;
    });
  }
  loadRoles() {
    this.dataService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

}
