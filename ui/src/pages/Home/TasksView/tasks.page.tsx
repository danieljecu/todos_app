import React from "react";
import { useTasklistTasks } from "./useTasklistTasks";
import { CreateTaskCard } from "components/CreateTaskCard";
import { CreateTasklistCard } from "pages/Home/TasklistsView/components/CreateTasklistCard";
import { TaskCard } from "components/TaskCard";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styled from "styled-components";
import { useParams } from "react-router-dom";
import { IProjectDetails, ITaskDetails } from "interfaces";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const TasksView: React.FC<{}> = () => {
  const { tasklistId } = useParams();
  const { tasks, addTask, removeTaskById, updateTaskById } = useTasklistTasks(
    Number(tasklistId)
  );

  return (
    <TasksContainer>
      <CardTitle>
        <Link
          to={`/tasklist/${tasklistId}`}
          component={ReactLink}
          underline={"none"}
          color="black"
        >
          {tasklistId} List
        </Link>
      </CardTitle>

      <CardBody>
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
        {!tasks && <>This tasklist({tasklistId}) has no content</>}
      </CardBody>

      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </TasksContainer>
  );
};
const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardBodyItem = styled.div`
  margin: 0.3rem 0 0.3rem 0.3rem;
`;

const TasksContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const CardTitle = styled.div`
  background-color: #00d3ff;
  padding: 0.33rem 0 0.33rem 1rem;
  border-bottom: 1px solid;
`;
