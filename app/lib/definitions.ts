// This file contains type definitions for the data.


export type Project = {
    id: string,
    name: string,
    createdAt: string
  };

export type ProjectsTableProps = {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    onEditProject: (project: Project | null) => void;
}; 

export type TasksTableProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    onEditTask: (task: Task | null) => void;
}; 

export type Task = {
    id: string,
    name: string,
    dueDate: string,
    projectId: string,
    isCompleted: boolean,
    repeatOption: "none" | "daily" | "weekly";
}
export type TaskInstance = {
  date: string; 
  isCompleted: boolean;
};

export type TaskModalProps = {
    onClose: () => void;
    onSave: (task: Partial<Task>) => void;
    projectList: Project[];
    initialTask: Task | null;
  };
  
export type ProjectModalProps = {
    onClose: () => void;
    onSave: (project: Partial<Project>) => void;
    initialProject: Project | null;
  };

export type CalendarDayProps = {
    date: Date;
    tasks: Task[];
    onToggleTaskCompletion:(taskId: string,date: string, isCompleted: boolean) => void;
};
