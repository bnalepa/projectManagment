import { EntityDAO, EntityType } from '../data/DAO';
import { Story } from '../models/Story';
import { displayProjects } from '../views/ProjectView'

const DAO = new EntityDAO<Story>(EntityType.Story)
const contentDiv = document.getElementById("content")
const headerDiv = document.getElementById("header")

async function displayStory(projectId: string) {
    if (headerDiv) {
        headerDiv.innerHTML = '<h1>Stories</h1>';
    }
    if (contentDiv) {
        
        

        displayFilteredStory(projectId, 'all');
    }
}

async function displayFilteredStory(projectId: string, filter: string | null) {
    
    if(headerDiv)
        {
            headerDiv.innerHTML = '<h1>Stories</h1>'
        }
    if(contentDiv)
        {
            const DAO = new EntityDAO<Story>(EntityType.Story);
            const entities = await DAO.getAllEntity();


            const filteredEntities = entities.filter(story => story.projectId === projectId && (filter === 'all' || story.status === filter));

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
                <button type="button" class="btn btn-outline-secondary btn-add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                </button>
            </div>
                <div class="btn-group mb-3" role="group" aria-label="Filter stories">
                    <button type="button" class="btn btn-outline-secondary filter-button" data-filter="all">All</button>
                    <button type="button" class="btn btn-outline-secondary filter-button" data-filter="todo">Todo</button>
                    <button type="button" class="btn btn-outline-secondary filter-button" data-filter="doing">Doing</button>
                    <button type="button" class="btn btn-outline-secondary filter-button" data-filter="done">Done</button>
                </div>
                <div id="story-list" class="d-flex flex-column gap-3"></div>
            `;
            contentDiv.appendChild(buttonString)

            document.querySelectorAll('.filter-button').forEach(button => {
                button.addEventListener('click', () => {
                    const filter = (button as HTMLElement).getAttribute('data-filter');
                    displayFilteredStory(projectId, filter);
                });
            });
                filteredEntities.forEach((entity: Story) => {
                if(entity.projectId == projectId)
                    {
                        const displayString = document.createElement('div')
                        displayString.className = 'card'
                        displayString.innerHTML = `
            
                            <div class = 'card-title'><b>Nazwa: ${entity.name}</b> </div> 
                            <div class = 'card-text'>Opis: ${entity.description} </div>
                            <div class = 'card-text'>Priorytet: ${entity.priority} </div>                
                            <div class = 'card-text'>Status: ${entity.status} </div>  
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
                        
                        contentDiv.appendChild(displayString)
                    }
                    document.querySelectorAll('.btn-delete').forEach(button => {
                        button.addEventListener('click', async (event) => {
                            const target = event.currentTarget as HTMLElement;
                            const id = target.getAttribute('data-id');
                            if (id) {
                                await DAO.deleteEntity(id);
                                await displayStory(projectId);
                            }
                        });
                    });
            
                    document.querySelectorAll('.btn-edit').forEach(button => {
                        button.addEventListener('click', (event) => {
                            const target = event.currentTarget as HTMLElement;
                            const id = target.getAttribute('data-id');
                            if (id) {
                                editStory(id);
                            }
                        });
                    });
        
        })

            document.querySelectorAll('.btn-back').forEach(button => {
            button.addEventListener('click', event => {
                displayProjects(); 
            });
          });
          document.querySelectorAll('.btn-add').forEach(button => {
            button.addEventListener('click', event => {
                createStory(projectId); 
            });
          });
      
        

    }

}

async function createStory(projectId: string) {
    if (headerDiv) {
        headerDiv.innerHTML = '<h1>Dodaj story</h1>';
    }
    if (contentDiv) {
        contentDiv.innerHTML = '';

        const buttonString = document.createElement('div');
        buttonString.className = 'card';
        buttonString.innerHTML = `
            <div class="btn-group right-align">
                <button type="button" class="btn btn-outline-secondary btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                </button>
            </div>
            <input type="hidden" id="data-id" data-id="${projectId}">
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
            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select class="form-control" id="status">
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary" id="save">Zapisz</button>
        `;
        contentDiv.appendChild(buttonString);

        document.querySelectorAll('.btn-back').forEach(button => {
            button.addEventListener('click', () => {
                displayStory(projectId);
            });
        });

        const saveButton = document.getElementById('save');
        if (saveButton) {
            saveButton.addEventListener('click', async () => {
                const nameInput = document.getElementById('name') as HTMLInputElement;
                const descriptionInput = document.getElementById('description') as HTMLInputElement;
                const priorityInput = document.getElementById('priority') as HTMLSelectElement;
                const statusInput = document.getElementById('status') as HTMLSelectElement;

                const newStory: Omit<Story, 'id'> = {
                    name: nameInput.value,
                    description: descriptionInput.value,
                    priority: priorityInput.value as 'low' | 'medium' | 'high',
                    status: statusInput.value as 'todo' | 'doing' | 'done',
                    ownerId: '1',
                    createdAt: new Date(),
                    projectId: projectId

                };

                await DAO.addEntity(newStory);
                await displayStory(projectId);
            });
        }
    }
}
async function editStory(id: string) {

    const storyData = await DAO.getEntityByID(id);

    const story = storyData[0];
    if (headerDiv) {
        headerDiv.innerHTML = '<h1>Edit Story</h1>';
    }
    if (contentDiv) {
        contentDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="mb-3">
                        <label for="edit-name" class="form-label">Story Name</label>
                        <input type="text" class="form-control" id="edit-name" value="${story.name}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-description" class="form-label">Story Description</label>
                        <input type="text" class="form-control" id="edit-description" value="${story.description}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-priority" class="form-label">Priority</label>
                        <select class="form-control" id="edit-priority">
                            <option value="low" ${story.priority === 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" ${story.priority === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" ${story.priority === 'high' ? 'selected' : ''}>High</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="edit-status" class="form-label">Status</label>
                        <select class="form-control" id="edit-status">
                            <option value="todo" ${story.status === 'todo' ? 'selected' : ''}>Todo</option>
                            <option value="doing" ${story.status === 'doing' ? 'selected' : ''}>Doing</option>
                            <option value="done" ${story.status === 'done' ? 'selected' : ''}>Done</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary" id="save">Save</button>
                    <button type="button" class="btn btn-secondary btn-back">Back</button>
                </div>
            </div>
        `;

        document.querySelectorAll('.btn-back').forEach(button => {
            button.addEventListener('click', () => {
                displayStory(story.projectId);
            });
        });

        const saveEditButton = document.getElementById('save');
        if (saveEditButton) {
            saveEditButton.addEventListener('click', async () => {
                const nameInput = document.getElementById('edit-name') as HTMLInputElement;
                const descriptionInput = document.getElementById('edit-description') as HTMLInputElement;
                const priorityInput = document.getElementById('edit-priority') as HTMLSelectElement;
                const statusInput = document.getElementById('edit-status') as HTMLSelectElement;

                const updatedStory: Partial<Story> = {
                    name: nameInput.value,
                    description: descriptionInput.value,
                    priority: priorityInput.value as 'low' | 'medium' | 'high',
                    status: statusInput.value as 'todo' | 'doing' | 'done'
                };

                await DAO.updateEntity(id, updatedStory);
                await displayStory(story.projectId);
            });
        }
    }
}




export {displayStory}