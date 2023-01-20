import React from "react";
import { IProjectDetails } from "interfaces";
import { ProjectCardContainer, CardTitle } from "./styled";
import { Button, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const initialProjectState = {
  id: Math.random(), //TODO not sure is the best way to handle this using a NaN
  name: "",
  task_lists: [],
};

export const CreateProject: React.FC<{
  addProject?: (data: IProjectDetails) => void;
}> = ({ addProject }) => {
  const [project, setProject] =
    React.useState<IProjectDetails>(initialProjectState);

  const handleCreate = (e: any) => {
    e.preventDefault();
    //TODO: check if data exists and if so, create project
    //otherwise, alert user
    console.log("add project");
    if (addProject) {
      addProject(project);
    }
  };

  return (
    <Card elevation={5}>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // padding: "0.33rem 0 0.33rem 1rem",
          height: "2rem",
          alignItems: "center",
        }}
      >
        <TextField
          variant="standard"
          onChange={(e) => {
            setProject((prevState) => ({ ...prevState, name: e.target.value }));
          }}
          value={project.name}
          type="text"
          label="Input project name"
        />
        <Button
          onClick={handleCreate}
          size="medium"
          variant="outlined"
          color="secondary"
          className="ml-2 float-right"
          type="submit"
        >
          Add project
        </Button>
      </CardContent>
    </Card>
  );
};
