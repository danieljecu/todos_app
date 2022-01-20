export enum TaskStatusEnum {
    NotStarted = 0,
    InProgress = 1,
    Completed = 2,
  }
  
  export const STATUSES = [
    { id: TaskStatusEnum.NotStarted, name: "Not Started" },
    { id: TaskStatusEnum.InProgress, name: "In Progress" },
    { id: TaskStatusEnum.Completed, name: "Finished" },
  ];