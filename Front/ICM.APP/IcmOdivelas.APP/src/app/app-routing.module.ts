import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MembersComponent } from './components/members/members.component';
import { CategoryComponent } from './components/Category/Category.component';
import { GroupsComponent } from './components/groups/groups.component';
import { SituationsComponent } from './components/situations/situations.component';
import { RoleComponent } from './components/role/role.component';
import { RegisterMemberComponent } from './components/register-member/register-member.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'situations', component: SituationsComponent, canActivate: [AuthGuard] },
  { path: 'role', component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'register-member', component: RegisterMemberComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
