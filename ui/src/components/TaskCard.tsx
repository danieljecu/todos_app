import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Input, NativeSelect, IconButton, TextField } from "@mui/material";

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
  removeTaskById: (taskId: number) => void;
  editMode?: boolean;
  setEditMode: (bool: boolean) => void;
  newTask: {
    id: number;
    title: string;
    description: string;
    task_list_id: number;
    task_status_id: number;
  };
  setNewTask: (task: {
    id: number;
    title: string;
    description: string;
    task_list_id: number;
    task_status_id: number;
  }) => void;
}

interface EditTaskCardProps {
  taskId: number;
  title: string;
  description: string;
  task_list_id: number;
  task_status_id: number;
  removeTaskById: (taskId: number) => void;
  updateTaskById: (taskId: number, task: any) => void;
  editMode: boolean;
  setEditMode: (bool: boolean) => void;
  newTask: any;
  setNewTask: (task: any) => void;
}
export const ViewTaskCard = ({
  taskId,
  title,
  description,
  task_list_id,
  task_status_id,
  removeTaskById,
  setEditMode,
}: ViewTaskCardProps) => {
  return (
    <TaskContainer>
      <CardTitle
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link
          to={`/tasklist/${task_list_id}/task/${taskId}`}
          component={ReactLink}
          underline={"none"}
          color="black"
        >
          {taskId}. <strong>{title}</strong>
        </Link>
        <Typography sx={{ marginRight: "2px" }} component="strong">
          <strong>{STATUSES[task_status_id].name}</strong>
        </Typography>
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
          startIcon={<Build fontSize="small" />}
          size="small"
          className="btn btn-warning btn-sm  float-end pl-5  mt-3"
          onClick={() => {
            setEditMode(true);
          }}
        >
          "Edit"
        </Button>
      </CardActions>
    </TaskContainer>
  );
};

const EditTaskCard = ({
  taskId,
  title,
  description,
  task_list_id,
  task_status_id,
  removeTaskById,
  updateTaskById,
  editMode,
  setEditMode,
  newTask,
  setNewTask,
}: EditTaskCardProps) => (
  <TaskContainer>
    <CardTitle
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TextField
        variant="standard"
        label="Input name"
        value={newTask.title}
        onChange={(e) =>
          setNewTask((t: any) => {
            return { ...t, title: e.target.value };
          })
        }
      />

      <NativeSelect
        disabled={!editMode}
        defaultValue={newTask.task_status_id}
        onChange={(e) => {
          e.preventDefault();
          setNewTask((prevState: any) => ({
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
    </CardTitle>
    <CardBody>
      <>
        <TextField
          variant="standard"
          label="Input description"
          value={newTask.description}
          onChange={(e) => {
            e.preventDefault();
            setNewTask((t: any) => {
              return { ...t, description: e.target.value };
            });
          }}
          // helperText="Input description"
        />
      </>

      {/* {created_at&& <p>created_at: {created_at}</p>}
{due_date&& <p>due_date: {due_date}</p>} */}
      <CardActions disableSpacing>
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
            setEditMode(false);
            updateTaskById(taskId, newTask);
          }}
        >
          Save
        </Button>
      </CardActions>
    </CardBody>
  </TaskContainer>
);

interface ITaskType {
  id: number;
  title: string;
  description: string;
  task_list_id: number;
  task_status_id: number;
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

  return editMode === true ? (
    <EditTaskCard
      {...{
        taskId,
        title,
        description,
        task_list_id,
        task_status_id,
        removeTaskById,
        updateTaskById,
        editMode,
        setEditMode,
        newTask,
        setNewTask,
      }}
    />
  ) : (
    <ViewTaskCard
      {...{
        taskId,
        title,
        description,
        task_list_id,
        task_status_id,
        removeTaskById,
        updateTaskById,
        editMode,
        setEditMode,
        newTask,
        setNewTask,
      }}
    />
  );
};
