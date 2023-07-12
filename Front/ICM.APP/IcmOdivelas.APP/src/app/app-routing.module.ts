import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MembersComponent } from './components/members/members.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/Category/Category.component';
import { GroupsComponent } from './components/groups/groups.component';
import { SituationsComponent } from './components/situations/situations.component';
import { RoleComponent } from './components/role/role.component';
import { RegisterMemberComponent } from './components/register-member/register-member.component';


const routes: Routes = [
  {path: 'members', component: MembersComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'situations', component: SituationsComponent},
  {path: 'role', component: RoleComponent},
  {path: 'register-member', component: RegisterMemberComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
