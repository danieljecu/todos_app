import styled from "styled-components";

import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";

import { GenericCard } from "components/GenericCard";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  due_date:Date,
  created_at:Date,
  task_list_id: number;
  // task_status_id:number
  removeTaskById?: (taskId: number) => void;
  updateTaskById?: (taskId: number, task: any) => void;
}

export const TaskCard: React.FC<TaskProps> = ({
  id: taskId,
  title,
  description,
  task_list_id,
  created_at,
  due_date,
  removeTaskById,
  updateTaskById,
}) => {
  return (
    <GenericCard
      id={taskId}
      cardTitle={
        <Link
          to={`/tasklist/${task_list_id}/task/${taskId}`}
          component={ReactLink}
          underline={"none"}
          color="black"
        >
          {title}
        </Link>
      }
    >
      <p>task id: {taskId}</p>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>task_list_id: {task_list_id}</p>
      <p>created_at: {created_at}</p>
      <p>due_date: {due_date}</p>
      {removeTaskById && (
        <button onClick={() => removeTaskById(taskId)}>Remove</button>
      )}
      {/* {updateTaskById && (
        <button onClick={() => updateTaskById(taskId, task)}>Edit</button>
      )} */}
    </GenericCard>
  );
};
