import { collection, addDoc } from 'firebase/firestore/lite';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { db } from './DatabaseConnection'; 

async function addUsersToDatabase() {
const users: User[] = [
    {
        id: '1',
        firstName: 'Kubuś',
        lastName: 'Puchatek',
        role: Role.Admin,
        login: 'admin',
        password: '9'
    },
    {
        id: '2',
        firstName: 'Adam',
        lastName: 'Developer',
        role: Role.Developer,
        login: 'adam',
        password: '9'
    },
    {
        id: '3',
        firstName: 'Kamil',
        lastName: 'DevOps',
        role: Role.DevOps,
        login: 'kamil',
        password: '9'
    }
];


    const usersCollection = collection(db, 'users');

    for (const user of users) {
        try {
            await addDoc(usersCollection, user);
            console.log(`Added user: ${user.firstName} ${user.lastName}`);
        } catch (error) {
            console.error(`Error adding user ${user.firstName} ${user.lastName}:`, error);
        }
    }
}


export { addUsersToDatabase }