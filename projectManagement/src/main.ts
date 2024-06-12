import { EntityDAO, EntityType } from './data/DAO';
import { Project } from './models/Project';
import { displayProjects } from './views/ProjectView';


const DAO = new EntityDAO<Project>(EntityType.Project)


    document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    });





