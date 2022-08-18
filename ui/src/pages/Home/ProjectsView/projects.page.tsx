import React from "react";
import { useProjectsHandler } from "./hooks";
import { GenericCard } from "components/GenericCard";
import { ProjectCard, CreateProject } from "./components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";

import styled from "styled-components";
import { ITasklistDetails } from "interfaces";
import { SideBar } from "./components/SideBar";

export const ProjectsPage: React.FC<{}> = ({}) => {
  const {
    projects,
    addProject,
    removeProjectById,
    updateProjectById,
    onDragEnd,
    error,
  } = useProjectsHandler();

  if (!projects?.length) {
    return (
      <ProjectPageContainer>
        <CreateProject addProject={addProject} />
        {error && <div>{JSON.stringify(error)}</div>}
      </ProjectPageContainer>
    );
  }

  return (
    <ProjectPageContainer>
      {/* <SideBar /> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projectList">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <CreateProject addProject={addProject} />
              {projects.map(({ id, name, task_lists }, index) => (
                <Draggable
                  draggableId={String(id)}
                  key={String(id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ProjectCard
                        key={id}
                        id={id}
                        title={name}
                        items={task_lists}
                        removeProjectById={removeProjectById}
                        updateProjectById={updateProjectById}
                      />
                      {/* <GenericCard
                        id={id}
                        cardTitle={
                          <Link
                            to={`/projects/${id}`}
                            component={ReactLink}
                            underline={"none"}
                            color="black"
                          >
                            {name}
                          </Link>
                        }
                        itemsList={task_lists}
                        cardBodyItem={(tasklist: ITasklistDetails) => (
                          <Link
                            to={`/project/${id}/tasklist/${tasklist.id}`}
                            component={ReactLink}
                            underline={"none"}
                            color="black"
                          >
                            {tasklist.name}
                          </Link>
                        )}
                     /> */}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ProjectPageContainer>
  );
};

const ProjectPageContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`;
