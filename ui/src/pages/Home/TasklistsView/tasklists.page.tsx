import React from "react";
import { useProjectTasklists } from "./hooks";
import { TasklistCard, CreateTasklistCard } from "./components/";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styled from "styled-components";
import { useParams } from "react-router-dom";

export const TasklistsView: React.FC<{}> = ({}) => {
  const { projectId, id } = useParams();
  const {
    project,
    //setProject,
    addTask,
    addTasklist,
    removeTasklistById,
  } = useProjectTasklists(Number(projectId));

  if (!project) {
    return (
      <div>
        {projectId}
        {id} project dosn't existss
        <br />
        Create Project
      </div>
    );
  }
  return (
    <TasklistContainer>
      <CreateTasklistCard addTasklist={addTasklist} />
      {project?.task_lists?.map((task_list) => (
        <TasklistCard
          key={task_list.id}
          id={task_list.id}
          name={task_list.name}
          tasks={task_list?.tasks}
          removeTasklistById={removeTasklistById}
          addTask={addTask}
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
