import { ITasklistDetails } from "..";

export default interface IProjectDetails {
    id: string;
    name: string;
    task_lists: ITasklistDetails[];
  }
