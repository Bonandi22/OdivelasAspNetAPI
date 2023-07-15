import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './components/shared/nav/nav.component';
import { TituloComponent } from './components/shared/titulo/titulo.component';
import { MembersComponent } from './components/members/members.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/Category/Category.component';
import { SituationsComponent } from './components/situations/situations.component';
import { GroupsComponent } from './components/groups/groups.component';
import { RoleComponent } from './components/role/role.component';
import { RegisterMemberComponent } from './components/register-member/register-member.component';
import { DataService } from './services/data.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import  {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import { MatSidenavModule} from '@angular/material/sidenav'
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule} from '@angular/material/icon'
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TituloComponent,
    MembersComponent,
    DashboardComponent,
    CategoryComponent,
    SituationsComponent,
    GroupsComponent,
    RoleComponent,
    RegisterMemberComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CardModule,
    InputTextModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    })
  ],

  providers: [HttpClientModule, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
