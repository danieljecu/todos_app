import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";
import {
  ProjectCardContainer,
  CardTitle,
  CardBody,
  CardBodyItem
} from "./styled";
import { IProjectDetails } from "interfaces";

interface ProjectCardProps {
  id: number;
  title: string;
  items?: any[];
  removeProjectById: (projectId: number) => void;
  updateProjectById: (projectId: number, projectName: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id: projectId,
  title,
  items,
  removeProjectById,
  updateProjectById,
}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState(title);

  return (  
    <ProjectCardContainer>
      <CardTitle>
        {editMode === false ? (
          <Link
            to={`/project/${projectId}`}
            component={ReactLink}
            underline={"none"}
            color="black"
          >
            {title}
          </Link>
        ) : (
          <input
            type="text"
            value={newProjectName}
            //onChange={() => updateProjectById(projectId, projectName)}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        )}
        <button onClick={() => removeProjectById(projectId)}>Remove</button>
        <button
          onClick={() => {
            if (editMode === true) {
              setEditMode(!editMode); //turn edit mode off
              updateProjectById(projectId, newProjectName); //save new data
            } else {
              setEditMode(!editMode); //turn edit mode on
            }
          }}
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </CardTitle>
      <CardBody>
        {items?.map(({ id, name }) => (
          <CardBodyItem key={id}>
            {editMode === false ? (
              <Link
                to={`/project/${projectId}/tasklist/${id}`}
                component={ReactLink}
                underline={"none"}
                color="black"
              >
                {name}
              </Link>
            ) : (
              <input type="text" value={name} readOnly />
            )}
          </CardBodyItem>
        ))}
      </CardBody>
    </ProjectCardContainer>
  );
};
