import React from "react";
import styled from "@emotion/styled";

import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};

  &:focus {
    outline: none;
    border-color: red;
  }
`;

function Task(props) {
  const isDragDisabled = props.task.id === "task-1";

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
          // isDragDisabled={isDragDisabled}
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
