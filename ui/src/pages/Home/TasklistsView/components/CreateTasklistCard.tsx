import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";
import styled from "styled-components";

import { useParams } from "react-router-dom";

import { TasklistCardContainer, CardTitle } from "./styled";
import { ITasklistDetails } from "interfaces";



interface TasklistCardProps {
  addTasklist: (tasklist: ITasklistDetails) => void;
}

export const CreateTasklistCard: React.FC<TasklistCardProps> = ({
  addTasklist
}) => {
  const { projectId } = useParams();
  const [tasklist, setTasklist] =
    React.useState<ITasklistDetails>({
      id: NaN,
      project_id: Number(projectId),
      name: "",
      tasks: [],
    });
  

  const handleCreate = (e: any) => {
    e.preventDefault();

    const newTasklist = {
      ...tasklist,
      id: Math.random(), //TODO : maybe this already exists?
    };
    if (addTasklist) {
      addTasklist(newTasklist);
    }
  };

  return (
    <TasklistCardContainer>
      <CardTitle>
        <input
          onChange={(e) => {
            setTasklist((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          value={tasklist.name}
          type="text"
          placeholder="Input tasklist name"
        />
        <button onClick={handleCreate}>Add Tasklist</button>
      </CardTitle>

      <label>
        This new Tasklist will be added by default to current project id
        <select>
          {[{ id: 1, name: "current project" }].map((project) => (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </label>
    </TasklistCardContainer>
  );
};
