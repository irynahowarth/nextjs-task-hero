// This file contains type definitions for the data.


export type Project = {
    id: string,
    name: string,
    createdAt: string
  };


export type Task = {
    id: string,
    name: string,
    dueDate: string,
    projectId: string,
    isCompleted: boolean,
}