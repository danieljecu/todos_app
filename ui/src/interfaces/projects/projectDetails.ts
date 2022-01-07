import { ITasklistDetails } from "..";

export default interface IProjectDetails {
    id: number;
    name: string;
    task_lists: ITasklistDetails[];
  }
  