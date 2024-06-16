import { EntityDAO, EntityType } from '../data/DAO';
import { checkAdminRole, getLoggedUser } from '../scripts/login';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { displayStory } from '../views/StoryView';

const DAO = new EntityDAO<Task>(EntityType.Task);
const contentDiv = document.getElementById("content");
const headerDiv = document.getElementById("header");
const userDAO = new EntityDAO<User>(EntityType.User);


async function displayTasks(storyId: string) {

    let isAdmin = checkAdminRole();
    let isLogged = getLoggedUser();

    if (headerDiv) {
        headerDiv.innerHTML = '<h1>Tasks</h1>';
    }
    if (contentDiv) {

        let temp = `
            <div class="btn-group mb-3" role="group">
            
                <button type="button" class="btn btn-outline-secondary btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                    </svg>
                </button>
        `
        if(isLogged)
            { 
                temp +=`<button type="button" class="btn btn-outline-secondary btn-add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                </button>
                `
            }
            temp += `</div>
            <div class="d-flex">
                <table>
                    <tr>
                    <th><h3>Todo</h3></th>
                    <th><h3>Doing</h3></th>
                    <th><h3>Done</h3></th>
                    </tr>
                    <tr>
                        <td>
                            <div class="flex-column kanban-column" id="todo-column">
                            </div>
                        </td>
                        <td>
                            <div class="flex-column kanban-column" id="doing-column">
                            </div>
                        </td>
                        <td>
                            <div class="flex-column kanban-column" id="done-column">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        `

        contentDiv.innerHTML = temp;

        document.querySelectorAll('.btn-back').forEach(button => {
            button.addEventListener('click', () => {
                const projectId = localStorage.getItem('projectID') as string;
                displayStory(projectId);
            });
        });

        document.querySelectorAll('.btn-add').forEach(button => {
            button.addEventListener('click', async () => {
                createTask(storyId);
            });
        });

        displayTasksByStatus(storyId);
    }
}

async function displayTasksByStatus(storyId: string) {
    const todoColumn = document.getElementById('todo-column');
    const doingColumn = document.getElementById('doing-column');
    const doneColumn = document.getElementById('done-column');

    let isAdmin = checkAdminRole();

    if (todoColumn && doingColumn && doneColumn) {


        const entities = await DAO.getAllEntity();
        const filteredEntities = entities.filter(task => task.storyId === storyId);

        filteredEntities.forEach(async (entity: Task) => {

            
            let responsibleUser = "Brak";
            if (entity.responsibleUserId !== 'null') {
                let user =  await userDAO.getEntityByID(entity.responsibleUserId.toString());
                responsibleUser = `${user[0].firstName} ${user[0].lastName}`;
            }


            const displayString = document.createElement('div');
            displayString.className = 'card mb-3';
            let temp = `
                <div class="card-body">
                    <div class="card-title"><b>${entity.name}</b></div>
                    <div class="card-text">Opis: ${entity.description}</div>
                    <div class="card-text">Priorytet: ${entity.priority}</div>
                    <div class="card-text">Status: ${entity.status}</div>
                    <div class="card-text">Czas utworzenia: ${entity.createdAt}</div>
                    <div class="card-text">Czas rozpoczęcia: ${entity.startDate}</div>
                    <div class="card-text">Czas zakończenia: ${entity.endDate}</div>
                    <div class="card-text">Zrealizowane godziny: ${entity.estimatedTime}</div>
                    <div class="card-text">Przypisany użytkownik: ${responsibleUser}</div>
                `
                if(isAdmin)
                { 
                    temp += `
                    <div class="btn-group right-align">
                        <button type="button" class="btn btn-outline-secondary btn-edit" data-id="${entity.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-outline-secondary btn-delete" data-id="${entity.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5.5 0 0 0 9.5 0h-3A1.5.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                            </svg>
                        </button>
                    </div>
                    `
                }
                temp += `</div>`;
                displayString.innerHTML = temp;

            if (entity.status === 'todo') {
                todoColumn.appendChild(displayString);
            } else if (entity.status === 'doing') {
                doingColumn.appendChild(displayString);
            } else if (entity.status === 'done') {
                doneColumn.appendChild(displayString);
            }

            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const target = event.currentTarget as HTMLElement;
                    const id = target.getAttribute('data-id');
                    if (id) {
                        await DAO.deleteEntity(id);
                        await displayTasks(storyId);
                    }
                });
            });

            document.querySelectorAll('.btn-edit').forEach(button => {
                button.addEventListener('click', (event) => {
                    const target = event.currentTarget as HTMLElement;
                    const id = target.getAttribute('data-id');
                    if (id) {
                        editTask(id);
                    }
                });
            });
        });
    }
}

