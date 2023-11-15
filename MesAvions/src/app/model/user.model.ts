import {Role} from "./role.model";

export class User {
  user_id!: number;
  username!: string;
  email!: string;
  password !: string;
  roles!: Role[];
  enabled!: boolean;
  verificationcode!: string;
}

