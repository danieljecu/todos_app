import React from "react";
import { IProjectDetails } from "interfaces";
import { ProjectCardContainer, CardTitle } from "./styled";

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
    <ProjectCardContainer>
      <CardTitle>
        <input
          onChange={(e) => {
            setProject((prevState) => ({ ...prevState, name: e.target.value }));
          }}
          value={project.name}
          type="text"
          placeholder="Input project name"
        />
        <button onClick={handleCreate}>Add project</button>
      </CardTitle>
    </ProjectCardContainer>
  );
};
