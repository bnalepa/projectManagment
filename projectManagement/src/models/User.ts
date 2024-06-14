import { Role } from '../models/Role';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: Role
    login: string
    password: string
  }
  

