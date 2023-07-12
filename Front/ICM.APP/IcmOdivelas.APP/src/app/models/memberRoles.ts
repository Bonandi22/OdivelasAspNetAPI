import { members } from "./members";
import { Role } from "./role";

export class MemberRoles {
  memberId: number;
  roleId: number;
  member!: members;
  roles!: Role;

  constructor(memberId: number, roleId: number) {
    this.memberId = memberId;
    this.roleId = roleId;
  }
}
