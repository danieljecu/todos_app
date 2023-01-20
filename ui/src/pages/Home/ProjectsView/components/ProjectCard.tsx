import React from "react";
import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";
import {
  ProjectCardContainer,
  CardTitle,
  CardBody,
  CardBodyItem,
} from "./styled";
import { IProjectDetails } from "interfaces";
import { TextField, Button, Typography } from "@mui/material";
import { Delete, Build, Save } from "@mui/icons-material";
import CardActions from "@mui/material/CardActions";

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
      <CardTitle
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // padding: "0.33rem 0 0.33rem 1rem",
          // height: "2rem",
          alignItems: "center",
        }}
      >
        {editMode === false ? (
          <Link
            to={`/project/${projectId}`}
            component={ReactLink}
            underline={"none"}
            color="black"
          >
            <strong>
              {projectId}. {title}
            </strong>
          </Link>
        ) : (
          <TextField
            variant="standard"
            type="text"
            value={newProjectName}
            //onChange={() => updateProjectById(projectId, projectName)}
            onChange={(e) => setNewProjectName(e.target.value)}
            label="Input project name"
          />
        )}

        <CardActions>
          <Button
            // style={{ color: "white", backgroundColor: "black" }}
            sx={{ color: "red" }}
            className="btn btn-danger btn-sm float-end mt-3 mx-2"
            onClick={() => removeProjectById(projectId)}
          >
            <Delete fontSize="small" />
            Del-✘
          </Button>
          <Button
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
          </Button>
        </CardActions>
      </CardTitle>
      <CardBody>
        {items?.map(({ id, name }) => (
          <CardBodyItem key={id}>
            <Link
              to={`/project/${projectId}/tasklist/${id}`}
              component={ReactLink}
              underline={"none"}
              color="black"
            >
              {name}
            </Link>
          </CardBodyItem>
        ))}
      </CardBody>
    </ProjectCardContainer>
  );
};
