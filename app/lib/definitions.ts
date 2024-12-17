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
    onEditTask: (task: Task | null) => void;
}; 

export type Task = {
    id: string,
    name: string,
    dueDate: string,
    projectId: string,
    isCompleted: boolean,
    repeatOption: string
}

export type TaskModalProps = {
    onClose: () => void;
    onSave: (task: Partial<Task>) => void;
    projectList: Project[];
    initialTask: Task | null;
  };

export type CalendarDayProps = {
    date: Date;
    tasks: Task[];
    onToggleTaskCompletion:(taskId: string, isCompleted: boolean) => void;
};