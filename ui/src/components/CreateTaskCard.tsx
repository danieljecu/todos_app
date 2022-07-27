import React from "react";
// import { Link as ReactLink } from "react-router-dom";

import { ITaskDetails } from "interfaces/tasks";
import { useParams } from "react-router-dom";

import {
  TaskContainer,
  // CardCreateTitle,
  CardTitle,
  CardBody,
  // CardBodyItem,
} from "./styled";

import { STATUSES } from "constants/taskStatuses";

interface CreateTaskCardProps {
  addTask: (task: ITaskDetails, tasklistId?: number) => void;
}

export const CreateTaskCard: React.FC<CreateTaskCardProps> = ({ addTask }) => {
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
      <CardTitle>
        Create Task
        <button onClick={handleCreate}>add task</button>
      </CardTitle>
      <CardBody>
        <label>
          name:
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
              setTask((prevState) => ({ ...prevState, title: e.target.value }));
            }}
            value={task.title}
            type="text"
            placeholder="Input task name"
          />
        </label>
        <label>
          description
          <input
            type={"text"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
              setTask((prevState) => ({
                ...prevState,
                description: e.target.value,
              }));
            }}
            value={task.description}
            placeholder="Input description"
          />
        </label>
        <label>
          Select status:
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setTask((prevState) => ({
                ...prevState,
                task_status_id: Number(e.target.value),
              }));
            }}
          >
            {STATUSES.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </label>
      </CardBody>
    </TaskContainer>
  );
};
