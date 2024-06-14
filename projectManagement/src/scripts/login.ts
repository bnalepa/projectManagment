import { Role } from '../models/Role';



export function checkAdminRole()
{
    let user = localStorage.getItem('user');
    if(typeof(user) === 'string')
    {
        if(JSON.parse(user).role == Role.Admin)
            {
                return true
            }
    }
    return false
}

export function getLoggedUser()
{
    let user = localStorage.getItem('user');
    if(typeof(user) === 'string')
    {
        return JSON.parse(user).id
    }
    return false

}
