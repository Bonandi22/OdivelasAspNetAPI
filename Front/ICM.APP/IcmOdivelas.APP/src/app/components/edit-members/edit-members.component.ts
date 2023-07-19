import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

import { Category } from 'src/app/models/category';
import { Group } from 'src/app/models/group';
import { MemberRoles } from 'src/app/models/memberRoles';
import { members } from 'src/app/models/members';
import { Role } from 'src/app/models/role';
import { Situation } from 'src/app/models/situation';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})

export class EditMemberComponent implements OnInit {

  memberId!: number;
  member!: members;
  formsTitle!: string;
  categories!: Category[];
  groups!: Group[];
  situations!: Situation[];
  roles!: Role[];
  memberRoles!: MemberRoles[];
  forms!: FormGroup;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) {}

  ngOnInit() {
  this.formsTitle = "Edit Member";
    this.loadCategories();
    this.loadGroups();
    this.loadSituations();
    this.loadRoles();
    const memberId = this.route.snapshot.params['id'];
    this.loadMemberData(memberId);
    this.forms = new FormGroup({
      name: new FormControl(null),
      phoneNumber: new FormControl(null),
      address: new FormControl(null),
      birthDate: new FormControl(null),
      isbaptized: new FormControl(false),
      nacionality: new FormControl(null),
      categoryId: new FormControl(null),
      groupId: new FormControl(null),
      situationId: new FormControl(null),
      selectedRoles: new FormControl([]),
    });
  }

  loadMemberData(memberId: number): void {
    this.dataService.getMemberById(memberId).subscribe(
      (memberData: members) => {
        const birthDate = memberData.birthDate ? new Date(memberData.birthDate) : null;
        this.forms.patchValue({
          name: memberData.name,
          phoneNumber: memberData.phoneNumber,
          address: memberData.address,
          birthDate: memberData.birthDate,
          isbaptized: memberData.isbaptized,
          nacionality: memberData.nacionality,
          selectedRoles: memberData.roles.map(role => role.id),
          categoryId: memberData.categoryId,
          groupId: memberData.groupId,
          situationId: memberData.situationId
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  SendEditForms(): void {
    const memberId = this.route.snapshot.params['id'];
    console.log('Member ID:', memberId);
    const memberData = this.forms.value;
    const selectedRoles = memberData.selectedRoles;
    memberData.birthDate = this.formatarDataPorExtenso(memberData.birthDate);

    this.dataService.updateMember(memberId, memberData).subscribe(
      () => {
        if (selectedRoles.length > 0) {
          const memberRoles = selectedRoles.map((selectedRole: any) => ({
            memberId: memberId,
            roleId: selectedRole
          }));

          this.dataService.UpdateMemberRoles(memberRoles).subscribe(
            () => {
              alert("Member updated successfully");
              this.router.navigate(['/members']);
            },
            (rolesError) => {
              console.log(rolesError);
            }
          );
        } else {
          alert("Member updated successfully, but no new roles were selected.");
          this.router.navigate(['/members']);
        }
      },
      (memberError) => {
        console.log(memberError);
      }
    );
  }

  formatarDataPorExtenso(data: Date | null): string {
    if (data) {
      return formatDate(data, 'yyyy-MM-dd', 'en-US');
    }
    return '';
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
