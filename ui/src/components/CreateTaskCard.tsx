import React from "react";
import { Link as ReactLink } from "react-router-dom";

import { ITaskDetails } from "interfaces/tasks";
import { useParams } from "react-router-dom";

import { TaskContainer, CardTitle, CardBody, CardBodyItem } from "./styled";

interface CreateTaskCardProps {
    addTask: (task: ITaskDetails, tasklistId?:number) => void;
  }

export const CreateTaskCard: React.FC<CreateTaskCardProps> = ({addTask}) => {
  const { tasklistId } = useParams();
  const [task, setTask] = React.useState<ITaskDetails>({
    id: NaN,
    title: "",
    description: "",
    due_date: new Date(),
    created_at: new Date(),
    task_list_id: Number(tasklistId),
    task_status_id: 0,
  });
  const handleCreate = (e: any) => {
    e.preventDefault();

    const newTask = {
      ...task,
      task_list_id: Number(tasklistId),
      id: Math.random(),
    };

    console.log("add task", newTask);
    if (addTask) {
      addTask(newTask);
    }
  };
  return (
    <TaskContainer>
      Create Task
      <input
        onChange={(e) => {
          console.log(e.target.value);
          setTask((prevState) => ({ ...prevState, title: e.target.value }));
        }}
        value={task.title}
        type="text"
        placeholder="Input task name"
      />
      <button onClick={handleCreate}>add task</button>
      
    </TaskContainer>
  );
};
