import React from "react";
import { useTasklistTasks } from "./useTasklistTasks";
import { CreateTaskCard } from "pages/Home/components/CreateTaskCard";
import { CreateTasklistCard } from "pages/Home/TasklistsView/components/CreateTasklistCard";
import { TaskCard } from "pages/Home/components/TaskCard";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { IProjectDetails, ITaskDetails } from "interfaces";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export const TasksView: React.FC<{}> = () => {
  const { tasklistId } = useParams();
  const { tasks, addTask, removeTaskById, updateTaskById } = useTasklistTasks(
    Number(tasklistId)
  );

  console.log("tasks", tasks);
  return (
    <TasksContainer>
      <CardBody>
        <CardTitle>
          <Link
            to={`/tasklist/${tasklistId}`}
            component={ReactLink}
            underline={"none"}
            color="black"
          >
            List id: #{tasklistId} Tasklist name??
          </Link>
        </CardTitle>
        <CreateTaskCard addTask={addTask} />
        {tasks &&
          tasks.map((task: any) => (
            <CardBodyItem key={task.id}>
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                task_list_id={task.task_list_id} // use tasklistId
                task_status_id={task.task_status_id}
                // due_date={task.due_date} //problem
                // created_at={task.created_at} //problem
                updateTaskById={updateTaskById}
                removeTaskById={removeTaskById}
              />
            </CardBodyItem>
          ))}

        {!tasks && (
          <Box sx={{ marginTop: "30px" }}>
            This tasklist({tasklistId}) has no content
          </Box>
        )}
      </CardBody>
    </TasksContainer>
  );
};
const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardBodyItem = styled.div`
  margin: 0.1rem;
`;

const TasksContainer = styled.div`
  /* max-height: 600px; */
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const CardTitle = styled.div`
  background-color: white;
  padding: 0.33rem 0 0.33rem 1rem;
  border-bottom: 1px solid;
`;
