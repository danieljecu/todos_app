import React from "react";
import styled from "@emotion/styled";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
// import ToDoItems from "../ToDoItems";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
`;

function Column(props) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} innerRef={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable
            droppableId={props.column.id}
            //type={props.column.id === "column-3" ? "done" : "active"}
            isDropDisabled={props.isDropDisabled}
            // direction="vertical"
            type="task"
          >
            {(provided, snapshot) => (
              <TaskList
                innerRef={provided.innerRef}
                {...provided.droppableprops}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

export default Column;
