import { EntityDAO, EntityType } from '../data/DAO';
import { Project } from '../models/Project';
import { displayStory } from '../views/StoryView'
import { checkAdminRole, getLoggedUser } from '../scripts/login';
//import { addUsersToDatabase } from '../data/AddUser'


const DAO = new EntityDAO<Project>(EntityType.Project)
const contentDiv = document.getElementById("content")
const headerDiv = document.getElementById("header")





async function displayProjects() {

    //addUsersToDatabase();

    let isAdmin = checkAdminRole();
    let isLogged = getLoggedUser();

    if(headerDiv)
    {
        headerDiv.innerHTML = '<h3>Projekty</h3>'
    }
    if(contentDiv)
        {
            contentDiv.innerHTML = ''

            if(isLogged)
                {
                    const buttonString = document.createElement('div')
                    buttonString.className = 'card'
                    buttonString.innerHTML = `
        
                    <div class="btn-group right-align">
                    
                        <button type="button" class="btn btn-outline-secondary btn-add">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                            </svg>
                        </button>
                    </div>
                    `
                    contentDiv.appendChild(buttonString)
        
                    document.querySelectorAll('.btn-add').forEach(button => {
                        button.addEventListener('click', async (event) => {
                            createProject()
                        });
                      });
                }
            

            const DAO = new EntityDAO<Project>(EntityType.Project);
            const Entities = await DAO.getAllEntity();
            Entities.forEach((entity: Project) => {
            const displayString = document.createElement('div')
            displayString.className = 'card'
            let temp = `
                <div class = 'card-title'><b>  ${entity.name}</b> </div> 
                <div class = 'card-text'>  ${entity.description}
                    <div class="btn-group right-align">
                        <button type="button" class="btn btn-outline-secondary btn-open" data-id='${entity.id}'> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
                                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/>
                            </svg> 
                        </button> 
                        
            `
            if(isAdmin)
                {   
                    temp += `               
                        <button type="button" class="btn btn-outline-secondary btn-edit" data-id='${entity.id}'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"></path>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-outline-secondary btn-delete" data-id='${entity.id}' >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                            </svg>
                    </button>
                </div>
                `
                }

            displayString.innerHTML = temp;   
            contentDiv.appendChild(displayString)
        
        })
            document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', async (event) => {
              const target = event.target as HTMLElement;
              const id = target.getAttribute('data-id');
              if (id) {
                await DAO.deleteEntity(id);
                await displayProjects();
              }
            });
          });

          document.querySelectorAll('.btn-open').forEach(button => {
            button.addEventListener('click', async (event) => {
              const target = event.target as HTMLElement;
              const id = target.getAttribute('data-id');
              console.log(id)
              if (id) {
                await displayStory(id);
              }
            });
          });
        
          document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.currentTarget as HTMLElement;
                const id = target.getAttribute('data-id') as string;

                    editProject(id);
            });
    });

}


async function createProject() {

    if(headerDiv)
    {
        headerDiv.innerHTML = '<h1>Dodaj projekt</h1>'
    }
    if(contentDiv)
    {
            contentDiv.innerHTML = ''

            const buttonString = document.createElement('div')
            buttonString.className = 'card'
            buttonString.innerHTML = `

            <div class="btn-group right-align">
                <button type="button" class="btn btn-outline-secondary btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                </button>
            </div>
            `
            contentDiv.appendChild(buttonString)

            document.querySelectorAll('.btn-back').forEach(button => {
                button.addEventListener('click', event => {
                    displayProjects(); 
                });
              });

            const displayString = document.createElement('div')
            displayString.className = 'card'
            displayString.innerHTML = `
                <div class = 'card-text'>Nazwa: <input type='text' id='name'> </div> 
                <div class = 'card-text'>Opis: <input type='text' id='description'> </div> 
                <button type="button" class="btn btn-primary" id="save">Zapisz</button>
                `
            contentDiv.appendChild(displayString)

            const saveButton = document.querySelector('#save');
            saveButton?.addEventListener('click', async (event) => {
                saveProject();
            }
        

    )}
}

async function editProject(id: string) {

    const projectData = await DAO.getEntityByID(id);

    const project = projectData[0];

    if (headerDiv) {
        headerDiv.innerHTML = '<h3>Edytuj projekt</h3   >';
    }
    if (contentDiv) {

        contentDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="mb-3">
                        <label for="edit-name" class="form-label">Nazwa</label>
                        <input type="text" class="form-control" id="edit-name" value="${project.name}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-description" class="form-label">Opis</label>
                        <input type="text" class="form-control" id="edit-description" value="${project.description}">
                    </div>
                    <button type="button" class="btn btn-primary" id="save">Zapisz</button>
                    <button type="button" class="btn btn-secondary btn-back">Cofnij</button>
                </div>
            </div>
        `;

        document.querySelectorAll('.btn-back').forEach(button => {
            button.addEventListener('click', () => {
                displayProjects();
            });
        });

        const saveEditButton = document.getElementById('save');
        if (saveEditButton) {
            saveEditButton.addEventListener('click', async () => {
                const nameInput = document.getElementById('edit-name') as HTMLInputElement;
                const descriptionInput = document.getElementById('edit-description') as HTMLInputElement;

                const updatedProject: Partial<Project> = {
                    name: nameInput.value,
                    description: descriptionInput.value
                };

                await DAO.updateEntity(id, updatedProject);
                await displayProjects();
            });
        }
    }
}



async function saveProject() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLInputElement;

    const newProject: Omit<Project, 'id'> = {
        name: nameInput.value,
        description: descriptionInput.value
    };

    await DAO.addEntity(newProject);
    await displayProjects();
}
}


export {displayProjects}

