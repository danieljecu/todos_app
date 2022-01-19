import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";
import styled from "styled-components";
import { TaskCard } from "components/TaskCard";
import { GenericCard } from "components/GenericCard";
import { CreateTaskCard } from "components/CreateTaskCard";

import {
  TasklistCardContainer,
  CardTitle,
  CardBody,
  CardBodyItem,
} from "./styled";
interface TasklistCardProps {
  id: number;
  name: string;
  tasks?: any[];
  removeTasklistById: (tasklistId: number) => void;
  addTask: (task: any, tasklistId?: number) => void;
}

export const TasklistCard: React.FC<TasklistCardProps> = ({
  id: tasklistId,
  name,
  tasks,
  removeTasklistById,
  addTask,
}) => {
  return (
    <>
      <TasklistCardContainer>
        <CardTitle>
          <Link
            to={`/tasklist/${tasklistId}`}
            component={ReactLink}
            underline={"none"}
            color="black"
          >
            {name} List
          </Link>
          <button onClick={() => removeTasklistById(tasklistId)}>Remove</button>

        </CardTitle>
        <CardBody>
          {tasks?.map(
            ({
              id: taskId,
              title,
              description,
              task_status_id,
              due_date,
              created_at,
            }: any) => (
              <CardBodyItem key={taskId}>
                <TaskCard
                  key={taskId}
                  id={taskId}
                  title={title}
                  description={description}
                  task_list_id={tasklistId}
                  task_status_id={task_status_id}
                  // due_date={due_date}
                  // created_at={created_at}
                  // removeTaskById={(taskId) => {}}
                  // updateTaskById={(taskId, task) => {}}
                />
              </CardBodyItem>
            )
          )}
        </CardBody>
        <CreateTaskCard addTask={addTask} />
      </TasklistCardContainer>

      {/* <GenericCard
        id={tasklistId}
        cardTitle={
          <Link
            to={`/tasklist/${tasklistId}`}
            component={ReactLink}
            underline={"none"}
            color="black"
          >
            {name} List
          </Link>
        }
        itemsList={tasks}
        cardBodyItem={({
          id: taskId,
          title,
          description,
          task_status_id,
          due_date,
          created_at,
        }: ITaskDetails) => (
          <TaskCard
            key={taskId}
            id={taskId}
            title={title}
            description={description}
            task_list_id={tasklistId}
          />
        )}
      /> */}
    </>
  );
};
