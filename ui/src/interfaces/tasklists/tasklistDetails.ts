import { ITaskDetails } from "../tasks";

export default interface ITasklistDetails {
    id: number;
    name: string;
    project_id:number;
    tasks?: ITaskDetails[] | any[];
    // TODO: fix it later maybe include in the backend response tasks 
  }
