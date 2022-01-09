import React, { useEffect, useState } from "react";
import { IProjectDetails, ITasklistDetails } from "../../../interfaces";
import styled from "styled-components";
import { Select, MenuItem } from "@mui/material";

import { Link } from "react-router-dom";
import {
  ProjectService,
  TasklistService,
  TaskService,
} from "../../../services";

const ProjectCardContainer = styled.div`
  width: 30%;
  border: 2px solid #aaa3a3;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const ProjectCard = () => {
  return (
    <ProjectCardContainer>
      <h3>projectName</h3>
      <p>taslist1</p>
      <p>tasklist2</p>
    </ProjectCardContainer>
  );
};

export default function ProjectsView() {
  const [projects, setProjects] = useState<IProjectDetails[]>([]);

  const retrieveProjects = async () => {
    //TODO get only user projects
    const projectsResponse = await ProjectService.getProjects();
    setProjects(projectsResponse.data);
  };
  useEffect(() => {
    retrieveProjects();
  }, []);
  return (
    <div>
      <Select value={"this.state.value"}>
        <MenuItem value={10}>Responsive</MenuItem>
        <MenuItem value={20}>Board</MenuItem>
        <MenuItem value={30}>List</MenuItem>
      </Select>

      <ProjectCard />

      <ProjectCard />

      <ProjectCard />

      <ProjectCard />

      {projects &&
        projects.map(({ id, name, task_lists }) => (
          <div key={id}>
            <header className="App-header"> {name}</header>
            <ul>
              {task_lists &&
                task_lists.map((list: ITasklistDetails) => {
                  return (
                    <li key={list.id}>
                      <Link
                        to={`/projects/${list.project_id}/taskslist/${list.id}`}
                      >
                        {list.name}
                      </Link>
                      {/* spinner until list of tasks or until is expanded */}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
    </div>
  );
}