async function createTask(storyId: string) {
    if (headerDiv) {
        headerDiv.innerHTML = '<h1>Dodaj task</h1>';
    }
    if (contentDiv) {

        contentDiv.innerHTML = `
                <button type="button" class="btn btn-outline-secondary btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                </button>
            <input type="hidden" id="data-id" data-id="${storyId}">
            <div class="mb-3">
                <label for="name" class="form-label">Nazwa</label>
                <input type="text" class="form-control" id="name">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Opis</label>
                <input type="text" class="form-control" id="description">
            </div>
            <div class="mb-3">
                <label for="priority" class="form-label">Priorytet</label>
                <select class="form-control" id="priority">
                    <option value="low">Niski</option>
                    <option value="medium">Średni</option>
                    <option value="high">Wysoki</option>
                </select>

            </div>

            </div>
            <button type="button" class="btn btn-primary" id="save">Zapisz</button>
        `;

        document.querySelectorAll('.btn-back').forEach(button => {
            button.addEventListener('click', () => {
                displayTasks(storyId);
            });
        });

        const saveButton = document.getElementById('save');
        if (saveButton) {
            saveButton.addEventListener('click', async () => {
                const nameInput = document.getElementById('name') as HTMLInputElement;
                const descriptionInput = document.getElementById('description') as HTMLInputElement;
                const priorityInput = document.getElementById('priority') as HTMLSelectElement;

                const newTask: Omit<Task, 'id'> = {
                    name: nameInput.value,
                    description: descriptionInput.value,
                    priority: priorityInput.value as 'low' | 'medium' | 'high',
                    status: 'todo' ,
                    storyId: storyId,
                    createdAt: Date(),
                    responsibleUserId: 'null',
                    startDate: '',
                    endDate: '',
                    estimatedTime: 0

                };

                await DAO.addEntity(newTask);
                await displayTasks(storyId);
            });
        }
    }
}

