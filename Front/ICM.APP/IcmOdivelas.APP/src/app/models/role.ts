export class Role {
  id: number;
  name: string;
  roles: Role[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.roles = [];
  }
}

