import { Role } from './role';
export class members {
  id: number;
  name: string;
  phoneNumber: string | null;
  birthDate: Date | null;
  isbaptized: boolean | null;
  nacionality: string;
  categoryId: number;
  groupId:number;
  situationId:number;
  roles: Role[];

  constructor(id: number,
              name: string,
              phoneNumber: string | null,
              birthDate: Date | null,
              isbaptized:boolean,
              nacionality:string,
              categoryId :number,
              groupId:number,
              situationId:number,
              roles: Role[]) {

    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.isbaptized = isbaptized;
    this.nacionality= nacionality;
    this.categoryId = categoryId ;
    this.groupId = groupId;
    this.situationId = situationId;
    this.roles  = roles;

  }
}