async function editTask(id: string) {
    const taskData = await DAO.getEntityByID(id);
    const task = taskData[0];

    if (headerDiv) {
        headerDiv.innerHTML = '<h1>Edytuj zadanie</h1>';
    }
    if (contentDiv) {
        const users = await userDAO.getAllEntity();
        contentDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="mb-3">
                        <label for="edit-name" class="form-label">Nazwa</label>
                        <input type="text" class="form-control" id="edit-name" value="${task.name}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-description" class="form-label">Opis</label>
                        <input type="text" class="form-control" id="edit-description" value="${task.description}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-priority" class="form-label">Priorytet</label>
                        <select class="form-control" id="edit-priority">
                            <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                        </select>


                    </div>
                    `
                    if(task.status === 'todo')
                        {
                            contentDiv.innerHTML += ` 
                            <div class="mb-3">

                                    <select class="form-control" id="edit-status" style='display:none'>
                                    <option value="todo" selected >Todo</option>
 
                                    </select>
                                </div>
                            <div class="mb-3">
                            <label for="edit-user" class="form-label">Przypisany użytkownik</label>
                            <select class="form-control" id="edit-user">
                            <option value="not" selected>bez zmian</option>
                                ${users.map(user => {
                                    if (user.role === Role.DevOps || user.role === Role.Developer) {
                                        return `<option value="${user.id}">${user.firstName} ${user.lastName}</option>`;
                                    }
                                    return '';
                                }).join('')}
                            </select>`
                        } else if (task.status === 'doing')
                            {
                                contentDiv.innerHTML += ` 
                            <select class="form-control" id="edit-user" style="display:none">
                            <option value="old" selected>1</option>
            
                            </select>
                                <div class="mb-3">
                                    <label for="edit-status" class="form-label">Status</label>
                                    <select class="form-control" id="edit-status">
                                        <option value="doing" 'selected' >Doing</option>
                                        <option value="done" >Done</option>
                                    </select>
                                </div>
                                `
                            }

                    
                    contentDiv.innerHTML += `
                    <button type="button" class="btn btn-primary" id="save-edit">Zapisz</button>
                    <button type="button" class="btn btn-secondary btn-back">Cofnij</button>
                    
                </div>
            </div>
        `;

        document.querySelectorAll('.btn-back').forEach(button => {
            button.addEventListener('click', () => {
                displayTasks(task.storyId);
            });
        });

        const saveEditButton = document.getElementById('save-edit');
        if (saveEditButton) {
            saveEditButton.addEventListener('click', async () => {
                const nameInput = document.getElementById('edit-name') as HTMLInputElement;
                const descriptionInput = document.getElementById('edit-description') as HTMLInputElement;
                const priorityInput = document.getElementById('edit-priority') as HTMLSelectElement;
                const userIdInput = document.getElementById('edit-user') as HTMLSelectElement;
                const statusInput = document.getElementById('edit-status') as HTMLSelectElement;

                //console.log(statusInput.value, userIdInput.value, statusInput.value == 'todo' && userIdInput.value != 'not')
                let statusToUpdate = 'todo';
                if(statusInput.value == 'todo' && userIdInput.value != 'not')
                {    
                    statusToUpdate = 'doing'
                    //console.log(task.responsibleUserId,userIdInput.value,userIdInput.value == 'old' ? task.responsibleUserId : userIdInput.value)
                    const updatedTask: Partial<Task> = {
                        name: nameInput.value,
                        description: descriptionInput.value,
                        priority: priorityInput.value as 'low' | 'medium' | 'high',
                        status: statusToUpdate as 'todo' | 'doing' | 'done',
                        startDate: statusToUpdate == 'doing' ? new Date().toString() : task.startDate,
                        endDate: statusToUpdate == 'done' ? new Date().toString() : task.endDate,
                        responsibleUserId: userIdInput.value == 'old' ? task.responsibleUserId : userIdInput.value
    
    
                    };
                    await DAO.updateEntity(id, updatedTask);
                } else if(statusInput.value == 'doing' && userIdInput.value == 'old')
                {
                        statusToUpdate = 'doing'
                        const updatedTask: Partial<Task> = {
                            name: nameInput.value,
                            description: descriptionInput.value,
                            priority: priorityInput.value as 'low' | 'medium' | 'high',
                            status: statusToUpdate as 'todo' | 'doing' | 'done',
                        };
                    await DAO.updateEntity(id, updatedTask);
                } else if(statusInput.value == 'done')
                {
                    statusToUpdate = 'done'
                    const updatedTask: Partial<Task> = {
                        name: nameInput.value,
                        description: descriptionInput.value,
                        priority: priorityInput.value as 'low' | 'medium' | 'high',
                        status: statusToUpdate as 'todo' | 'doing' | 'done',
                        endDate:new Date().toString()
                        
                    };
                    await DAO.updateEntity(id, updatedTask);
                }                   
                
                

                

                
                await displayTasks(task.storyId);
            });
        }
    }
}

export { displayTasks };