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

  let Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 3fr));
    gap: 10px;
    margin-left: 10px;
    margin-right: 10px;
    overflow: scroll;
  `;
  let Box = styled.div`
    border: 3px solid #666;
    background-color: #ddd;
    border-radius: 0.5em;
    padding: 10px;
    height: 500px;
    overflow-y: scroll;
    cursor: move;
  `;

  console.log("proj", JSON.stringify(project));
  return (
    <div>
      <CreateTasklistCard
        //adds inside
        //project id
        addTasklist={addTasklist}
      />
      <Container>
        {/* {project?.task_lists?.map((task_list) => (
          <p>
            {task_list.id} {task_list.name}
          </p>
        ))} */}
        {project?.task_lists?.map((task_list) => (
          // <Box>
          <TasklistCard
            // styles={{ "overflow-y": "scroll" }}
            key={task_list.id}
            id={task_list.id}
            name={task_list.name}
            tasks={task_list?.tasks}
            removeTasklistById={removeTasklistById}
            addTask={addTask}
          />
          // </Box>
        ))}
      </Container>
    </div>
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
