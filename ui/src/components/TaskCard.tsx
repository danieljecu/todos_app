import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Input, NativeSelect, IconButton } from "@mui/material";

import { TaskContainer, CardTitle, CardBody, CardBodyItem } from "./styled";
import { TaskStatusEnum, STATUSES } from "constants/taskStatuses";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Delete, Build, Save } from "@mui/icons-material";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

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

interface ViewTaskCardProps {
  taskId: number;
  title: string;
  description: string;
  // due_date:Date;
  // created_at:Date;
  task_list_id: number;
  task_status_id: number;
}

export const ViewTaskCard = ({
  taskId,
  title,
  description,
  task_list_id,
  task_status_id,
}: ViewTaskCardProps) => {
  return (
    <TaskContainer>
      <CardTitle>
        <Link
          to={`/tasklist/${task_list_id}/task/${taskId}`}
          component={ReactLink}
          underline={"none"}
          color="black"
        >
          {taskId}. <strong>{title}</strong>
        </Link>

        <strong style={{ float: "right" }}>
          {STATUSES[task_status_id].name}
        </strong>
      </CardTitle>
      <CardBody>
        <CardBodyItem>
          <>
            <p>description: {description}</p>
          </>
          {/* <label htmlFor="description">Description</label>
          <Input id="description" value={description} /> */}
        </CardBodyItem>
      </CardBody>
    </TaskContainer>
  );
};

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
  if (!editMode) {
    return (
      <ViewTaskCard
        {...{
          taskId,
          title,
          description,
          task_list_id,
          task_status_id,
          removeTaskById,
          updateTaskById,
        }}
      />
    );
  } else {
    return (
      <TaskContainer>
        <CardTitle>
          {!editMode ? (
            <>
              <Link
                to={`/tasklist/${task_list_id}/task/${taskId}`}
                component={ReactLink}
                underline={"none"}
                color="black"
              >
                {taskId}. <strong>{title}</strong>
              </Link>

              <strong style={{ float: "right" }}>
                {STATUSES[task_status_id].name}
              </strong>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Input
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((t) => {
                    return { ...t, title: e.target.value };
                  })
                }
              />
              <NativeSelect
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
              </NativeSelect>
            </div>
          )}
        </CardTitle>
        <CardBody>
          {/* <p>
          task_list_id: {task_list_id} task_id: {taskId}
        </p> */}
          {!editMode ? (
            <>
              <p>description: {description}</p>
            </>
          ) : (
            <>
              <Input
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
              {/* <Input
              type={"text"}
              value={newTask.task_status_id}
              readOnly
              placeholder="Input status id"
            /> */}

              {/* <label>
              Status:
              <NativeSelect
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
              </NativeSelect>
            </label> */}
            </>
          )}

          {/* {created_at&& <p>created_at: {created_at}</p>}
      {due_date&& <p>due_date: {due_date}</p>} */}
        </CardBody>
        <CardActions>
          <Button
            // sx={{ background: "red" }}
            className="btn btn-danger btn-sm float-end mt-3 mx-2"
            onClick={() => removeTaskById(taskId)}
          >
            <Delete fontSize="small" />
            Dell-✘
          </Button>
          <Button
            // sx={{ background: "yellow" }}
            variant="contained"
            startIcon={
              editMode === true ? (
                <Save fontSize="small" />
              ) : (
                <Build fontSize="small" />
              )
            }
            size="small"
            className="btn btn-warning btn-sm  float-end pl-5  mt-3"
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
          </Button>
        </CardActions>
      </TaskContainer>
    );
  }
};
