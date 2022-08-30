import React from "react";
import { useTasklistTasks } from "./useTasklistTasks";
import { CreateTaskCard } from "pages/Home/components/CreateTaskCard";
import { SimpleTaskCard } from "./components/SimpleTaskCard";

import styled from "@emotion/styled/macro";
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
import initialData from "./components/initialData";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TaskStatusEnum, STATUSES } from "constants/taskStatuses";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";

const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

interface StyledDivProps {
  isDragging?: boolean;
}
const TaskContainer = styled.div<StyledDivProps>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;

  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};

  &:focus {
    outline: none;
    border-color: red;
  }
`;

const Title = styled.h3`
  padding: 8px;
`;
/* background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"}; */
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;

  flex-grow: 1;
  min-height: 100px;
`;

export const TasksView: React.FC<{}> = () => {
  const { tasklistId } = useParams();
  const { tasks, addTask, removeTaskById, updateTaskById } = useTasklistTasks(
    Number(tasklistId)
  );

  const [state, setState] = React.useState(initialData);
  const onDragStart = (start: any) => {
    // const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
    // console.log("log", start, homeIndex);
    return;
  };
  const onDragEnd = (result: any, provided: ResponderProvided) => {
    const { source, destination, draggableId } = result;

    console.log("onDragEnd", result);
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(source.index, 1);
    // items. splice(result. destination. index, 0 reorderedItem)
    // updateCharacters (items) ;

    updateTaskById(draggableId, {
      ...reorderedItem,
      task_status_id: Number(destination.droppableId),
    });
    return;
  };
  console.log(state);
  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
      <ColumnsRowContainer>
        <ColumnContainer>
          <Droppable droppableId={String(TaskStatusEnum.NotStarted)}>
            {(provided) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                <Title>not started</Title>
                {tasks &&
                  tasks
                    .filter(
                      (task) =>
                        task.task_status_id === TaskStatusEnum.NotStarted
                    )
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TaskContainer
                            isDragging={snapshot.isDragging}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SimpleTaskCard
                              // key={task.id}
                              id={task.id}
                              title={task.title}
                              description={task.description}
                              task_list_id={task.task_list_id} // use tasklistId
                              task_status_id={task.task_status_id}
                              // due_date={task.due_date} //problem
                              // created_at={task.created_at} //problem
                              // updateTaskById={updateTaskById}
                              // removeTaskById={removeTaskById}
                            />
                          </TaskContainer>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </ColumnContainer>

        <ColumnContainer>
          <Droppable droppableId={String(TaskStatusEnum.InProgress)}>
            {(provided) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                <Title>in progress</Title>

                {tasks &&
                  tasks
                    .filter(
                      (task) =>
                        task.task_status_id === TaskStatusEnum.InProgress
                    )
                    .map((task: any, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <TaskContainer
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SimpleTaskCard
                              key={task.id}
                              id={task.id}
                              title={task.title}
                              description={task.description}
                              task_list_id={task.task_list_id} // use tasklistId
                              task_status_id={task.task_status_id}
                              // due_date={task.due_date} //problem
                              // created_at={task.created_at} //problem
                              // updateTaskById={updateTaskById}
                              // removeTaskById={removeTaskById}
                            />
                          </TaskContainer>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </ColumnContainer>
        <ColumnContainer>
          <Droppable droppableId={String(TaskStatusEnum.Completed)}>
            {(provided) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                <Title>Completed</Title>
                {tasks &&
                  tasks
                    .filter(
                      (task) => task.task_status_id === TaskStatusEnum.Completed
                    )
                    .map((task: any, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <TaskContainer
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SimpleTaskCard
                              key={task.id}
                              id={task.id}
                              title={task.title}
                              description={task.description}
                              task_list_id={task.task_list_id} // use tasklistId
                              task_status_id={task.task_status_id}
                              // due_date={task.due_date} //problem
                              // created_at={task.created_at} //problem
                              // updateTaskById={updateTaskById}
                              // removeTaskById={removeTaskById}
                            />
                          </TaskContainer>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </ColumnContainer>

        {/* <CardBody> */}
        {/* {tasks && tasks.map(task:any)=>( <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    isDropDisabled={isDropDisabled}
                    index={index}
                  />) */}

        {/* {!tasks && (
          <Box sx={{ marginTop: "30px" }}>
            This tasklist({tasklistId}) has no content
          </Box>
        )} */}
        {/* </CardBody> */}
      </ColumnsRowContainer>
    </DragDropContext>
  );
};
const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardBodyItem = styled.div`
  margin: 0.1rem;
`;

const ColumnsRowContainer = styled.div`
  max-height: 50vh;
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
