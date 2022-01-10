import React from "react";
import {useGetProjects} from "./hooks";
import {ProjectCard} from "./components/ProjectCard";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

import styled from "styled-components";


export const ProjectsPage: React.FC<{}> = ({}) => {
    const {projects, onDragEnd} = useGetProjects();

    if (!projects?.length) {
        return <div>Create </div>
    }
    return (
        <ProjectPageContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="projectList">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {projects.map(({id, name, task_lists}, index) =>
                                <Draggable draggableId={String(id)} key={String(id)} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}>
                                            <ProjectCard key={id} id={id} title={name}
                                                         items={task_lists}/>
                                        </div>)}
                                </Draggable>
                            )}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </ProjectPageContainer>
    );
}

const ProjectPageContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`
