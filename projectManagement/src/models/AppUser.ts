import { User } from '../models/User';
import { Role } from '../models/Role';

class AppUser implements User {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    login: string;
    password: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        role: Role,
        login: string,
        password: string
    ) {
        this.id = id.toString();
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.login = login;
        this.password = password;
    }
}

export { AppUser };