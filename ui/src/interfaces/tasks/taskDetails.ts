export default interface ITaskDetails {
    id: number;
    title: string;
    description: string,
    due_date:Date,
    created_at:Date,
    task_list_id:number,
    task_status_id:number
  }
  