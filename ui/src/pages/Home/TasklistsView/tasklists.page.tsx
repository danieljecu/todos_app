import React from "react";
import { useProjectTasklists } from "./hooks";
import { TasklistCard } from "./components/TasklistCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { ITasklistDetails } from "interfaces/tasklists";

import styled from "styled-components";
import { useParams } from "react-router-dom";

export const TasklistsView: React.FC<{}> = ({}) => {
  const { project, setProject } = useProjectTasklists(); // projectId
  const { projectId, id } = useParams();

  if (!project) {
      return <div>{projectId}
      {id} project dosn't existss
      <br />Create Project</div>
  }
  return (
    <TasklistContainer>
      {project?.task_lists?.map((task_list) => (
        <TasklistCard
          id={task_list.id}
          name={task_list.name}
          tasks={task_list?.tasks}
        />
      ))}
    </TasklistContainer>
  );
};

const TasklistContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`;
