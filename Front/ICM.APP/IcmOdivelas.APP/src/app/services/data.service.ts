import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Category } from '../models/category';
import { Group } from '../models/group';
import { members } from '../models/members';
import { Situation } from '../models/situation';
import { Role } from '../models/role';
import { MemberRoles } from '../models/memberRoles';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiUrl = `${environment.mainUrlAPI}`;

  constructor(private http: HttpClient) {}

  // get all props
  getAllMembers(): Observable<members[]> {
    return this.http.get<members[]>(`${this.apiUrl}/members`);
  }

  getMemberById(memberId: number): Observable<members> {
    const url = `${this.apiUrl}/members/${memberId}`;
    return this.http.get<members>(url);
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/Categories`);
  }
  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/Groups`);
  }
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/Roles`);
  }

  getAllSituations(): Observable<Situation[]> {
    return this.http.get<Situation[]>(`${this.apiUrl}/Situations`);
  }

  //memberRoles
  getAllMemberRoles(): Observable<MemberRoles[]> {
    return this.http.get<MemberRoles[]>(`${this.apiUrl}/memberRoles`);
  }

  //register member
  SalveMember(members: members) : Observable<any>{
  return this.http.post<members>(`${this.apiUrl}/members`, members)
  }

  SalveMemberRoles(memberRoles: { memberId: any; roleId: any; }[]): Observable<any> {
    const url = `${this.apiUrl}/memberRoles`;
    return this.http.post(url, memberRoles);
  }

  //Update member
  updateMember(members: members): Observable<any> {
    return this.http.put<members>(this.apiUrl, members, httpOptions);
  }

  //Delete Member
  DeleteMemeber(memberId: number): Observable<any> {
    const url = `${this.apiUrl}/members/${memberId}`;
    return this.http.delete<number>(url, httpOptions);
  }

}
