// This file contains type definitions for the data.


export type Project = {
    id: string,
    name: string,
    createdAt: string
  };

export type ProjectsTableProps = {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}; 

export type TasksTableProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}; 

export type Task = {
    id: string,
    name: string,
    dueDate: string,
    projectId: string,
    isCompleted: boolean,
}