import { DataService } from './../../services/data.service';
import { members } from 'src/app/models/members';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { Group } from 'src/app/models/group';
import { Category } from 'src/app/models/category';
import { Situation } from 'src/app/models/situation';
import { Role } from 'src/app/models/role';
import { MemberRoles } from 'src/app/models/memberRoles';

@Component({
  selector: 'app-modal-members',
  templateUrl: './modal-members.component.html',
  styleUrls: ['./modal-members.component.css']
})
export class ModalMembersComponent implements OnInit{

  categories!: Category[];
  groups!: Group[];
  situations!: Situation[];
  roles!: Role[];
  memberRoles!: MemberRoles[];
  @Input() member!: members;


  constructor(public activeModal: NgbActiveModal,
              private dataService: DataService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadGroups();
    this.loadSituations();
    this.loadRoles();
    this.dataService.getAllMemberRoles().subscribe(memberRoles => {
      this.memberRoles = memberRoles;
    });
  }

  formatarDataPorExtenso(data: Date | null): string {
    if (data) {
      return formatDate(data, 'dd / MMMM', 'en-US');
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
  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  }
  getGroupName(groupId: number): string {
    const group = this.groups.find((grp) => grp.id === groupId);
    return group ? group.name : '';
  }
  getSituationName(situationId: number): string {
    const situation = this.situations.find((sit) => sit.id === situationId);
    return situation ? situation.name : '';
  }
  getRoleName(roleId: number): string {
    const role = this.roles.find(role => role.id === roleId);
    return role ? role.name : '';
  }
  getMemberRoles(memberId: number): MemberRoles[] {
    return this.memberRoles.filter((memberRole) => memberRole.memberId === memberId);
  }



}
