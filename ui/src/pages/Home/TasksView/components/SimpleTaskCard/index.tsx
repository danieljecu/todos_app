import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Input, NativeSelect, IconButton, TextField } from "@mui/material";

import { CardTitle, CardBody, CardBodyItem } from "./SimpleTaskCard.styled";
import { TaskStatusEnum, STATUSES } from "constants/taskStatuses";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Delete, Build, Save } from "@mui/icons-material";
import { Paper, Card } from "@mui/material";

import Typography from "@mui/material/Typography";

// interface TaskProps {
//   id: number;
//   title: string;
//   description: string;
//   // due_date:Date;
//   // created_at:Date;
//   task_list_id: number;
//   task_status_id: number;
//   removeTaskById?: (taskId: number) => void;
//   updateTaskById?: (taskId: number, task: any) => void;
// }

interface SimpleTaskCardProps {
  id: number;
  title: string;
  description: string;
  // due_date:Date;
  // created_at:Date;
  task_list_id: number;
  task_status_id: number;
  // updateTaskById: (taskId: number, task: any) => void;
  // removeTaskById: (taskId: number) => void;
  // editMode?: boolean;
  // setEditMode: (bool: boolean) => void;
  // newTask: {
  //   id: number;
  //   title: string;
  //   description: string;
  //   task_list_id: number;
  //   task_status_id: number;
  // };
  // setNewTask: (task: {
  //   id: number;
  //   title: string;
  //   description: string;
  //   task_list_id: number;
  //   task_status_id: number;
  // }) => void;
}

// interface EditTaskCardProps {
//   taskId: number;
//   title: string;
//   description: string;
//   task_list_id: number;
//   task_status_id: number;
//   removeTaskById: (taskId: number) => void;
//   updateTaskById: (taskId: number, task: any) => void;
//   editMode: boolean;
//   setEditMode: (bool: boolean) => void;
//   newTask: any;
//   setNewTask: (task: any) => void;
// }
export const SimpleTaskCard = ({
  id: taskId,
  title,
  description,
  task_list_id,
  task_status_id,
}: any) => {
  return (
    <Card
      elevation={3}
      style={{
        border: "2px solid #aaa3a3",
        borderRadius: "4px",
        margin: "0.5rem 0.2rem",
        overflow: "hidden",
      }}
    >
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
        <CardActions>
          <IconButton
            sx={{ color: "red" }}
            className="btn btn-danger btn-sm float-end mt-3 mx-2"
            onClick={() => {
              // removeTaskById(taskId)
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
          <IconButton
            // sx={{ color: "yellow" }}
            // variant="contained"
            size="small"
            className="btn btn-warning btn-sm  float-end pl-5  mt-3"
            onClick={() => {
              // setEditMode(true);
            }}
          >
            <Build fontSize="small" />
          </IconButton>
        </CardActions>
      </CardTitle>
      <CardBody>
        <CardBodyItem>
          <Typography variant="body2" color="text.secondary">
            {description || "No description"}
          </Typography>

          {/* <label htmlFor="description">Description</label>
          <Input id="description" value={description} /> */}
        </CardBodyItem>
        <Typography sx={{ marginRight: "2px" }} component="strong">
          <strong>{STATUSES[task_status_id].name}</strong>
        </Typography>
      </CardBody>
    </Card>
  );
};
