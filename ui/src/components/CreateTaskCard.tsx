import React from "react";
// import { Link as ReactLink } from "react-router-dom";
import { Input, NativeSelect } from "@mui/material";

import { ITaskDetails } from "interfaces/tasks";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

import {
  TaskContainer,
  // CardCreateTitle,
  CardTitle,
  CardBody,
  // CardBodyItem,
} from "./styled";

import { STATUSES } from "constants/taskStatuses";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "styled-components";

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
    <Card elevation={5}>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // padding: "0.33rem 0 0.33rem 1rem",
            height: "2rem",
          }}
        >
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
              setTask((prevState) => ({ ...prevState, title: e.target.value }));
            }}
            value={task.title}
            type="text"
            placeholder="Input task name"
          />
          <Button
            size="medium"
            variant="outlined"
            color="secondary"
            className="ml-2 float-right"
            type="submit"
            onClick={handleCreate}
          >
            ✎ add task
          </Button>
        </div>
        {/* <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            setTask((prevState) => ({ ...prevState, title: e.target.value }));
          }}
          value={task.title}
          type="text"
          placeholder="Input task name"
        /> */}

        <Input
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

        <InputLabel>
          Status:{" "}
          <NativeSelect
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
          </NativeSelect>
        </InputLabel>
      </CardContent>
    </Card>
  );
};
