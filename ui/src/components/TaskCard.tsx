import styled from "styled-components";

import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";

import { TaskContainer, CardTitle, CardBody, CardBodyItem } from "./styled";
import { TaskStatusEnum, STATUSES } from "constants/taskStatuses";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  // due_date:Date;
  // created_at:Date;
  task_list_id: number;
  task_status_id: number;
  removeTaskById: (taskId: number) => void;
  updateTaskById: (taskId: number, task: any) => void;
}

export const TaskCard: React.FC<TaskProps> = ({
  id: taskId,
  title,
  description,
  task_list_id,
  task_status_id,
  // created_at,
  // due_date,
  removeTaskById,
  updateTaskById,
}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [newTask, setNewTask] = React.useState({
    id: taskId,
    title,
    description,
    task_list_id,
    task_status_id,
  });

  return (
    <TaskContainer>
      <CardTitle>
        {editMode === false ? (
          <Link
            to={`/tasklist/${task_list_id}/task/${taskId}`}
            component={ReactLink}
            underline={"none"}
            color="black"
          >
            {taskId}. {title}
          </Link>
        ) : (
          <input
            type="text"
            value={newTask.title}
            onChange={(e) =>
              setNewTask((t) => {
                return { ...t, title: e.target.value };
              })
            }
          />
        )}
        <button onClick={() => removeTaskById(taskId)}>Remove</button>
        <button
          onClick={() => {
            if (editMode === false) {
              setEditMode(true);
            } else {
              setEditMode(false);
              updateTaskById(taskId, newTask);
            }
          }}
        >
          {editMode === true ? "Save" : "Edit"}
        </button>
      </CardTitle>
      <CardBody>
        <p>task_list_id: {task_list_id}</p>
        {!editMode ? (
          <>
            <p>description: {description}</p>
            <p>task_status_id: {task_status_id}</p>
          </>
        ) : (
          <>
            <input
              type={"text"}
              value={newTask.description}
              onChange={(e) => {
                e.preventDefault();
                setNewTask((t) => {
                  return { ...t, description: e.target.value };
                });
              }}
              placeholder="Input description"
            />
            <input
              type={"text"}
              value={newTask.task_status_id}
              readOnly
              placeholder="Input status id"
            />

            <label>
              Select status:
              <select
                disabled={!editMode}
                defaultValue={newTask.task_status_id}
                onChange={(e) => {
                  e.preventDefault();
                  setNewTask((prevState) => ({
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
          </>
        )}

        {/* {created_at&& <p>created_at: {created_at}</p>}
      {due_date&& <p>due_date: {due_date}</p>} */}
      </CardBody>
    </TaskContainer>
  );
};
