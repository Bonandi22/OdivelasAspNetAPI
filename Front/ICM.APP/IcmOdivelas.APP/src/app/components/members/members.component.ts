import { ModalMembersComponent } from './../modal-members/modal-members.component';
import { formatDate } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


import { Category } from 'src/app/models/category';
import { Group } from 'src/app/models/group';
import { MemberRoles } from 'src/app/models/memberRoles';
import { members } from 'src/app/models/members';
import { Role } from 'src/app/models/role';
import { Situation } from 'src/app/models/situation';

import { DataService } from 'src/app/services/data.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { EditMemberComponent } from '../edit-members/edit-members.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members!: members[];
  categories!: Category[];
  groups!: Group[];
  situations!: Situation[];
  roles!: Role[];
  memberRoles!: MemberRoles[];
  radioModel = 'small';
  modalRef!: BsModalRef;

  constructor(private dataService: DataService,
              private toastr: ToastrService,
              private modalService: NgbModal ) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.dataService.getAllMembers().subscribe(
      (response: members[]) => {
        this.members = response;
      },
      (error) => {
        console.error('Erro ao obter membros:', error);
      }
    );

    this.dataService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error) => {
        console.error('Erro ao obter categorias:', error);
      }
    );

    this.dataService.getAllGroups().subscribe(
      (response: Group[]) => {
        this.groups = response;
      },
      (error) => {
        console.error('Erro ao obter grupos:', error);
      }
    );

    this.dataService.getAllSituations().subscribe(
      (response: Situation[]) => {
        this.situations = response;
      },
      (error) => {
        console.error('Erro ao obter situações:', error);
      }
    );
    this.dataService.getAllRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error) => {
        console.error('Erro ao obter roles:', error);
      }
    );
    this.dataService.getAllMemberRoles().subscribe(
      (response: MemberRoles[]) => {
        this.memberRoles = response;
      },
      (error) => {
        console.error('Erro ao obter associações de membros e funções:', error);
      }
    );
  }
  formatarDataPorExtenso(data: Date | null): string {
    if (data) {
      return formatDate(data, 'dd / MMMM', 'en-US');
    }
    return '';
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

  showDetails(member: members) {
    const modalRef = this.modalService.open(ModalMembersComponent);
    modalRef.componentInstance.member = member;
  }

  deleteMember(memberId: number) {
    const modalRef = this.modalService.open(ModalConfirmComponent);
    modalRef.result.then((result) => {
      if (result === true) {
        this.dataService.DeleteMember(memberId).subscribe(
          () => {
            this.toastr.success('Member deleted successfully', 'Success');
            this.getData(); // Atualizar a lista de membros após a exclusão
          },
          (error) => {
            console.error('Error deleting member:', error);
            this.toastr.error('An error occurred while deleting the member', 'Error');
          }
        );
      }
    }).catch((reason) => {
      // Usuário cancelou a exclusão, não fazer nada
    });
  }
}

