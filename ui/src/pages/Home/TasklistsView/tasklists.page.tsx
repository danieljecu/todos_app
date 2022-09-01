import React from "react";
import { useProjectTasklists } from "./hooks";
import { TasklistCard, CreateTasklistCard } from "./components";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";
import { SideBar } from "../ProjectsView/components/SideBar";

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

  const CreateTasklistsContainer = styled.div`
    padding-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
  `;

  let Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 3fr));
    gap: 10px;
    margin-left: 10px;
    margin-right: 10px;
    overflow: auto;
  `;

  return (
    <div>
      <CreateTasklistsContainer>
        <CreateTasklistCard
          //adds inside
          //project id
          addTasklist={addTasklist}
        />
      </CreateTasklistsContainer>
      <Container>
        {/* sidebar is meant to show the context, like breadcrumb */}
        {/* <SideBar> 
          {project?.task_lists?.map((task_list) => (
            <p>
              {task_list.id} {task_list.name}
            </p>
          ))}
        </SideBar> */}
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
      </Container>
    </div>
  );
};
