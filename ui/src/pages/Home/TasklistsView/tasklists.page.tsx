import React from "react";
import { useProjectTasklists } from "./hooks";
import { TasklistCard, CreateTasklistCard } from "./components/";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";

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
      <CardBody>
        <CardTitle>
          {/* <Link
            to={`/tasklist/${tasklistId}`}
            component={ReactLink}
            underline={"none"}
            color="black"
          > */}
          Project #{project.id} {project.name}
          {/* </Link> */}
        </CardTitle>
        <CreateTasklistCard
          //adds inside
          //project id
          addTasklist={addTasklist}
        />
        {/* {project?.task_lists?.map((task_list) => (
          <p>
            {task_list.id} {task_list.name}
          </p>
        ))} */}
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
      </CardBody>
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

const CardTitle = styled.div`
  background-color: white;
  padding: 0.33rem 1rem 0.33rem 1rem;
  border-bottom: 1px solid;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
`;
