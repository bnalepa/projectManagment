import { collection, addDoc, getDocs, Firestore, doc, deleteDoc, updateDoc,query,where, getDoc,} from 'firebase/firestore/lite';
import { db } from './DatabaseConnection';
import { User } from '../models/User';


/*
export class ProjectDAO  {
    private db: Firestore;
  
    constructor() {
      this.db = db;
    }
  
    async addProject(project: Omit<Project, 'id'>): Promise<void> {
    
        await addDoc(collection(this.db, 'projects'), project);

    }
    async getProjects()
    {
        const projectsCollection = collection(this.db, 'projects');
        const allProjects = await getDocs(projectsCollection);
        const projectsList = allProjects.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Project);

        return projectsList;

    }
  
    
  }
*/
  export enum EntityType {
    Project = 'projects',
    User = 'users',
    Story = 'stories',
    Task = 'tasks',
  }

export async function getUserByLogin(login: string){
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('login', '==', login));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return null;
    }
    const userDoc = querySnapshot.docs[0];  
    return { id: userDoc.id, ...userDoc.data() } as User;
}

export async function addUser(user: User): Promise<void> {
  const usersCollection = collection(db, 'users');
  await addDoc(usersCollection, user);
}


export class EntityDAO<T>  {
    private db: Firestore;
    private entityType: EntityType;


    constructor(type: EntityType) {
      this.db = db
      this.entityType = type;
    }
  
    async addEntity(entity: Omit<T, 'id'>) {
    
        await addDoc(collection(this.db, this.entityType), entity);

    }
    async getAllEntity()
    {
        const entityCollection = collection(this.db, this.entityType);
        const allEntity = await getDocs(entityCollection);
        const EntityList = allEntity.docs.map(doc => ({ ...doc.data(), id: doc.id }) as T);


        return EntityList;
    }
    async getEntityByID(id: string)
    {
        const entityDoc = doc(this.db, this.entityType, id);
        const entity = await getDoc(entityDoc);
        return  [{ id: entity.id, ...entity.data() } as T]
    }
  
    async updateEntity(id: string, entity: Partial<T>) {
      await updateDoc(doc(this.db, this.entityType, id), entity);
    }
  
    async deleteEntity(id: string){
      await deleteDoc(doc(this.db, this.entityType, id));
    }
}    
